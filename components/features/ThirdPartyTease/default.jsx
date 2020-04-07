import React from 'react';
import PropTypes from 'prop-types';
import { useComponentContext } from 'fusion:context';
import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';

const TPT = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const { title, content = '' } = componentContext.customFields;

  if (content && content !== '') {
    const regex = /(<?\/body><?\/head><?\/html>)/ig;
    const src = content.replace(regex, '');
    return (
      <div className="b-margin-bottom-d30-m20">
        {title && <div className="b-sectionTitle">{title}</div>}
        <div className="custom-html" dangerouslySetInnerHTML={{
          __html: renderCustomHtml(src),
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
