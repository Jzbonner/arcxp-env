import React from 'react';
import PropTypes from 'prop-types';
import BlockQuote from './blockQuote/default';
import Correction from './correction/default';
import Gallery from './gallery/default';
import HTML from './html/default';
import Image from './image/default';
import InterstitialLink from './interstitial_link/default';
import List from './list/default';
import Paragraph from './paragraph/default';
import Oembed from './socialUrl/default';
import Table from './table/default';
import Video from './video/default';
import Header from './header/default';


const ContentElements = ({ contentElements }) => (
    <div>
      {contentElements.map((element) => {
        console.log('ELEMENT', element);
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
            return <Image src={element} />;
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
