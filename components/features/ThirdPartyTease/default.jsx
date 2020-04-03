import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext } from 'fusion:context';

const TPT = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const { title, content } = componentContext.customFields;

  if (content !== '') {
    const regex = /(<?\/body><?\/head><?\/html>)/ig;
    return (
      <div className="b-margin-bottom-d30-m20">
        {title && <div className="b-sectionTitle">{title}</div>}
        <div className="custom-html" dangerouslySetInnerHTML={{
          __html: content.replace(regex, ''),
        }} />
      </div>
    );
  }
  return null;
};

TPT.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    content: PropTypes.richtext.tag({
      name: 'Content',
      description: 'Please enter valid HTML.',
      value: '',
    }).isRequired,
  }),
};

export default TPT;
