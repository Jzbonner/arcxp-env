import React from 'react';
import PropTypes from 'prop-types';
import { taboolaHeaderScript } from '../../../src/js/taboola/taboolaScripts';

const TaboolaHeader = ({ type }) => (
    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: taboolaHeaderScript(type),
    }}></script>
);
TaboolaHeader.propTypes = {
  type: PropTypes.string,
};


export default TaboolaHeader;
