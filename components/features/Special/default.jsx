import React from 'react';
import PropTypes from 'prop-types';
import Podcast from '../../../resources/icons/special/Podcast';
import './default.scss';


const Special = (customFields = {}) => {
  const {
    customFields: {
      backgroundImgSrc = '', icon = '', title = '', url = '',
    },
  } = customFields;

  const getIcon = () => {
    switch (icon) {
      case 'Podcast':
        return <Podcast />;
      default:
        break;
    }

    return null;
  };

  if (!backgroundImgSrc) return null;

  return (
    <a href={url || ''} style={{ width: 'inherit' }}>
      <div
        className="c-special"
           style={{
             background: `${backgroundImgSrc ? `url(${backgroundImgSrc})` : ''}`,
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'cover',
           }}>
        <div className="c-call-to-action">
          {icon ? <span className="action-icon">{getIcon()}</span> : null}
          {title ? <div className="action-text">
            <span>{`${title}`}</span>
          </div> : null}
        </div>
      </div>
    </a>
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
