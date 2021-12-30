import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { taboolaFooterScript } from '../../../../src/js/taboola/taboolaScripts';


const TaboolaFooter = () => {
  const { appContext } = useAppContext();
  const { layout } = appContext || { layout: null };
  return (<script dangerouslySetInnerHTML={{
    __html: taboolaFooterScript(layout),
  }}></script>
  );
};

TaboolaFooter.propTypes = {
  type: PropTypes.string,
};
export default TaboolaFooter;
