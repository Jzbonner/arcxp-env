import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useComponentContext } from 'fusion:context';
import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';

const TPT = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const { title = '', moreURL = '', content = '' } = componentContext.customFields;

  useEffect(() => {
    const queryLocation = window.location.href.indexOf('/search/?q=');
    const query = queryLocation !== -1 ? window.location.href.slice(queryLocation + 11) : '';
    document.getElementById('search-input').value = query;
  });

  if (content && content !== '') {
    const regex = /(<?\/body><?\/head><?\/html>)/ig;
    const src = content.replace(regex, '');
    return (
      <div className="b-margin-bottom-d30-m20 b-full-width">
        <FeatureTitle title={title} moreURL={moreURL} />
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
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
    content: PropTypes.richtext.tag({
      name: 'Content',
      description: 'Please enter valid HTML.',
      value: '',
    }).isRequired,
  }),
};

export default TPT;
