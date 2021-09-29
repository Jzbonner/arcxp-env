/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

const RenderMenuLinks = (links = []) => links.map((link) => {
  const { _id: linkId, site: siteFields } = link || {};
  const { site_url: siteUrl, section_url_open_new_tab: openInNewTab } = siteFields || {};
  const destination = linkId.includes('/configsection') ? siteUrl : linkId;

  let isExternalLink = openInNewTab;
  if (openInNewTab === undefined || !siteFields) {
    isExternalLink = destination && (destination.indexOf('http') === 0 || destination.indexOf('//') === 0);
  }
  return (
    <li className={'flyout-item'} key={link.name}>
      <a href={destination} target={!isExternalLink || isExternalLink === 'false' ? '_self' : '_blank'} rel={!isExternalLink || isExternalLink === 'false' ? null : 'noopener noreferrer'} title={link.name}>
        {link.name}
      </a>
    </li>
  );
});

export default RenderMenuLinks;
