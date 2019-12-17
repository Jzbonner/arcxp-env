import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const HeadlineImage = ({ global }) => {
  // console.log(global);
  const featuredImage = global.promo_items.basic.url ? global.promo_items.basic.url : null;
  const title = global.headlines.basic ? global.headlines.basic : null;
  const [toggleButton, setToggle] = useState(false);
  const featuredCaption = global.promo_items.basic.caption;
  const author = global.promo_items.basic.credits ? `Photo: ${global.promo_items.basic.credits.by.name}` : '';

  console.log(global);

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
        </div>
      ) : (
        ''
      )}
    </div>
  );

  const MainImageContent = (
    <div className="main-img-component">
      <div className="tease__img tease__img--photo">
        <div className="img-fluid">
          <img src={featuredImage} alt={title} />
          {featuredCaptionContent}
        </div>
      </div>
      <div className="photo__credit">
        <p className="photo__credit__text">
          {author}
        </p>
      </div>
    </div>
  );

  return <div className="img-component">{MainImageContent}</div>;
};

HeadlineImage.propTypes = {
  global: PropTypes.any,
};

export default HeadlineImage;
