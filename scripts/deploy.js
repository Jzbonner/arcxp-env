#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * deploy.js - Helper script to deploy current local state to either sandbox or production environments
 * Prerequisites:
 * There must be two separate sets of endpoints & credentials in .env. One for PROD and one for SANDBOX:
 * DEPLOYER_PROPERTIES=<List of properties separated by a space in uppercase "AJC OHIO". Used as Property variable in next few env props>
 * The next few variables will have to be duplicated for each property in the DEPLOYER_PROPERTIES variable
 * PROD_[property]_DEPLOYER_FUSION_RELEASE=<specific version or "latest">
 * PROD_[property]_DEPLOYER_ENDPOINT=<api.[org name].arcpublishing.com>
 * PROD_[property]_DEPLOYER_ACCESS_TOKEN=<all access token from Developer Center (Prod)>
 * SANDBOX_[property]_DEPLOYER_FUSION_RELEASE=<specific version or "latest">
 * SANDBOX_[property]_DEPLOYER_ENDPOINT=<api.sandbox.[org name].arcpublishing.com>
 * SANDBOX_[property]_DEPLOYER_ACCESS_TOKEN=<all access token from Developer Center (Sandbox)>
 * Usage:
 * `npm run deploy [--production]`
 * For safety, this script will deploy to sandbox by default.
 * If the `--production` flag is given, it will deploy to production, but *not* promote
 * Otherwise it will deploy to sandbox *and* promote.
 */
require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { promisify } = require('util');
const { execSync } = require('child_process');
const { exit } = require('process');

const deployToProperties = process.env.DEPLOYER_PROPERTIES.split(' ');

(async () => {
  console.log('Deploying to the following properties: ', deployToProperties);
  // eslint-disable-next-line no-restricted-syntax
  for await (const property of deployToProperties) {
    console.log(`Deploying to ${property}`);

    const sleep = promisify(setTimeout);

    const environment = (
      process.argv.indexOf('--production') > -1 ? 'PROD' : 'SANDBOX'
    );

    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

    console.log(`Current branch: ${branchName}. Env: ${environment}`);

    console.log('zipping');
    execSync('npm run bundle');

    const commitHash = execSync('git log -n 1 --oneline | cut -d \' \' -f1', (err, stdout) => {
      if (err) {
        console.log('Problem getting commit hash');
      }

      if (typeof stdout === 'string') {
        return stdout.trim();
      }

      return null;
    });
    console.log(`Commit hash: ${commitHash}`);

    const pbVersion = process.env[`${environment}_${property}_DEPLOYER_FUSION_RELEASE`] || 'latest';
    const endpoint = process.env[`${environment}_${property}_DEPLOYER_ENDPOINT`];
    const authToken = process.env[`${environment}_${property}_DEPLOYER_ACCESS_TOKEN`];
    const delay = process.env.POLLING_DELAY || 10000;
    const timeout = process.env.TIMEOUT || 30;
    const bundleName = `${branchName}-${new Date().toISOString()}-${commitHash}`.replace(/[^a-zA-Z0-9-]/ig, '-');
    const baseURL = `https://${endpoint}/deployments/fusion/`;

    if (!endpoint || !authToken) {
      throw new Error('Please make sure all environment variables are present. See scripts/deploy.js for details.');
    }

    console.log('Logging environment variables:');
    console.log('Environment:', environment);
    console.log('Delay(s):', delay / 1000);
    console.log('Timeout(s):', (timeout * delay) / 1000);
    console.log('PageBuilder Version:', pbVersion);

    const form = new FormData();
    form.append('name', bundleName);
    form.append('bundle', fs.createReadStream('config/deploy/bundle.zip'));

    const notification = async (logMessage) => {
      if (logMessage) console.log(logMessage);
    };

    let latestServiceVersion = null;
    let services = null;

    const setServiceValues = (response) => {
      const { data: { lambdas = [] } = {} } = response;

      services = lambdas;
      latestServiceVersion = lambdas && lambdas.length > 0 ? lambdas[lambdas.length - 1].Version : 0;
      console.log('Latest Service Version: ', latestServiceVersion);
    };

    const upload = async () => {
      try {
        const response = await axios.get(`${baseURL}services`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setServiceValues(response);
        await axios.post(`${baseURL}bundles`, form, {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${authToken}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });
        console.log(`Uploaded to: ${endpoint}/bundles`);
      } catch (e) {
        console.error('Upload failed', e);
        await Promise.reject();
      }
    };

    const deploy = async () => {
      try {
        await axios.post(
          `${baseURL}services?bundle=${bundleName}&version=${pbVersion}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
      } catch (e) {
        console.error('Deployment step failed!', e);
        await Promise.reject();
      }
    };

    const getLatestServiceVersion = (response) => {
      const { data: { lambdas = [] } = {} } = response;

      const currentVersion = lambdas[lambdas.length - 1].Version;
      if (latestServiceVersion < currentVersion) {
        console.log('Bundle successfully deployed.');
        return currentVersion;
      }
      return null;
    };

    const checkDeployment = async (limit) => {
      console.log('Checking if deployment has completed...');

      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < limit; i += 1) {
        await sleep(delay);
        const response = await axios.get(`${baseURL}services`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const newValue = getLatestServiceVersion(response);
        if (newValue) return newValue;
      }
      /* eslint-enable no-await-in-loop */

      throw new Error(
        'Bundle did not deploy within the set time. Further investigation required. One possible solution is to increase the timeout, if the bundle was eventually deployed',
      );
    };

    const promote = async (version) => {
      console.log('Attempting to promote service version: ', version);
      try {
        if (!version) {
          throw new Error(
            'The version number argument passed to the promote function is falsy',
          );
        }
        await axios.post(`${baseURL}services/${version}/promote`, null, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (e) {
        console.error('Error in Promotion step!', e);
        await Promise.reject();
      }
    };

    const terminateOldest = async () => {
      console.log('Checking if there are more than 10 deployed services and deleting the oldest.');
      const nonLiveServices = services && services.filter(service => !service.Aliases);
      if (nonLiveServices.length && nonLiveServices.length >= 9) {
        const oldest = nonLiveServices.reduce((currentOldest, currentService) => {
          if (
            currentOldest.LastModified.localeCompare(currentService.LastModified)
            > 0
          ) {
            return currentService;
          }
          return currentOldest;
        });
        console.log('Terminating Oldest running service.');
        try {
          await axios.post(`${baseURL}services/${oldest.Version}/terminate`, null, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        } catch (e) {
          await notification(
            `Error in terminating the oldest running service. ${e}`,
            `There was an error in deleting the oldest running service. \
          Please check the deployer page on ${environment}!`,
          );
        }
      } else {
        console.log(`The current number of running services is ${nonLiveServices.length && nonLiveServices.length + 1}. We will only terminate the oldest service if it 10 or more`);
      }
    };

    const deployDev = async () => {
      await upload();
      await terminateOldest();
      await deploy();
      const version = await checkDeployment(timeout);
      await promote(version);
      await notification(
        'Successful deployment!',
      );
    };

    if (environment === 'SANDBOX') {
      await deployDev();
    } else {
      console.log('uploading to prod');
      await upload();
      await notification('Successful upload!');
    }
  }
})().catch(async (err) => {
  console.error('Error in deployment!', err);
  exit(1);
});
