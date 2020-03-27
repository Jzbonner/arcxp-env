import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import VideoComponent from '../../_helper_components/global/video/default';

const Video = (customFields = {}) => {
  const { maxTabletViewWidth } = getProperties();
  const {
    customFields: { autoplay = false, title = '', content: { contentService = 'video-api', contentConfigValues = { uuid: '' } } = {} },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  if (data) {
    return (
      <div className="b-margin-bottom-d30-m20">
        {title && <div className="b-sectionTitle">{title}</div>}
        <VideoComponent
          src={data}
          isInlineVideo={true}
          inlineVideoPlayerRules={{ startPlaying: autoplay, muteON: true }}
          maxTabletViewWidth={maxTabletViewWidth}
        />
      </div>
    );
  }
  return null;
};

Video.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('video').tag({
      name: 'Content',
    }),
    autoplay: PropTypes.bool.tag({
      name: 'Autoplay?',
      defaultValue: false,
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
  }),
};

export default Video;
