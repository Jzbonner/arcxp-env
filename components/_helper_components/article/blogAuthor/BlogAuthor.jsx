import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default.jsx';
import facebookLogo from '../../../../resources/images/facebook-burger.svg';
import twitterLogo from '../../../../resources/images/twitter-burger.svg';
import './styles.scss';

const BlogAuthor = ({ subtype, authorData, ampPage }) => {
  if (subtype === 'Blog' && authorData.length > 0) {
    return (
      <div className={`c-blogAuthor b-margin-bottom-30 ${authorData.length > 1 ? 'multiple-authors' : ''}`}>
        <p className="blogAuthor-title">About the Author{authorData.length > 1 ? 's' : ''}</p>
        {authorData.map((val, index) => (
          <div key={`blog-author-${index}`} className="blog-author-content">
            <div className={`b-flexRow blog-author-content-heading ${val.image && val.image.url ? 'has-image' : ''}`}>
              {val.image && val.image.url && (
                <div className="content-profileImage">
                  <Image src={val.image} ampPage={ampPage} imageType="isInlineImage" width={100} height={100} />
                </div>
              )}
              <div className="content-authorName">
                {val.name}
                <div className="content-authorSocial">
                  {val.social_links.map((link) => {
                    const { site: network, url } = link;
                    const isFb = network === 'facebook';
                    const isTwitter = network === 'twitter';
                    if ((isFb || isTwitter) && url) {
                      return <a href={url.indexOf('http') !== 0 && url.indexOf('//') !== 0 ? `//${url}` : url}><img src={isFb ? facebookLogo : twitterLogo} alt={`Follow ${val.name} on ${network}`} width={17} height={17} /></a>;
                    }
                    return false;
                  })}
                </div>
              </div>
            </div>
            {authorData.length < 2 && val.description && (
              <div className="b-flexRow">
                <p className="content-authorDescription">{val.description}</p>
              </div>
            )}
          </div>
        ))}
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
