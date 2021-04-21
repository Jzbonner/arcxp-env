import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const AdsTxt = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const siteProps = getProperties(arcSite);
  const {
    customFields: {
      type,
    },
  } = customFields;
  const typeOfTxt = type === 'ads.txt' ? 'adsTxt' : 'appAdsTxt';
  if (!typeOfTxt) return null;
  const adsTxtJson = get(siteProps, typeOfTxt, {});
  const list = [];
  let csvOutput = '';
  if (adsTxtJson) {
    adsTxtJson.forEach((item) => {
      list.push(`${item.domain}, ${item.accountId}, ${item.relationshipType}${item && item.certId ? `, ${item.certId}` : ''}`);
    });
    csvOutput = list.join('\n');
  }

  return <>{csvOutput}</>;
};

AdsTxt.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf([
      'ads.txt',
      'app-ads.txt',
    ]).tag({
      name: 'Ads or App-Ads',
      defaultValue: 'ads.txt',
    }),
  }),
};

export default AdsTxt;
