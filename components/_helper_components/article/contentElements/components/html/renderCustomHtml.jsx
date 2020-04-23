import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const renderCustomHtml = (content) => {
  if (!content) return null;
  const [html, setHtml] = useState(content);

  useEffect(() => {
    // powers all inline & external scripts in embedded html
    if (html.search(/<script/gi) !== -1) {
      // only proceed if it actually contains a script (added because <style /> blocks were triggering)
      const execScript = (script) => {
        if (script.indexOf('<script') > -1) {
          const newScript = document.createElement('script');
          const externalFilter = /[script|type=".*"] src=['"](.*?)['"]/gmi;
          if (script.search(externalFilter) !== -1) {
            let scriptSrc = script.match(externalFilter);
            scriptSrc = scriptSrc[0].replace(/.*?src=|['"]/gmi, '');
            newScript.src = scriptSrc;
          } else {
            const scriptVal = script.replace(/<script.*?>|<\/script>/gi, '');
            newScript.innerHTML = scriptVal;
          }
          document.body.appendChild(newScript);
        }
      };
      const scriptFilter = /(<script.*?>.*?<\/script>)/gi;
      let scripts = html.split(scriptFilter);
      setHtml(html.replace(scriptFilter, ''));

      if (Array.isArray(scripts)) {
        scripts = scripts.filter(script => script !== '');
        scripts.forEach((script) => {
          let secondaryScripts = script.split(/<\/script>/gi);
          // we do a second script check/split because in some cases it doesn't split ALL on the first go-round
          // mostly an issue in Third Party Tease features, where all of the code is in a single `html` block
          secondaryScripts = secondaryScripts ? secondaryScripts.filter(newScript => newScript !== '') : [];
          secondaryScripts.forEach((secondaryScript) => {
            execScript(secondaryScript);
          });
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
