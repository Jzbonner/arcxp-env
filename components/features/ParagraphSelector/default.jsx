import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import ContentElements from '../../_helper_components/article/contentElements/default.jsx';
import filterContentElements from '../../layouts/_helper_functions/article/filterContentElements';

const ParagraphSelector = (props) => {
  const { customFields } = props;
  const { id, start, length } = customFields || {};
  const appContext = useAppContext();
  const { globalContent, arcSite } = appContext;

  const renderEmbed = (embedData) => {
    /* function to actually pass the embed doc's data to the relevant child component */
    const { type } = embedData;

    if (type !== 'story') return <p>this feature is only compatible with stories (and this is `&lsquo;${type}&rsquo;` content)</p>;

    const { content_elements: contentElements } = embedData;
    if (contentElements.length) {
      const startIndex = start <= 0 ? 0 : start - 1;
      const filteredContentElements = filterContentElements({ contentElements });
      const sectionContent = filteredContentElements.slice(startIndex, startIndex + length);
      return <ContentElements contentElements={sectionContent} ampPage={false} startIndex={startIndex} />;
    }
    return null;
  };

  if (Object.keys(globalContent)?.length && !id) {
    // we're rendering the content directly, so simply pass the data to renderEmbed
    return renderEmbed(globalContent);
  }

  // we have a valid embedId so proceed with fetching it from content-api
  const embedData = useContent({
    source: 'content-api',
    query: {
      id,
      arcSite,
    },
  });

  if (!embedData) return null; // it was an invalid ID, just quit

  return renderEmbed(embedData); // we successfully fetched the embed doc, pass it to renderEmbed
};

ParagraphSelector.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.text.tag({
      label: 'Embed ID',
      description: 'Please enter the ID of a composer story (for use when setting GlobalContent is not an option for some reason).',
    }),
    start: PropTypes.number.tag({
      label: 'Start index',
      description: 'Select which paragraph to start from',
      value: '0',
    }),
    length: PropTypes.number.tag({
      label: 'Number of paragraphs',
      description: 'Select how many paragraphs to embed',
    }),
  }),
  composerHtml: PropTypes.string,
};
export default ParagraphSelector;
