import React from 'react';
import openMg2Widget from './openMg2Widget';

const RenderMenuLinks = (links = [], siteCode, userState = null) => links.map((link) => {
  const destination = link._id.includes('/configsection') ? link.site && link.site.site_url : link._id;
  const isExternalLink = destination && (destination.indexOf('http') > -1 || destination.indexOf('//') === 0);
  if (link && link.name && link.name.toLowerCase() === 'newsletters') {
    return (
      <li className={'flyout-item'} key={link.name}>
        <a href="#" onClick={() => openMg2Widget(siteCode, userState)}>
          {link.name}
        </a>
      </li>
    );
  }
  return (
    <li className={'flyout-item'} key={link.name}>
      <a href={destination} target={isExternalLink ? '_blank' : 'self'} rel={isExternalLink ? 'noopener noreferrer' : ''} title={link.name}>
        {link.name}
      </a>
    </li>
  );
});

export default RenderMenuLinks;
