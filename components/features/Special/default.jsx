import React from 'react';
import PropTypes from 'prop-types';
import podcast from '../../../resources/icons/special/podcast.svg';
import './default.scss';


const Special = (customFields = {}) => {
  const {
    customFields: {
      backgroundImgSrc = '', icon = '', title = '', url = '',
    },
  } = customFields;

  /* TODO: icon switch */

  const getIcon = () => {
    switch (icon) {
      case 'Podcast':
        return podcast;
      default:
        break;
    }

    return null;
  };

  if (!backgroundImgSrc) return null;

  return (
    <div className="c-special" style={{ background: `${backgroundImgSrc ? `url(${backgroundImgSrc})` : ''}` }}>
      <a href={url || ''}>
        <div className="c-call-to-action">
          {icon ? <img className="action-icon" src={getIcon()} /> : null}
          {title ? <div className="action-text">
            <span>{`${title}`}</span>
          </div> : null}
        </div>
      </a>
    </div>
  );
};


Special.propTypes = {
  customFields: PropTypes.shape({
    backgroundImgSrc: PropTypes.string.tag({
      name: 'Background Image Url',
    }),
    icon: PropTypes.oneOf([
      'Podcast',
    ]).tag({
      name: 'Call To Action Icon',
    }),
    title: PropTypes.string.tag({
      name: 'Call To Action Text',
    }),
    url: PropTypes.string.tag({
      name: 'Call To Action URL',
    }),
  }),
};

export default Special;
