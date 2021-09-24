import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';
import Image from '../../_helper_components/global/image/default';

const CarterObitChain = ({ customFields = {}, children }) => {
  const { title = '', moreURL = '' } = customFields;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const siteProps = getProperties(arcSite);
  const { carterObit } = siteProps || {};
  const { mobile, tablet, desktop } = carterObit || {};

  const imgArr = [
    {
      arcSite,
      width: 390,
      height: 495,
      resized_obj: {
        src: mobile.src,
      },
    },
    {
      arcSite,
      width: 1620,
      height: 1206,
      resized_obj: {
        src: tablet.src,
      },
    },
    {
      arcSite,
      width: 1660,
      height: 888,
      resized_obj: {
        src: desktop.src,
      },
    },
  ];

  return (
    <div className='c-obitChain'>
      <div className="chain-content">
        <FeatureTitle title={title} moreURL={moreURL} />
        <div className="c-carter-mobile">
          <Image imageType={'isInlineImage'} src={imgArr[0]} width={390} height={495} />
        </div>
        <div className="c-carter-tablet">
          <Image imageType={'isInlineImage'} src={imgArr[1]} width={1620} height={1206} />
        </div>
        <div className="c-carter-desktop">
          <Image imageType={'isInlineImage'} src={imgArr[2]} width={1660} height={888} />
        </div>
        <div className='row'>{children}</div>
      </div>
    </div>
  );
};

CarterObitChain.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
    imageSrc: PropTypes.string.tag({
      name: 'Image Resizer URI',
    }),
  }),
  children: PropTypes.array,
};

export default CarterObitChain;
