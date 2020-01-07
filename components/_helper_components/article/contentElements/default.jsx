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

const ContentElements = ({ contentElements }) => (
  <div className="c-contentElements">
    {contentElements.map((element) => {
      switch (element.type) {
        case 'div':
          return element;
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
