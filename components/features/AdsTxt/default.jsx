import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import get from 'lodash.get';

const AdsTxt = () => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const siteProps = getProperties(arcSite);
  const adsTxtJson = get(siteProps, 'adsTxt', {});
  const list = [];
  let csvOutput = '';

  if (adsTxtJson) {
    adsTxtJson.forEach((item) => {
      list.push(`${item.domain}, ${item.accountId}, ${item.relationshipType}${item.certId ? ', ' : ''}${item.certId}`);
    });
    csvOutput = list.join('\n');
  }

  return <>{csvOutput}</>;
};

export default AdsTxt;
