import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const ImageComponent = ({ outerComponentClassName, global }) => {
  const featuredImage = global.promo_items.basic.url ? global.promo_items.basic.url : null;
  const [toggleButton, setToggle] = useState(false);
  const featuredCaption = global.promo_items.basic.caption;
  const featuredAuthor = global.promo_items.basic.credits ? `Photo: ${global.promo_items.basic.credits.by[0].name}` : '';
  const toggle = () => {
    setToggle(!toggleButton);
  };

  const featuredCaptionContent = (
    <div>
      <div className={`${toggleButton ? 'photo__caption__toggle active' : 'photo__caption__toggle'}`} onClick={toggle}>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line--long"></div>
      </div>
      {toggleButton ? (
        <div className="photo_caption">
          <div className="photo__caption__text">{featuredCaption}</div>
          <div className="photo__credit__mobile">
            <p className="photo__credit__text">{featuredAuthor}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const featuredImageContent = (
    <div className={`image-${outerComponentClassName} image-default`}>
      <div className="tease__img tease__img--photo">
        <div className="img-fluid">
          <img src={featuredImage} alt={featuredCaption} />
          {featuredCaptionContent}
        </div>
      </div>
      <div className="photo__credit">
        <p className="photo__credit__text">{featuredAuthor}</p>
      </div>
    </div>
  );

  return featuredImageContent;
};

ImageComponent.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  outerComponentClassName: PropTypes.oneOf(['head', 'breaking', 'thumbnail']),
  // linkUrl: PropTypes.string,
  global: PropTypes.any,
};
export default ImageComponent;
