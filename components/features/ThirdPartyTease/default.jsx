import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useComponentContext } from 'fusion:context';
import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const TPT = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const { title = '', moreURL = '', content = '' } = componentContext.customFields;

  const getParameter = (name) => {
    const url = window.location.href;
    const newName = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${newName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  useEffect(() => {
    if (window.location.href.indexOf('/search/?q=') !== -1) {
      document.getElementById('search-input').value = getParameter('q') || '';
    }
  });

  if (content && content !== '') {
    const regex = /(<?\/body><?\/head><?\/html>)/ig;
    const src = content.replace(regex, '');
    return (
      <div className="b-margin-bottom-d30-m20 tpt-margin-top b-full-width">
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
