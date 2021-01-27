import React from 'react';
import BlockDetectionScript from './helper_components/BlockDetectionScript';

const DetectAdBlocker = () => (
  <div id="detection-wrapper">
    <div id="ADS_2" style={{ height: '0px', width: '0px' }} >
    </div>
    <BlockDetectionScript />
  </div>
);

export default DetectAdBlocker;
