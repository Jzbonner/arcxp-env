import React from 'react';
import { useAppContext } from 'fusion:context';
import Oembed from './default';
import './default.scss';

const container = () => {
  const context = useAppContext();
  const { globalContent } = context;
  return (
    <div>
     <Oembed
     className={'default'}
     type={globalContent.content_elements[1].raw_oembed.type}
     html={globalContent.content_elements[1].raw_oembed.html}/>
     <Oembed
     className={'default'}
     type={globalContent.content_elements[3].raw_oembed.type}
     html={globalContent.content_elements[3].raw_oembed.html}/>
     <Oembed
     className={'default'}
     type={globalContent.content_elements[5].raw_oembed.type}
     html={globalContent.content_elements[5].raw_oembed.html}/>
     <Oembed
     className={'default'}
     type={globalContent.content_elements[7].raw_oembed.type}
     html={globalContent.content_elements[7].raw_oembed.html}/>
     <Oembed
     className={'default'}
     type={globalContent.content_elements[8].raw_oembed.type}
     html={globalContent.content_elements[8].raw_oembed.html}/>
     </div>
  );
};

export default container;
