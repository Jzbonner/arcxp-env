import React from 'react';
import { string } from 'prop-types';

/**
 * @func Html
 * @desc Returns an html tag with all props passed to it
 * @param {Object} props - the properties to pass to the HTML tag
 * @return {Object} decorated html tag
 */
export function Html(props, lang = 'en') {
  const filteredProps = props;
  let language = lang;

  if (filteredProps.lang) {
    language = filteredProps.lang;
    delete filteredProps.lang;
  }

  return <html amp="" {...filteredProps} lang={language} />;
}

Html.propType = {
  lang: string,
};

export default Html;
