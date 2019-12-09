import React from 'react';
import { useAppContext } from 'fusion:context';
import BlockQuote from './blockQuote/default';
import Correction from './correction/default';
import Gallery from './gallery/default';
import HTML from './html/default';
import Image from './image/default';
import InterstitialLink from './interstitial_link/default';
import LinkList from './link_list/default';
import List from './list/default';
import Paragraph from './paragraph/default';
import SocialURL from './social_url/default';
import Table from './table/default';
import Video from './video/default';
import Header from './header/default';

const ContentElement = () => {
  const context = useAppContext();
  const { globalContent } = context;
  const allElements = globalContent.content_elements ? globalContent.content_elements : [];
  // console.log('CONTENT ELEMENTS', contentElements);

  return (
    <div>
      {allElements.map((element, idx) => {
        // console.log('ELEMENT TYPE', element.type)
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
          case 'link_list':
            return <LinkList src={element} />;
          case 'list':
            return <List src={element} />;
          case 'oembed_response':
            return <SocialURL src={element} />;
          case 'table':
            return <Table src={element} />;
          case 'video':
            return <Video src={element} />;
          default:
            return (
              <ul>
                <li key={idx}>{element.type}</li>
              </ul>
            );
        }
      })}
    </div>
  );
};

export default ContentElement;
