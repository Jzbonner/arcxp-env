import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => {
  const { content } = src || {};

  // powers external scripts and iframes
  const externalScriptFilter = /(?<=src=")[^"]*/gi;
  const externalScripts = content.match(externalScriptFilter);

  externalScripts.forEach((scriptSrc) => {
    const imgFilter = /(.svg|.png|.jpg|.jpeg|.gif)/;
    if (!scriptSrc.search(imgFilter)) {
      useEffect(() => {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      }, []);
    }
  });

  // powers inline scripts
  const internalScriptFilter = /(?<=<script>)([\s\S]*)(?=<\/script>)/gi;
  const internalScripts = content.match(internalScriptFilter);

  internalScripts.forEach((scriptSrc) => {
    useEffect(() => {
      const script = document.createElement('script');
      script.innerHTML = scriptSrc;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);
  });

  if (!content) return null;
  return <div className="b-margin-bottom-d40-m20 html" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
