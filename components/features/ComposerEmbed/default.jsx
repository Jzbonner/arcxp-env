import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import CustomInfoBox from '../../_helper_components/embed/CustomInfoBox/default';

const ComposerEmbed = (props) => {
  const { customFields: { id } } = props;
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const renderEmbed = (embedData) => {
    const { type, subtype } = embedData;

    if (type !== 'story') return <p>this feature is only compatible with stories (and this is {type} content)</p>;

    switch (subtype.toLowerCase()) {
      case 'infobox':
        return <CustomInfoBox data={embedData} />;
      default:
        return <p>this is {subtype} content</p>;
    }
  };

  if (Object.keys(globalContent).length) {
    return renderEmbed(globalContent);
  }

  const embedData = useContent({
    source: 'content-api',
    query: {
      id,
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
  }),
};
export default ComposerEmbed;
