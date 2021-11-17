import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';


const YoutubeVideo = ({ customFields = {} }) => {
  const { embedCode } = customFields;

  return (
    <div className='youtube-container'>
      <div className="c-youtube">
        <iframe
          src={`https://www.youtube.com/embed/${embedCode}`}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

YoutubeVideo.propTypes = {
  customFields: PropTypes.shape({
    embedCode: PropTypes.string.isRequired.tag({
      name: 'Youtube Embed Code',
    }),
  }),
};

YoutubeVideo.label = 'Common - Youtube Video';

export default YoutubeVideo;
