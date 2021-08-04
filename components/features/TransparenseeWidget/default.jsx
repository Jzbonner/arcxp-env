import React from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import './default.scss';
// import renderCustomHtml from '../../_helper_components/article/contentElements/components/html/renderCustomHtml';

const TransparenseeWidget = (props) => {
  const { customFields } = props;
  const { widgetURL } = customFields;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  let formSrcUrl;

  if (arcSite === 'ajc') formSrcUrl = 'https://events.ajc.com/events';
  if (arcSite === 'dayton') formSrcUrl = 'https://thingstodo.dayton.com/events';
  if (arcSite === 'journal-news') formSrcUrl = 'https://thingstodo.journal-news.com/events';
  if (arcSite === 'springfield-news-sun') formSrcUrl = 'https://thingstodo.springfieldnewssun.com/events';

  const callback = useContent({
    source: 'widget',
    query: {
      url: `${widgetURL}`,
    },
  });

  if (callback) {
    const { payload } = callback || {};
    return (
      <div className="c-transparenseeWidget b-margin-bottom-d30-m20" style={{ width: '100%' }}>
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        <InnerHTML html={payload} id="ttd-search-widget" className="hidden--small" />
      </div>
    );
  }
  return null;
};

TransparenseeWidget.propTypes = {
  customFields: PropTypes.shape({
    widgetURL: PropTypes.string.tag({
      label: 'Widget URL',
      description: 'Please enter a valid Widget URL.',
    }),
  }),
};

export default TransparenseeWidget;
