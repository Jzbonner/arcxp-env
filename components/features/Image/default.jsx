import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import ImageGlobal from '../../_helper_components/global/image/default';
import getDomain from '../../layouts/_helper_functions/getDomain';
import './default.scss';

const Image = ({ customFields }) => {
  const appContext = useAppContext();
  const fusionContext = useFusionContext();
  const { layout } = appContext;
  const { arcSite } = fusionContext;
  const { cdnSite, cdnOrg } = getProperties(arcSite);
  let src = customFields?.src;
  const {
    width,
    caption,
    credit,
    alt = '',
    link,
    label,
    explainerText,
    additionalText,
  } = customFields;

  if (!src) {
    return null;
  }

  if (/resizer/.test(src)) {
    src = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${src}`;
  }

  const credits = {
    affiliation: [{ name: credit }],
  };

  const getImage = () => {
    const isGif = src?.endsWith('.gif');

    return (
      <>
        {label && <div className="label">{label}</div>}
        {explainerText && <div className="explainerText">{explainerText}</div>}
        <ImageGlobal
          src={{
            resized_obj: { src: isGif && src },
            url: src,
            useSrcSet: !isGif,
            caption,
            credits,
            alt_text: alt,
          }}
          imageType="isInlineImage"
          useSrcSet={!isGif}
          srcSetSizes={[
            [1600, 0],
            [1100, 0],
            [800, 0],
          ]}
        />
        {additionalText && (
          <div className="additionalText">{additionalText}</div>
        )}
      </>
    );
  };

  return (
    <div
      className="c-image-feature b-margin-bottom-d40-m20"
      style={{ '--width': width }}
    >
      {link && <a href={link}>{getImage()}</a>}
      {!link && getImage()}
    </div>
  );
};

Image.propTypes = {
  customFields: PropTypes.shape({
    src: PropTypes.string.tag({
      name: 'Source',
      description:
        'Can be resizer url from photo center that starts with /resizer/ or absolute url.',
    }).isRequired,
    width: PropTypes.oneOf([
      '20%',
      '30%',
      '40%',
      '50%',
      '60%',
      '70%',
      '80%',
      '100%',
    ]).tag({
      name: 'Desktop Width',
      defaultValue: '100%',
      description:
        'Sets width on desktop. On tablet and mobile width will be set to 100%.',
    }).isRequired,
    label: PropTypes.string.tag({
      name: 'Label',
    }),
    explainerText: PropTypes.richtext.tag({
      name: 'Explainer Text',
    }),
    additionalText: PropTypes.richtext.tag({
      name: 'Additional Text',
    }),
    alt: PropTypes.richtext.tag({
      name: 'Alt Text',
    }),
    caption: PropTypes.richtext.tag({
      name: 'Caption',
    }),
    credit: PropTypes.string.tag({
      name: 'Credit',
    }),
    link: PropTypes.string.tag({
      name: 'Image Link',
    }),
  }),
};

export default Image;
