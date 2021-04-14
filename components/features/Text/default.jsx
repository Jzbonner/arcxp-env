import React from 'react';
import PropTypes from 'prop-types';
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';
import './default.scss';

const Text = () => {
  const componentContext = useComponentContext();
  const { TextFeatureTitle, TextFeatureContent } = componentContext && componentContext.customFields;
  const { editableField } = useEditableContent();

  if (TextFeatureContent && TextFeatureContent !== '') {
    const regex = /<\/?(?!a)(?!p)(?!strong)\w*\b[^>]*>/gi;
    let src = TextFeatureContent.replace(regex, '');
    src = src.replace(/<\/p>/g, '</p>\n');
    return (
      <div className="c-textFeature">
        <h2
          className="c-textFeature-title"
          {...editableField('Text Feature Title')}
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: TextFeatureTitle }}
        ></h2>
        <div
          className="c-textFeature-content"
          {...editableField('Text Feature Content')}
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: src }}
        ></div>
      </div>
    );
  }
  return null;
};
Text.propTypes = {
  customFields: PropTypes.shape({
    TextFeatureTitle: PropTypes.string.tag({
      label: 'Add Feature Title',
    }),
    TextFeatureContent: PropTypes.richtext.tag({
      label: 'Add Content',
    }).isRequired,
  }),
};

export default Text;
