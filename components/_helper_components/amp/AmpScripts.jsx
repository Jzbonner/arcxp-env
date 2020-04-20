import React from 'react';

const AmpScripts = () => (
  <>
    <script
      async
      src="https://cdn.ampproject.org/v0.js"
    />
    <script
      async
      custom-element="amp-position-observer"
      src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js"
    />
    <script
      async
      custom-element="amp-animation"
      src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
    />
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    />
  </>
);

export default AmpScripts;
