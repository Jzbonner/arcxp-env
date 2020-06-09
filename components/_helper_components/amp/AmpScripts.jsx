import React from 'react';
import PropTypes from 'prop-types';
import ampScriptSwitch from '../../../src/js/ampScriptSwitch';

const AmpScripts = ({ contentElements }) => {
  const scriptsArr = [];
  const oembedScripts = contentElements.map((element) => {
    if (element.type === 'oembed_response' || element.type === 'raw_html') {
      const { raw_oembed: rawOembed, content } = element || {};
      const { type } = rawOembed || {};
      return ampScriptSwitch(type, scriptsArr, content);
    }
    return null;
  });

  return (
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
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    />
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
    <script
      async
      custom-element="amp-carousel"
      src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
    />
    <script
    async
    custom-element="amp-analytics"
    src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
    />
    {oembedScripts}
  </>
  );
};

AmpScripts.propTypes = {
  contentElements: PropTypes.array,
};

export default AmpScripts;
