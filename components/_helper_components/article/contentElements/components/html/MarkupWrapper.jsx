/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss';

const MarkupWrapper = ({ html }) => {

  console.log("MarkupWrapper", html.match(/\<script/))

  if (html.match(/<script/)) {
    console.log("MarkupWrapper => script")
    return <iframe className="scriptIframe" frameBorder="0" scrolling="no" width="100%" height="400" srcDoc={html} />;
  }
  else {
    console.log("MarkupWrapper => non script")
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
}

MarkupWrapper.propTypes = {
  html: PropTypes.string,
}

export default MarkupWrapper;
/* eslint-enable */
