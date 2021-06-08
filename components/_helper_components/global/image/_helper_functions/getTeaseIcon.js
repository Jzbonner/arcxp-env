import React from 'react';
import galleryIcon from '../../../../../resources/icons/tease/redesign/camera-icon.svg';
import videoIcon from '../../../../../resources/icons/tease/redesign/video.svg';
import docIcon from '../../../../../resources/icons/tease/redesign/documents.svg';
import podcastIcon from '../../../../../resources/icons/tease/redesign/podcast.svg';
import '../default.scss';

export default function getTeaseIcon(teaseContentType, isAmp) {
  let iconToRender = null;

  if (teaseContentType && teaseContentType.toLowerCase() === 'video') {
    iconToRender = videoIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'gallery') {
    iconToRender = galleryIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'document') {
    iconToRender = docIcon;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'podcast') {
    iconToRender = podcastIcon;
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
