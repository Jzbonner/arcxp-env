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
              <div className="b-flexRow blog-author-content-heading">
                {val.image && val.image.url && (
                  <div className="content-profileImage">
                    <img src={val.image.url} alt={`${val.name}'s Profile Picture`} />
                  </div>
                )}
                <p className="content-authorName">{val.name}</p>
              </div>
              {authorData.length < 2 && val.description && (
                <div className="b-flexRow">
                  <p className="content-authorDescription">{val.description}</p>
                </div>
              )}
              {authorData.length < 2 && (
                <div className="b-flexRow b-flexCenter">
                  {val.social_links[1] && val.social_links[1].url && <a className="btn-facebook" href={val.social_links[1].url} />}
                  {val.social_links[2] && val.social_links[2].url && <a className="btn-twitter" href={val.social_links[2].url} />}
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
