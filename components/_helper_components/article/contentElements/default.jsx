import React from 'react';
import PropTypes from 'prop-types';
import BlockQuote from './components/blockQuote/default';
import Correction from './components/correction/default';
import Gallery from './components/gallery/default';
import HTML from './components/html/default';
import SecondaryImage from './components/image/default';
import InterstitialLink from './components/interstitial_link/default';
import List from './components/list/default';
import Paragraph from './components/paragraph/default';
import Oembed from './components/social_url/default';
import Table from './components/table/default';
import Video from './components/video/default';
import Header from './components/header/default';

const ContentElements = ({ contentElements }) => (

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
