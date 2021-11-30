import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import Image from '../../global/image/default.jsx';
import './styles.scss';

const BlogAuthor = ({ subtype, authorData, ampPage }) => {
  if ((subtype === 'Blog' || subtype === 'Article') && authorData && authorData.length > 0) {
    const fusionContext = useFusionContext();
    const { arcSite } = fusionContext;
    const {
      burgerFbLogo, burgerTwitterLogo,
    } = getProperties(arcSite);
    const appContext = useAppContext();
    const { deployment, contextPath } = appContext;
    const { _id: authorId } = authorData[0] || {};
    const staffBioPageLink = authorId ? `/staff/${authorId}/` : false;

    const buildAuthorImage = (author) => {
      if (staffBioPageLink) {
        return (
        <a
          href={staffBioPageLink}
          rel='author'
        >
          <div className="content-profileImage">
            <Image src={author.image} ampPage={ampPage} imageType="isInlineImage" width={100} height={100} />
          </div>
        </a>
        );
      // eslint-disable-next-line no-else-return
      } else {
        return (
          <div className="content-profileImage">
            <Image src={author.image} ampPage={ampPage} imageType="isInlineImage" width={100} height={100} />
          </div>
        );
      }
    };

    const buildAuthorName = (author) => {
      if (staffBioPageLink) {
        return (
        <a
          href={staffBioPageLink}
          rel='author'
        >
          {author.name}
        </a>
        );
      // eslint-disable-next-line no-else-return
      } else {
        return author.name;
      }
    };

    return (
      <div className={`c-blogAuthor b-margin-bottom-30 ${authorData.length > 1 ? 'multiple-authors' : ''}`}>
        <p className="blogAuthor-title">About the Author{authorData.length > 1 ? 's' : ''}</p>
        {authorData.map((author, index) => (
          <div key={`blog-author-${index}`} className="blog-author-content">
            <div className={`b-flexRow blog-author-content-heading ${author.image && author.image.url ? 'has-image' : ''}`}>
              {author.image && author.image.url && buildAuthorImage(author)}
              <div className="content-authorName">
                {buildAuthorName(author)}
                {author.social_links && <div className="content-authorSocial">
                  {author.social_links.map((link) => {
                    const { site: network, url } = link;
                    const isFb = network === 'facebook';
                    const isTwitter = network === 'twitter';
                    if ((isFb || isTwitter) && url) {
                      const logoSrc = isFb ? deployment(`${contextPath}${burgerFbLogo}`) : deployment(`${contextPath}${burgerTwitterLogo}`);
                      return <a href={url.indexOf('http') !== 0 && url.indexOf('//') !== 0 ? `//${url}` : url}>
                        {ampPage ? <amp-img src={logoSrc} alt={`Follow ${author.name} on ${network}`} width={17} height={17}></amp-img> : <img src={logoSrc} alt={`Follow ${author.name} on ${network}`} width={17} height={17} />}
                      </a>;
                    }
                    return false;
                  })}
                </div>}
              </div>
            </div>
            {authorData.length < 2 && author.description && (
              <div className="b-flexRow">
                <p className="content-authorDescription">{author.description}</p>
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
