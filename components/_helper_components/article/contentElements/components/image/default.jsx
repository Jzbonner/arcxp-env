import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const SecondaryImage = ({ src }) => {
  // console.log('SRC', src);
  const { url } = src || null;
  const [toggleButton, setToggle] = useState(false);
  const { caption } = src;
  const name = src.credits || null;
  let mainCredit = null;
  let secondaryCredit = null;
  if (name) {
    mainCredit = name.affiliation && name.affiliation.length ? name.affiliation[0].name : '';
    secondaryCredit = name.by && name.by.length ? name.by[0].name : '';
  }

  let giveCredit = '';
  if (mainCredit.length > 1) {
    giveCredit = `Photo: ${mainCredit}`;
  } else if (secondaryCredit.length > 1) {
    giveCredit = `Photo: ${secondaryCredit}`;
  }
  const toggle = () => {
    setToggle(!toggleButton);
  };

  const secondaryCaption = (
    <div className="c-secondaryCaption">
      <div className={`${toggleButton ? 'photo__caption__toggle is-active' : 'photo__caption__toggle'}`} onClick={toggle}>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
      </div>
      {toggleButton ? (
        <div className="photo_caption_secondaryImage">
          <div className="photo__caption__text">{caption}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const SecondaryImageContent = (
    <div className="c-secondaryImage-content">
      Content Element Type: <strong>Image</strong>
      <div className="img-fluid">
        <img src={url} alt={src.caption} />
        {secondaryCaption}
      </div>
      <div className="photo__credit">
        <p className="photo__credit__text">{giveCredit}</p>
      </div>
    </div>
  );

  return <div className="c-secondaryImage">{SecondaryImageContent}</div>;
};

SecondaryImage.propTypes = {
  src: PropTypes.any,
};

export default SecondaryImage;
