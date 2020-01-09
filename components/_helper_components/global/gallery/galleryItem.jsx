import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = (props) => {
  const { data } = props;
  const {
    url, alt, index, id, by, captionObj, states,
  } = data;
  const { caption } = captionObj;
  const {
    isFocused, isStickyVisible, isCaptionOn,
  } = states;
  return (
    <div
      id={id}
      data-index={index}
      key={url}
      className={`${isStickyVisible ? 'gallery-full-item' : 'gallery-image'} ${!isStickyVisible ? 'inherit--width mosiac-image' : ''}`}>
      <img
        className={`${!isStickyVisible ? 'inherit--width mosiac-image' : ''} ${isFocused ? 'is-focused' : ''}`}
        src={url}
        alt={alt ? `${alt}` : ''}
      />
      {
        isStickyVisible
          ? <div>
            <div className="gallery-credit">
              {by && by[0] ? by[0].name : null}
            </div>
            {
              isCaptionOn
                ? <div className="gallery-caption">
                  {caption || null}
                </div>
                : null
            }
          </div> : null
      }

    </div>
  );
};

GalleryItem.propTypes = {
  data: PropTypes.object,
  url: PropTypes.string,
  alt: PropTypes.string,
  index: PropTypes.number,
  focus: PropTypes.bool,
  id: PropTypes.string,
  isStickyVisible: PropTypes.bool,
  isCaptionOn: PropTypes.bool,
  captionObj: PropTypes.object,
};

export default GalleryItem;
