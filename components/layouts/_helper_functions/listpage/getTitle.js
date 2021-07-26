import React from 'react';

const getTitle = (title, collectionTitle) => {
  if (title) {
    // title is a feature from the list page layout
    if (typeof title === 'object') {
      return title;
    }
  }
  // title is a custom field from the list page feature
  if (typeof title === 'string') {
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
