// Other modules
const chalk = require("chalk");

// Placeholder for webpack entries.
const entries = {};

// Get site(s) to include from .env in the project root.
const buildSites = require("./../properties/index.json").sites;

// Output the sites in the scope of the build.
console.log(chalk.yellow("Building assets for: ") + chalk.green(buildSites));

// Render into webpack entry format
buildSites.forEach(site => {
  entries[site] = `./src/websites/${site}/${site}.scss`;
  entries[`${site}-amp`] = `./src/websites/${site}/amp.scss`;
  entries[`${site}-content`] = `./src/websites/${site}/content.scss`;
  entries[`${site}-pb`] = `./src/websites/${site}/pb.scss`;
});

module.exports = entries;
