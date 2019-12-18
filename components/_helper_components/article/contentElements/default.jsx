import React from 'react';
import PropTypes from 'prop-types';
import BlockQuote from './components/blockQuote/default.jsx';
import Correction from './components/correction/default.jsx';
import Gallery from './components/gallery/default.jsx';
import HTML from './components/html/default.jsx';
import SecondaryImage from './components/image/default.jsx';
import InterstitialLink from './components/interstitial_link/default.jsx';
import List from './components/list/default.jsx';
import Paragraph from './components/paragraph/default.jsx';
import Oembed from './components/social_url/default.jsx';
import Table from './components/table/default.jsx';
import Video from './components/video/default.jsx';
import Header from './components/header/default.jsx';

const ContentElement = ({ content }) => {
  /*
     1. Because the blockquote element has the potential to have a list of the same elements that found in the article,
     I imported this countElements component into the blockQuote element to also display that content.

     When this component is used to display article elements, the content_elements array is a key on the passed-in Content prop.
     When this component is used to display blockquote elements, the content_elements array is passed in directly.

     2. Eslint Docs said the below method was the correct way to call hasOwnProperty.
     I got an elslint error when doing content.hasOwnProperty('content_elements').
  */
  const allElements = Object.prototype.hasOwnProperty.call(content, 'content_elements') ? content.content_elements : content;

  return (
    <div>
      {contentElements.map((element) => {
        switch (element.type) {
          case 'blockquote':
          case 'quote':
            return <BlockQuote src={element} />;
          case 'correction':
            return <Correction src={element} />;
          case 'gallery':
            return <Gallery src={element} />;
          case 'raw_html':
            return <HTML src={element} />;
          case 'header':
            return <Header src={element} />;
          case 'image':
            return <SecondaryImage src={element} />;
          case 'text':
            return <Paragraph src={element} />;
          case 'interstitial_link':
            return <InterstitialLink src={element} />;
          case 'list':
            return <List src={element} />;
          case 'oembed_response':
            return <Oembed src={element.raw_oembed} />;
          case 'table':
            return <Table src={element} />;
          case 'video':
            return <Video src={element} />;
          default:
            return (
              <ul>
                <li key={element.id}>{element.type}</li>
              </ul>
            );
        }
      })}
    </div>
);

ContentElements.propTypes = {
  contentElements: PropTypes.Array,
};

export default ContentElements;
