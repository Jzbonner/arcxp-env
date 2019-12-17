import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const SecondaryImage = ({ src }) => {
  // console.log(global);
  const secondaryImage = src.url ? src.url : '';
  const [toggleButton, setToggle] = useState(false);
  const { caption } = src;
  const author = src.credits.by ? `Photo: ${src.credits.by.name}` : '';

  const toggle = () => {
    setToggle(!toggleButton);
  };

  const secondaryCaption = (
    <div className="secondary-img-component">
      <div className={`${toggleButton ? 'photo__caption__toggle active' : 'photo__caption__toggle'}`} onClick={toggle}>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
      </div>
      {toggleButton ? (
        <div className="photo_caption">
          <div className="photo__caption__text">{caption}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const SecondaryImageContent = (
    <div className="photo-credit-holder">
      Content Element Type: <strong>Image</strong>
      <div className="img-fluid">
        <img src={secondaryImage} alt={src.caption} />
        {secondaryCaption}
      </div>
      <div className="photo__credit">
        <p className="photo__credit__text">{author}</p>
      </div>
    </div>
  );

  return <div className="img-component">{SecondaryImageContent}</div>;
};

SecondaryImage.propTypes = {
  src: PropTypes.any,
};

export default SecondaryImage;
