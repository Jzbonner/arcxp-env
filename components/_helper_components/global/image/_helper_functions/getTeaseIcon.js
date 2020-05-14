import React from 'react';
import galleryIcon from '../../../../../resources/icons/tease/gallery.svg';
import videoIcon from '../../../../../resources/icons/tease/video.svg';
import '../default.scss';

export default function getTeaseIcon(teaseContentType, isAmp) {
  let iconToRender = null;

  if (teaseContentType && teaseContentType.toLowerCase() === 'video') {
    iconToRender = videoIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'gallery') {
    iconToRender = galleryIcon;
  }

  if (iconToRender) {
    return (
      <div className="c-tease-icon">
        {isAmp
          ? <amp-img width={18} height={18} src={iconToRender}></amp-img>
          : <img className="tease-icon" src={iconToRender} />}
      </div>
    );
  }

  return null;
}
