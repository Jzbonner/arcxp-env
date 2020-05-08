import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const renderCustomHtml = (content) => {
  if (!content) return null;
  const [html, setHtml] = useState(content);

  useEffect(() => {
    // powers all inline & external scripts in embedded html
    if (html.search(/<script/gi) !== -1) {
      // only proceed if it actually contains a script (added because <style /> blocks were triggering)
      const scriptFilter = /(<script\b[^>]*>[\s\S]*?<\/script>)/gmi;
      let scriptBlocks = html.split(scriptFilter);
      setHtml(html.replace(scriptFilter, ''));

      if (Array.isArray(scriptBlocks)) {
        scriptBlocks = scriptBlocks.filter(script => script.length > 1);
        scriptBlocks.forEach((scriptBlock) => {
          let scriptTags = scriptBlock.split(/<\/script>/gi);
          // we do a second script check/split because in some cases it doesn't split ALL on the first go-round
          // mostly an issue in Third Party Tease features, where all of the code is in a single `html` block
          scriptTags = scriptTags ? scriptTags.filter(scriptTag => scriptTag !== '') : [];
          scriptTags.forEach((script) => {
            if (script.indexOf('<script') > -1) {
              // we ensure it's actually a script, and not html or something else (as is sometimes the case)
              // before we (re)create it as a new script tag
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
