import React from 'react';
import './styles.scss';

import PropTypes from 'prop-types';

const Comments = ({ commentVisibility, toggleCommentsWindow, articleUrl }) => (
  <div onClick={e => e.stopPropagation()} className={`c-comments ${commentVisibility ? 'showComments' : ''}`}>
    <div className="close" onClick={toggleCommentsWindow}>
      X
    </div>
    <div className="fb-comments" data-href={articleUrl} data-width="100%" data-numposts="100"></div>
  </div>
);

Comments.propTypes = {
  commentVisibility: PropTypes.bool,
  toggleCommentsWindow: PropTypes.func,
  articleUrl: PropTypes.string,
};

export default Comments;
