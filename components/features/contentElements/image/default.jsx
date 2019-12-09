import React from 'react';

const Image = () => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Image</strong>
      <img src={this.props.src.url} alt={this.props.src.caption} />
      <p>
        Image description: <strong>{this.props.src.caption}</strong>
      </p>
      <p>
        Author: <strong>{this.props.src.credits.by ? this.props.src.credits.by[0].name : 'No Author'}</strong>
      </p>
    </div>
);
export default Image;
