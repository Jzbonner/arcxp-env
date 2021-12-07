import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import { taboolaHeaderScript } from '../../../../src/js/taboola/taboolaScripts';

const TaboolaHeader = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { taboola } = getProperties(arcSite);
  const {
    cdnLink,
  } = taboola;
  const appContext = useAppContext();
  const { layout } = appContext || {};
  if (layout) {
    return (
      <script dangerouslySetInnerHTML={{
        __html: taboolaHeaderScript(layout, cdnLink),
      }}></script>
    );
  }
  return <></>;
};

export default TaboolaHeader;
