import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default.jsx';
import './styles.scss';

const BlogAuthor = ({ subtype, authorData, ampPage }) => {
  if (subtype === 'Blog' && authorData.length > 0) {
    return (
      <div className="c-blogAuthor b-margin-bottom-30">
        <p className="blogAuthor-title">About the Author{authorData.length > 1 ? 's' : ''}</p>
        <div className="blogAuthor-content">
          {authorData.map((val, index) => (
            <React.Fragment key={`blog-author-${index}`}>
              <div className="b-flexRow blog-author-content-heading">
                {val.image && val.image.url && (
                  <div className="content-profileImage">
                    <Image src={val.image} ampPage={ampPage} imageType="isInlineImage" width={150} height={150} />
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
                  {val.social_links.map((link) => {
                    const { site: network, url } = link;
                    if (network && url) {
                      return <a className={`btn-${network}`} href={url} />;
                    }
                    return false;
                  })}
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

BlogAuthor.defaultProps = {
  componentName: 'BlogAuthor',
};

BlogAuthor.propTypes = {
  subtype: PropTypes.string,
  authorData: PropTypes.array,
  ampPage: PropTypes.bool,
};

export default BlogAuthor;
