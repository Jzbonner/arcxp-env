import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import CustomInfoBox from '../../_helper_components/embed/CustomInfoBox/default';
import LiveUpdates from '../../_helper_components/embed/LiveUpdates/default';

/*
  The purpose of this feature is documented in APD-1442 (and now APD-1528 as well) but here's the cliffs notes version:
  Ultimately, this feature allows the rendering of custom Composer subtypes in both pagebuilder pages AND other composer articles.
  These subtypes can be rendered in one of three ways:
    1. manually: by adding the feature to a page (or template) in pagebuilder and specifying the ID of the subtype/embed in the pagebuilder customFields
      - the embed is fetched by way of the "id" custom field, passed to the content-api content source (see lines 20, 54+).
    2. programmatically, as secondary content: referenced as an embed from the parent Composer story - within an HTML block - by using a specific pattern (<CustomInfoBox id="{id of embed/subtype content}" />)
      - the embed ID is fetched from the value of the HTML block by way of the composerHtml prop (passed-in from components/_helper_components/article/contentElements/components/html/MarkupWrapper.jsx) and subsequently assigned as the value of `embedId`, then fetched from content-api (see lines 39-48, 54+)
    3. programmatically, as primary content: by creating a template with this feature, and assigning that template to the specific embed's subtype (via resolver rule), the embed's content is rendered via globalContent
      - in this case there is no need for a content-api fetch as we already have the subtype's data, so we simply pass that data to the renderEmbed function (see lines 22, and 50-52)
*/
const ComposerEmbed = (props) => {
  const { customFields, composerHtml } = props;
  const { id, borderColor } = customFields || {};
  const appContext = useAppContext();
  const { globalContent } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  let embedId = id;
  const renderEmbed = (embedData) => {
    /* function to actually pass the embed doc's data to the relevant child component */
    const { type, subtype } = embedData;

    if (!type && embedData.length) {
      return <LiveUpdates data={embedData} />;
    }

    if (type !== 'story') return <p>this feature is only compatible with stories (and this is `&lsquo;${type}&rsquo;` content)</p>;

    // this is how we will handle multiple custom Composer subtypes.
    switch (subtype.toLowerCase()) {
      case 'infobox':
        return <CustomInfoBox data={embedData} borderColor={borderColor} />;
      default:
        return <p>this is {subtype} content</p>;
    }
  };

  if (!embedId && composerHtml) {
    // the custom embed's doc ID was passed in from the article template (HTML block) so strip the formatting and (re)set the value of embedId
    const composerHtmlFormatted = composerHtml.replace(/[\\"\\']/g, '');
    const htmlArr = composerHtmlFormatted.split('id=');
    if (htmlArr.length < 2) return null;

    embedId = htmlArr[1].replace(/[w+?|/>]/g, '');
    if (!embedId || embedId === '') {
      return null;
    }
  }

  if (Object.keys(globalContent)?.length && !embedId) {
    // we're rendering the subtype directly, so simply pass the data to renderEmbed
    return renderEmbed(globalContent);
  }

  // we have a valid embedId so proceed with fetching it from content-api
  const embedData = useContent({
    source: 'content-api',
    query: {
      id: embedId,
      arcSite,
    },
  });

  if (!embedData) return null; // it was an invalid ID, just quit

  return renderEmbed(embedData); // we successfully fetched the embed doc, pass it to renderEmbed
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
  composerHtml: PropTypes.string,
};
export default ComposerEmbed;
