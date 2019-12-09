import React from 'react';

const InterstitialLink = () => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Interstitial Link</strong>
      <p dangerouslySetInnerHTML={{ __html: [this.props.src.content] }}></p>
    </div>
);

export default InterstitialLink;
