import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import buildCarouselItem from './_helper_functions/buildCarouselItems';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import './default.scss';

const Carousel = ({ storyId, taxonomy }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { deployment, contextPath, layout } = appContext;
  const { logoShort, cdnSite, cdnOrg } = getProperties(arcSite) || {};
  const logoPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoShort}`)}`;

  let finalReferentId;
  if (referentId) {
    [, finalReferentId] = referentId.split('/');
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;

  if (!formattedPath) return null;

  const relatedStoryData = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 100,
    },
  });

  if (!relatedStoryData) return null;

  const carouselItems = buildCarouselItem(relatedStoryData, storyId, logoPath, arcSite);

  return (
    <div className="c-carousel">
      <amp-carousel width="auto" height="94" layout="fixed-height" type="carousel">{carouselItems}</amp-carousel>
    </div>
  );
};

Carousel.propTypes = {
  storyId: PropTypes.string,
  taxonomy: PropTypes.object,
};

export default Carousel;
