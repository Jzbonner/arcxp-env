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

const RP01 = i => <ArcAd staticSlot={'RP01-List-Page'} key={`RP01-List-Page-${i}`} customId={`div-id-RP01_${i}`}/>;
const MP05 = i => <ArcAd staticSlot={'MP05'} key={`MP05-${i / 10}`} customId={`div-id-MP05_${i / 10}`} />;
const HP05 = i => <ArcAd staticSlot={'HP05'} key={`HP05-${i / 10}`} customId={`div-id-HP05_${i / 10}`} />;

const ListPage = ({
  globalContent,
  globalContentConfig,
  title,
  textBox,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { query } = globalContentConfig || {};
  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const RP01Array = [];

  const storiesPerLoad = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoad);

  const RP01Count = storiesCount / storiesPerLoad;

  for (let i = 0; i < RP01Count; i += 1) {
    RP01Array.push(
      (
        <div className="RP01-container">
          { RP01((i + 1)) }
        </div>
      ),
    );
  }

  if (!globalContent) {
    return null;
  }

  const filteredStories = globalContent.slice(0, storiesCount);
  const moreStoriesToLoad = !!(globalContent?.length - filteredStories?.length);

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

  const getNewsTipText = (placement = '') => {
    if (!placement || !textBox) return null;

    return (
      <div className={`c-news-tip-text ${placement}`}>
        {textBox}
      </div>
    );
  };

  return (
    <main className="c-listPage b-contentMaxWidth b-sectionHome-padding">
      {getTitle()}
      {getNewsTipText('mobile-tablet')}
      <div className="c-section with-rightRail">

        <div className="c-contentElements list-contentElements">
          <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column two-column-mobile">
            <div className="tablet-line"></div>
            {getNewsTipText('desktop')}
            {filteredTeases.map((el, i) => {
              // this trick helps us keep multiple of tens for ads and list modulus math.
              const j = i + 1;
              const f = i + 2;
              if (i !== 0 && j % 10 === 0 && !noAds) {
                return (<>
                  <ListItem noBorder={true} key={`key-${i}`} {...el} listPage={true} />
                  <div className="list-mp05">{MP05(j)}</div>
                  <div className="list-hp05"><div className="hp05-line"/>{HP05(j)}</div>
                </>);
              }
              return <ListItem noBorder={f % 10 === 0} key={`key-${i}`} {...el} listPage={true} />;
            })}
          </div>
            {moreStoriesToLoad && <LoadMoreButton
              newStories={filteredStories}
              handleOnClick={() => setStoryCount(storiesCount + storiesPerLoad)}
            />}
        </div>
        {!noAds ? (
          <div className="c-list-right-rail">
            {
              RP01Array.map(el => el)
            }
          </div>
        ) : null}
      </div>
    </main>
  );
};

ListPage.propTypes = {
  globalContent: PropTypes.array,
  globalContentConfig: PropTypes.object,
  title: PropTypes.func,
  textBox: PropTypes.func,
};

export default ListPage;
