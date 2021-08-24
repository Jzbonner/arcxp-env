import React, { Fragment } from 'react';
import { string } from 'prop-types';

/**
 * @func Style
 * @desc Create AMP styles
 * @param {String|Object} children - styles to inject
 * @param {Object[]} props - any other props
 * @return {Object} styles for AMP
 */
function Style({ children, ...props }) {
  return <style {...props} dangerouslySetInnerHTML={{ __html: children }} />;
}

Style.propTypes = {
  children: string.isRequired,
};

/**
 * @func AmpBoilerplateStyle
 * @desc Create AMP styles boilerplate
 * @return {Object} styles required for AMP code base
 */
function AmpBoilerplateStyle() {
  return (
    <Style amp-boilerplate="">
      {
        // eslint-disable-next-line
        'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}'
      }
    </Style>
  );
}

/**
 * @func AmpNoScript
 * @desc Create AMP styles boilerplate when javascript is disabled
 * @return {Object} styles that remove all amp boilerplate and animations
 */
function AmpNoScript() {
  return (
    <noscript>
      <Style amp-boilerplate="">
        {
          'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}'
        }
      </Style>
    </noscript>
  );
}

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

/**
 * @func BaseMarkup
 * @desc Create the basic AMP markup
 * @param {String} canonicalUrl - the canonicalURL for the defaut meta data
 * @return {Object} default metadata including canonical URL and AMP base markup
 */
export function BaseMarkup() {
  return (
    <Fragment>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <AmpBoilerplateStyle />
      <AmpNoScript />
    </Fragment>
  );
}

BaseMarkup.propTypes = {
  canonicalUrl: string.isRequired,
};

export default BaseMarkup;
