import React from 'react';

const SocialURL = () => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Social URL</strong>
      <div dangerouslySetInnerHTML={{ __html: [this.props.src.raw_oembed.html] }}></div>
    </div>
);

export default SocialURL;
