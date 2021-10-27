import React from 'react';

const getTitle = ({ title, titleUrl, collectionTitle }) => {
  const getLink = () => {
    if (titleUrl.indexOf('http') === 0 || titleUrl.indexOf('/') === 0) {
      return titleUrl;
    }
    return `//${titleUrl}`;
  };

  if (title && titleUrl) {
    return (
      <div className="c-page-title">
        <div className="c-title-content">
          <a href={getLink()}>{title}</a>;
        </div>
      </div>
    );
  }

  if (title) {
    return (
      <div className="c-page-title">
        <div className="c-title-content">{title}</div>
      </div>
    );
  }


  if (collectionTitle) {
    return (
      <div className="b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20">
        {collectionTitle}
      </div>
    );
  }

  return null;
};

export default getTitle;
