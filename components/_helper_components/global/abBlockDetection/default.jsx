import React from 'react';
import PropTypes from 'prop-types';
import BlockDetectionScript from './helper_components/BlockDetectionScript';

const DetectAdBlocker = (pageUrl = '', uuid = '') => (
  <div id="detection-wrapper">
    <div id="ADS_2" style={{ height: '0px', width: '0px' }} >
    </div>
    <BlockDetectionScript pageUrl={pageUrl} uuid={uuid} />
  </div>
);

DetectAdBlocker.propTypes = {
  pageUrl: PropTypes.string,
  uuid: PropTypes.string,
};

export default DetectAdBlocker;
