import React from 'react';
import CameraIcon from '../../../../../resources/icons/tease/redesign/CameraIcon';
import VideoIcon from '../../../../../resources/icons/tease/redesign/VideoIcon';
import DocumentIcon from '../../../../../resources/icons/tease/redesign/DocumentIcon';
import PodcastIcon from '../../../../../resources/icons/tease/redesign/PodcastIcon';
import '../default.scss';

export default function getTeaseIcon(teaseContentType) {
  let iconToRender = null;

  if (teaseContentType && teaseContentType.toLowerCase() === 'video') {
    iconToRender = <VideoIcon />;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'gallery') {
    iconToRender = <CameraIcon />;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'document') {
    iconToRender = <DocumentIcon />;
  } else if (teaseContentType && teaseContentType.toLowerCase() === 'podcast') {
    iconToRender = <PodcastIcon />;
  }

  if (iconToRender) {
    return (
      <div className="c-tease-icon">
        <span className="tease-icon">{iconToRender}</span>
      </div>
    );
  }

  return null;
}
