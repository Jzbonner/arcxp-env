import React from 'react';
import PropTypes from 'prop-types';
import { taboolaID } from 'fusion:environment';
import { taboolaFooterScript } from '../../../src/js/taboola/taboolaScripts';


const TaboolaFooter = ({ type }) => {
  const {
    boapPTD,
    moapPTD,
  } = taboolaID;
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: taboolaFooterScript(type, boapPTD, moapPTD),
    }}></script>
  );
};

TaboolaFooter.propTypes = {
  type: PropTypes.string,
};
export default TaboolaFooter;
