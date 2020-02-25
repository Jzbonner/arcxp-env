import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const HTML = ({ src }) => {
  const { content } = src || '';
  if (!content) return null;

  const [html, setHtml] = useState(content);

  useEffect(() => {
    // powers external scripts and iframes
    const externalScriptFilter = /src="[^"]*/g;
    const externalScripts = html.match(externalScriptFilter);


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
    const internalScriptFilter = /<script>([\s|\S]+?)<\/script>/g;
    const internalScripts = html.match(internalScriptFilter);
    setHtml(html.replace(internalScriptFilter, ''));

    if (Array.isArray(internalScripts)) {
      internalScripts.forEach((scriptSrc) => {
        const script = document.createElement('script');
        script.innerHTML = scriptSrc.slice(8, -9);
        document.body.appendChild(script);
      });
    }
  }, []);

  return <div className="b-margin-bottom-d40-m20 c-customHTML" dangerouslySetInnerHTML={{ __html: html }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
