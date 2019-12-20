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

const ContentElement = ({ contentElements }) => {
  const allElements = contentElements || [];

  return (
    <div>
<<<<<<< HEAD
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
=======
      {allElements.map((element, i) => {
        // console.log('ELEMENT', element);
        switch (element.type) {
          case 'blockquote':
          case 'quote':
            return <BlockQuote key={i} src={element} />;
          case 'correction':
            return <Correction key={i} src={element} />;
          case 'gallery':
            return <Gallery key={i} src={element} />;
          case 'raw_html':
            return <HTML key={i} src={element} />;
          case 'header':
            return <Header key={i} src={element} />;
          case 'image':
            return <Image key={i} src={element} />;
          case 'text':
            return <Paragraph key={i} src={element} />;
          case 'interstitial_link':
            return <InterstitialLink key={i} src={element} />;
          case 'list':
            return <List key={i} src={element} />;
          case 'oembed_response':
            return <SocialURL key={i} src={element} />;
          case 'table':
            return <Table key={i} src={element} />;
          case 'video':
            return <Video key={i} src={element} />;
          default:
            return (
              <ul key={i}>
>>>>>>> ADP-29/UpatedLogicToSupportDisplayingOfListsAndParagraphs-Nicholas
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
