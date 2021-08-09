import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';

const ComposerEmbed = (props) => {
  const { customFields: { id } } = props;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const embedData = useContent({
    source: 'content-api',
    query: {
      id,
      arcSite,
    },
  });

  return embedData;
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
