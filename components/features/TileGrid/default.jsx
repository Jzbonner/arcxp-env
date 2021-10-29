/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Image from '../../_helper_components/global/image/default';
import './default.scss';

const TileGrid = ({ customFields }) => {
  const { tileGridCollectionId: id } = customFields;
  const { arcSite } = useFusionContext();

  const collectionData = useContent({
    source: 'collections-content-api',
    query: {
      arcSite,
      id,
      from: 0,
      size: 100,
    },
  });

  return (
    <>
      <div className="c-tileGrid b-margin-bottom-small">
        {Array.isArray(collectionData)
          && collectionData.map((data, i) => {
            const headline = data?.headlines?.basic;
            const url = data?.teaseImageObject?.resized_obj?.src || data?.promo_items?.basic?.promo_image?.url || data?.promo_items?.basic?.url;
            const link = data?.related_content?.redirect[0]?.redirect_url;
            const altText = data?.promo_items?.basic?.subtitle || data?.promo_items?.basic?.caption;

            return (
              <a href={link} className="tileGrid-item" key={`tileGrid-item-${i}`}>
                <div className="tileGrid-item-logo">
                  <Image
                    altText={altText}
                    layout="fixed"
                    imageType="isInlineImage"
                    height={200}
                    width={350}
                    src={{
                      url,
                    }}
                  />
                </div>
                <div className="tileGrid-item-footer">{headline}</div>
              </a>
            );
          })}
      </div>
    </>
  );
};

TileGrid.propTypes = {
  customFields: PropTypes.shape({
    tileGridCollectionId: PropTypes.string.isRequired.tag({
      name: 'Collection Id',
    }),
  }),
};

TileGrid.label = 'Tile Grid';

export default TileGrid;
