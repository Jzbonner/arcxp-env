import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import { taboolaID } from 'fusion:environment';
import getProperties from 'fusion:properties';
import { taboolaFooterScript } from '../../../../src/js/taboola/taboolaScripts';


const TaboolaFooter = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { appContext } = useAppContext();
  const { layout } = appContext || { layout: null };
  const {
    boapPTD,
    moapPTD,
  } = taboolaID;
  const { siteName } = getProperties(arcSite);
  return (<script type='text/javascript' dangerouslySetInnerHTML={{
    __html: taboolaFooterScript(layout, boapPTD, moapPTD, siteName),
  }}></script>
  );
};

TaboolaFooter.propTypes = {
  type: PropTypes.string,
};
export default TaboolaFooter;
