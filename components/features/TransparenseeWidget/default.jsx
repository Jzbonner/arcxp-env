import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
import { useContent } from 'fusion:content';
import './default.scss';

const TransparenseeWidget = (props) => {
  const { customFields } = props;
  const { widgetURL } = customFields;
  const callback = useContent({
    source: 'widget',
    query: {
      url: `${widgetURL}`,
    },
  });

  useEffect(() => {
    const toggled = {};

    const toggleCheckedClass = (e) => {
      if (e.target.nodeName === 'INPUT') {
        if (!toggled[e.target.id]) {
          e.target.labels[0].classList.add('is-checked');
          toggled[e.target.id] = 'toggled';
        } else {
          e.target.labels[0].classList.remove('is-checked');
          delete toggled[e.target.id];
        }
      }
    };
    window.addEventListener('click', toggleCheckedClass);
    return () => window.removeEventListener('click', toggleCheckedClass);
  }, []);

  if (callback) {
    const { payload } = callback || {};
    return (
      <div
        className="c-transparenseeWidget b-margin-bottom-d30-m20"
        style={{ width: '100%' }}
      >
        <link
          href="https://fonts.googleapis.com/css?family=Oswald:400,300,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <InnerHTML
          html={payload}
          id="ttd-search-widget"
          className="hidden--small"
        />
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
