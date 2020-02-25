import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => {
  const { content } = src || {};
  if (!content) return null;

  useEffect(() => {
    // powers external scripts and iframes
    const externalScriptFilter = /src="[^"]*/g;
    const externalScripts = content.match(externalScriptFilter);

    if (Array.isArray(externalScripts)) {
      externalScripts.forEach((scriptSrc) => {
        const imgFilter = /(.svg|.png|.jpg|.jpeg|.gif)/;
        if (scriptSrc.search(imgFilter) === -1) {
          const script = document.createElement('script');
          script.src = scriptSrc.slice(5);
          script.async = true;
          document.body.appendChild(script);
        }
      });
    }

    // powers inline scripts
    const internalScriptFilter = /<script>([\s|\S]+?)(?=<\/script>)/g;
    const internalScripts = content.match(internalScriptFilter);

    if (Array.isArray(internalScripts)) {
      internalScripts.forEach((scriptSrc) => {
        const script = document.createElement('script');
        script.innerHTML = scriptSrc.slice(8);
        document.body.appendChild(script);
      });
    }
  }, []);

  return <div className="b-margin-bottom-d40-m20" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
