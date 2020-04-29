import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';
import './default.scss';

const PageTitle = () => {
  const componentContext = useComponentContext();
  const { pageTitle } = componentContext.customFields;
  const { editableField } = useEditableContent();

  return (
    <div className="c-page-title">
      <h2 className="c-title-content" {...editableField('Page Title')} suppressContentEditableWarning value="Add Page Title">
        {pageTitle}
      </h2>
    </div>
  );
};

PageTitle.propTypes = {
  customFields: PropTypes.shape({
    pageTitle: PropTypes.string.tag({
      label: 'Add Page Title',
    }),
  }),
};

export default PageTitle;
