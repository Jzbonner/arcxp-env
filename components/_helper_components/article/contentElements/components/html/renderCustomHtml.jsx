import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const renderCustomHtml = (content) => {
  if (!content) return null;
  const [html, setHtml] = useState(content);

  useEffect(() => {
    // powers all inline & external scripts in embedded html
    if (html.search(/<script/gi) !== -1) {
      // only proceed if it actually contains a script (added because <style /> blocks were triggering)
      const scriptFilter = /[<script+?>\s\S]*/gi;
      let scripts = html.match(scriptFilter);
      setHtml(html.replace(scriptFilter, ''));

      if (Array.isArray(scripts)) {
        scripts = scripts.filter(script => script !== '');
        scripts.forEach((script) => {
          const newScript = document.createElement('script');
          const externalFilter = /.*?src=['"](.*?)['"]/gmi;
          if (script.search(externalFilter) !== -1) {
            let scriptSrc = script.match(externalFilter);
            scriptSrc = scriptSrc[0].replace(/.*?src=|['"]/gmi, '');
            newScript.src = scriptSrc;
          } else {
            const scriptVal = script.replace(/<script.*?>|<\/script>/g, '');
            newScript.innerHTML = scriptVal;
          }
          document.body.appendChild(newScript);
        });
      }
    }
  }, []);

  return html;
};

renderCustomHtml.propTypes = {
  content: PropTypes.string,
};

export default renderCustomHtml;
