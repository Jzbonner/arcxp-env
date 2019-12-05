import React from 'react';
import ImageComponent from './default';
import demo from '../../../resources/images/demo.jpg';
import './default.scss';


const ImageContainer = () => {
  return (
    <div>
        <ImageComponent url={demo} alt={'I am a building'} location={'head'}/>
        This is the image size for the head
        <ImageComponent url={demo} alt={'I am a building'} location={'breaking'}/>
        This is the image size for breaking news
        <ImageComponent url={demo} alt={'I am a building'} location={'thumbnail'}/>
        This is the image size for thumbnails
    </div>
  );
};

export default ImageContainer;
