import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';
import './default.scss';

const PageTitle = () => {
  const componentContext = useComponentContext();
  const { pageTitle, pageTitleURL } = componentContext && componentContext.customFields;
  const { editableField } = useEditableContent();

  const getLink = () => {
    if (pageTitleURL.indexOf('http') === 0 || pageTitleURL.indexOf('/') === 0) {
      // it's a properly-qualified absolute or relative url
      return pageTitleURL;
    }
    // it's likely supposed to be an absolute url so let's make it so
    return `//${pageTitleURL}`;
  };

  const buildTitle = () => {
    if (pageTitleURL) {
      return <a href={getLink()}>{pageTitle}</a>;
    }

    return pageTitle;
  };

  if (pageTitle) {
    return (
      <div className="c-page-title">
        <h1 className="c-title-content" {...editableField('Page Title')} suppressContentEditableWarning value="Add Page Title">
          {buildTitle()}
        </h1>
      </div>
    );
  }
  return null;
};

PageTitle.propTypes = {
  customFields: PropTypes.shape({
    pageTitle: PropTypes.string.tag({
      label: 'Add Page Title',
    }),
    pageTitleURL: PropTypes.string.tag({
      label: 'Optional Page Title Link',
    }),
  }),
};

export default PageTitle;
