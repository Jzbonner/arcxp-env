import React from 'react';
import galleryIcon from '../../../../../resources/icons/tease/gallery.svg';
import videoIcon from '../../../../../resources/icons/tease/video.svg';

export default function getTeaseIcon(teaseContentType, url) {
  let iconToRender = null;

  if (teaseContentType && teaseContentType.toLowerCase() === 'video') {
    iconToRender = videoIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'gallery') {
    iconToRender = galleryIcon;
  }

  if (iconToRender) {
    return (
      <div className="c-tease-icon">
        <a className="tease-icon" href={url || null}>
          <img src={iconToRender}></img>
        </a>
      </div>
    );
  }

  return null;
}
