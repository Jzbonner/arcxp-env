import React from 'react';
import './styles.scss';

const BlogAuthor = ({ authorData }) => (
  <div className="c-blogAuthor c-section">
    <p className="componentTitle">About the Author{authorData.length > 1 ? "'s" : ''}</p>
    <div className="blogAuthor-content">
      <div className="row">
        <div className="profileImg">
          <img src={authorData[0].image.url} />
        </div>
        <p className="authorName">{authorData[0].name}</p>
      </div>
      <p className="authorDescription">{authorData[0].description}</p>
    </div>
  </div>
);

export default BlogAuthor;
