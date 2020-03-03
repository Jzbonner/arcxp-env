import React from 'react';
import './styles.scss';

import PropTypes from 'prop-types';

const Comments = ({ commentVisibility, toggleCommentsWindow }) => (
    <div onClick={e => e.stopPropagation()} className={`c-comments ${commentVisibility ? 'showComments' : ''}`}>
      <div className="close" onClick={toggleCommentsWindow}>
        X
      </div>
      <div className="fb-comments" data-href={window.location.href} data-width="100%" data-numposts="5"></div>
    </div>
);

Comments.propTypes = {
  commentVisibility: PropTypes.bool,
  toggleCommentsWindow: PropTypes.func,
};

export default Comments;
