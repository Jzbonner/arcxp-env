import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const Comments = ({ commentVisibility }) => <div className={`c-comments ${commentVisibility ? 'showComments' : ''}`}>test</div>;

Comments.propTypes = {
  commentVisibility: PropTypes.bool,
};

export default Comments;
