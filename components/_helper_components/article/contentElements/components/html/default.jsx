import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => {
  const { content } = src || {};

  useEffect(() => {
    // powers external scripts and iframes
    const externalScriptFilter = /(?<=src=")[^"]*/gi;
    const externalScripts = content.match(externalScriptFilter);

    if (Array.isArray(externalScripts)) {
      externalScripts.forEach((scriptSrc) => {
        const imgFilter = /(.svg|.png|.jpg|.jpeg|.gif)/;
        if (!scriptSrc.search(imgFilter)) {
          const script = document.createElement('script');
          script.src = scriptSrc;
          script.async = true;
          document.body.appendChild(script);
        }
      });
    }

    // powers inline scripts
    const internalScriptFilter = /(?<=<script>)([\s\S]*)(?=<\/script>)/gi;
    const internalScripts = content.match(internalScriptFilter);

    if (Array.isArray(internalScripts)) {
      internalScripts.forEach((scriptSrc) => {
        const script = document.createElement('script');
        script.innerHTML = scriptSrc;
        document.body.appendChild(script);
      });
    }
  }, []);

  if (!content) return null;
  return <div className="b-margin-bottom-d40-m20" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
