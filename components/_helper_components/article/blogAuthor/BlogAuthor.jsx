import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BlogAuthor = ({ subtype, authorData }) => {
  console.log(authorData);
  if (subtype === 'Blog' && authorData.length > 0) {
    return (
      <div className="c-blogAuthor c-section b-margin-bottom-d60-m40">
        <p className="componentTitle">About the Author{authorData.length > 1 ? 's' : ''}</p>
        <div className="blogAuthor-content">
          {authorData.map((val, index) => (
            <React.Fragment key={`blog-author-${index}`}>
              <div className="row">
                {authorData[index].image.url && (
                  <div className="imageContainer">
                    <img src={authorData[index].image.url} alt={`${authorData[index].name}'s Profile Picture`} />
                  </div>
                )}
                <p className="authorName">{authorData[index].name}</p>
              </div>
              {authorData.length < 2 && authorData[index].description && (
                <p className="authorDescription">{authorData[index].description}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

BlogAuthor.propTypes = {
  subtype: PropTypes.string,
  authorData: PropTypes.array,
};

export default BlogAuthor;
