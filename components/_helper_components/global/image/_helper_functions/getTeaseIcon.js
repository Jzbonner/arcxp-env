import React from 'react';
import galleryIcon from '../../../../../resources/icons/tease/gallery.svg';
import videoIcon from '../../../../../resources/icons/tease/video.svg';
import '../default.scss';

export default function getTeaseIcon(teaseContentType) {
  let iconToRender = null;

  if (teaseContentType && teaseContentType.toLowerCase() === 'video') {
    iconToRender = videoIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'gallery') {
    iconToRender = galleryIcon;
  }

  if (iconToRender) {
    return (
      <div className="c-tease-icon">
          <img className="tease-icon" src={iconToRender} />
      </div>
    );
  }

  return null;
}
