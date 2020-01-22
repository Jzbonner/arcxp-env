import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BlogAuthor = ({ subtype, authorData }) => {
  if (subtype === 'Blog' && authorData.length > 0) {
    return (
      <div className="c-blogAuthor c-section b-margin-bottom-d60-m40">
        <p className="blogAuthor-title">About the Author{authorData.length > 1 ? 's' : ''}</p>
        <div className="blogAuthor-content">
          {authorData.map((val, index) => (
            <React.Fragment key={`blog-author-${index}`}>
              <div className="b-flexRow">
                {authorData[index].image.url && (
                  <div className="content-profileImage">
                    <img src={authorData[index].image.url} alt={`${authorData[index].name}'s Profile Picture`} />
                  </div>
                )}
                <p className="content-authorName">{authorData[index].name}</p>
              </div>
              {authorData.length < 2 && authorData[index].description && (
                <div className="b-flexRow">
                  <p className="content-authorDescription">{authorData[index].description}</p>
                </div>
              )}
              {authorData.length < 2 && (
                <div className="b-flexRow b-flexCenter">
                  {authorData[index].social_links[2].url && <a className="btn-facebook" href={authorData[index].social_links[2].url} />}
                  {authorData[index].social_links[3].url && <a className="btn-twitter" href={authorData[index].social_links[3].url} />}
                </div>
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
