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
      custom-element="amp-sidebar"
      src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
    />
    <script
      async
      custom-element="amp-fx-flying-carpet"
      src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"
    />
    <script
      async
      custom-element="amp-social-share"
      src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
    />
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    />
  </>
);

export default AmpScripts;
