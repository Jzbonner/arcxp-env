import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ArcAd from '../../features/ads/default';
import ListItem from '../home/ListItem/ListItem';
import './default.scss';
import '../../features/List/default';
import filter from '../../../content/filters/collectionTitle';
import AddFirstInlineImage from '../../../content/sources/helper_functions/AddFirstInlineImage';
import LoadMoreButton from '../loadMoreBtn/default';

const RP01 = () => (
  <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />
);
const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;

const ListPage = ({ globalContent, globalContentConfig, title }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { query } = globalContentConfig || {};
  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const storiesPerLoad = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoad);

  if (!globalContent) {
    return null;
  }

  const filteredStories = globalContent.slice(0, storiesCount);

  const updateImageRefs = (apiData) => {
    const newData = apiData;
    apiData.forEach((el, e) => {
      if (el.type === 'story') {
        if (el.promo_items
          && el.promo_items.basic
          && el.promo_items.basic.promo_image
          && el.promo_items.basic.promo_image.url
        ) {
          newData[e].teaseImageObject = el.promo_items.basic.promo_image;
        }
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
        }

        if (
          (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'video')
          || (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'gallery')
        ) {
          if (el.promo_items.basic.promo_items && el.promo_items.basic.promo_items.basic && el.promo_items.basic.promo_items.basic.url) {
            newData[e].teaseImageObject = el.promo_items.basic.promo_items.basic;
          }
        }

        if (el.firstInlineImage) {
          newData[e].teaseImageObject = el.firstInlineImage;
        }
      }
      if (el.type === 'video' || el.type === 'gallery') {
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
        }
      }
    });
    return newData;
  };

  let filteredTeases = AddFirstInlineImage(filteredStories, 'list', ['list']);
  filteredTeases = updateImageRefs(filteredTeases);

  const collectionMetaData = useContent({
    source: 'collection-meta-data',
    query: {
      id: query && query.id,
      arcSite,
    },
    filter,
  });

  const { headlines: { basic: collectionTitle } = {} } = collectionMetaData || {};

  const getTitle = () => {
    if (title) {
      return title;
    }

    if (collectionTitle) {
      return (
        <div className="b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20">
          {collectionTitle}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="c-listPage b-contentMaxWidth b-sectionHome-padding">
      <div className="c-section with-rightRail">
        <div className="c-contentElements list-contentElements">
          {!noAds ? (
            <div className="c-rightRail list-rp01">{RP01()}</div>
          ) : null}
          {getTitle()}
          <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column two-column-mobile">
          <div className="tablet-line"></div>
            {filteredTeases.map((el, i) => <ListItem key={`key-${i}`} {...el} listPage={true} />)}
          </div>
          {!noAds ? <div className="list-mp05">{MP05()}</div> : null}
            {globalContent.length > storiesPerLoad && <LoadMoreButton
              newStories={filteredStories}
              handleOnClick={() => setStoryCount(storiesCount + storiesPerLoad)}
            />}
        </div>
      </div>
    </main>
  );
};

ListPage.propTypes = {
  globalContent: PropTypes.array,
  globalContentConfig: PropTypes.object,
  title: PropTypes.func,
};

export default ListPage;
