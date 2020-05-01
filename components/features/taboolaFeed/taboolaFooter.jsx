import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { taboolaID } from 'fusion:environment';
import { taboolaFooterScript } from '../../../src/js/taboola/taboolaScripts';


const TaboolaFooter = () => {
  const { appContext } = useAppContext();
  const { layout } = appContext || { layout: null };
  const {
    boapPTD,
    moapPTD,
  } = taboolaID;
  return (<script type='text/javascript' dangerouslySetInnerHTML={{
    __html: taboolaFooterScript(layout, boapPTD, moapPTD),
  }}></script>
  );
};

TaboolaFooter.propTypes = {
  type: PropTypes.string,
};
export default TaboolaFooter;
