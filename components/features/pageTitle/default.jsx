import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useAppContext, useFusionContext, useComponentContext } from 'fusion:context';
import './default.scss';

const PageTitle = () => {
  const componentContext = useComponentContext();
  const { pageTitle } = componentContext && componentContext.customFields;
  const { editableField } = useEditableContent();
  const appContext = useAppContext();
  const fusionContext = useFusionContext();

  const { layout = '' } = fusionContext;
  let noPadding = false;

  if (layout === 'special-section-one' && pageTitle.length > 0) {
    noPadding = true;
  }

  console.log('pageTitle', pageTitle);
  console.log('appContext', appContext);
  console.log('fusionContext', fusionContext);
  return (
    <div className={`c-page-title ${noPadding ? 'no-padding' : ''}`}>
      <h1 className="c-title-content" {...editableField('Page Title')} suppressContentEditableWarning value="Add Page Title">
        {pageTitle}
      </h1>
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
