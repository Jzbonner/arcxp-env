import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import CustomInfoBox from '../../_helper_components/embed/CustomInfoBox/default';

const ComposerEmbed = (props) => {
  const { customFields, composerHtml } = props;
  const { id, borderColor } = customFields || {};
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  let embedId = id;

  if (!embedId && composerHtml) {
    const composerHtmlFormatted = composerHtml.replace(/[\\"\\']/g, '');
    const htmlArr = composerHtmlFormatted.split('id=');
    if (htmlArr.length < 2) return null;

    embedId = htmlArr[1].replace(/[w+?|/>]/g, '');
    if (!embedId || embedId === '') {
      return null;
    }
  }

  const renderEmbed = (embedData) => {
    const { type, subtype } = embedData;

    if (type !== 'story') return <p>this feature is only compatible with stories (and this is {type} content)</p>;

    switch (subtype.toLowerCase()) {
      case 'infobox':
        return <CustomInfoBox data={embedData} borderColor={borderColor} />;
      default:
        return <p>this is {subtype} content</p>;
    }
  };

  if (Object.keys(globalContent).length && !embedId) {
    return renderEmbed(globalContent);
  }

  const embedData = useContent({
    source: 'content-api',
    query: {
      id: embedId,
      arcSite,
    },
  });

  if (!embedData) return null;

  return renderEmbed(embedData);
};

ComposerEmbed.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.text.tag({
      label: 'Embed ID',
      description: 'Please enter the ID of a composer subtype story.',
    }),
    borderColor: PropTypes.oneOf([
      '',
      'blue',
      'gray',
      'orange',
      'yellow',
    ]).tag({
      name: 'Border color',
      description: 'Select the border color (gray is the default)',
      value: 'gray',
    }),
  }),
  composerHtml: PropTypes.object,
};
export default ComposerEmbed;
