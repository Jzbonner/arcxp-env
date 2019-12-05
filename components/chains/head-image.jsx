import React from 'react';
import ImageComponent from '../features/image/default';
import demo from '../../resources/images/demo.jpg';


const headImageChain = () => {
  return (
        <div>
            <ImageComponent url={demo} alt={'I am a building'} location={'head'}/>
        </div>
  );
};

export default headImageChain;
