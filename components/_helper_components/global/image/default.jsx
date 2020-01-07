import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Image = ({ outerComponentClassName, basicItems }) => {
  // console.log(basicItems);
  const { url } = basicItems || null;
  const [toggleButton, setToggle] = useState(false);
  const { caption } = basicItems || null;
  const name = basicItems.credits || null;
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

  const featuredCaptionContent = (
    <div className="c-mainCaption">
      <div className={`${toggleButton ? 'photo__caption__toggle is-active' : 'photo__caption__toggle'}`} onClick={toggle}>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
      </div>
      {toggleButton ? (
        <div className="photo_caption">
          <div className="photo__caption__text">{caption}</div>
          <div className="photo__credit__mobile">
            <p className="photo__credit__text">{giveCredit}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const featuredImageContent = (
    <div className={`image-${outerComponentClassName} c-mainImage-content`}>
        <div className="img-fluid">
          <img src={url} alt={caption} />
          {featuredCaptionContent}
        </div>
      <div className="photo__credit">
        <p className="photo__credit__text">{giveCredit}</p>
      </div>
    </div>
  );

  return <div className="c-mainImage">{featuredImageContent}</div>;
};

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  outerComponentClassName: PropTypes.oneOf(['head', 'breaking', 'thumbnail']),
  // linkUrl: PropTypes.string,
  basicItems: PropTypes.object,
};
export default Image;
