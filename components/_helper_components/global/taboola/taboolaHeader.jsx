import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import { taboolaHeaderScript } from '../../../../src/js/taboola/taboolaScripts';

const TaboolaHeader = () => {
  const { taboola } = getProperties();
  const {
    cdnLink,
  } = taboola;
  const appContext = useAppContext();
  const { layout } = appContext || {};
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: taboolaHeaderScript(layout, cdnLink),
    }}></script>
  );
};

export default TaboolaHeader;
