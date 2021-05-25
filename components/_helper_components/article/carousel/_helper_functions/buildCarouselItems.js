import React from 'react';
import truncateHeadline from '../../../../layouts/_helper_functions/homepage/truncateHeadline';
import filterByPrimarySection from '../../../../../content/sources/helper_functions/filterByPrimarySection';
import FetchResizedImages from '../../../../../content/sources/helper_functions/FetchResizedImages';
import getDaysSincePublished from './getDaysSincePublished';
import '../default.scss';

const filterCurrentStory = (contentElements, storyId) => contentElements.filter((el) => {
  if (el._id === storyId || getDaysSincePublished(el.first_publish_date) > 30) return null;
  return el;
});

export default function buildCarouselItems(relatedContentElements, storyId, logo, arcSite, primarySection = '') {
  if (!relatedContentElements) return null;

  const filteredContentElements = filterCurrentStory(relatedContentElements, storyId);
  let primaryContentElements = filterByPrimarySection(filteredContentElements, primarySection);
  primaryContentElements = FetchResizedImages(arcSite, primaryContentElements, 144, 144);

  let temp = {};

  const elements = primaryContentElements.map((el, i) => {
    // create up to 12 items
    if (i <= 11) {
      temp = {};
      temp.firstPublishDate = el.first_publish_date ? el.first_publish_date : null;
      temp.url = el.canonical_url || null;
      temp.headline = el?.headlines?.basic || null;

      const hasImage = el.teaseImageObject;
      const { resized_obj: resizedObj = {} } = hasImage || {};
      const carouselImage = resizedObj.src ? resizedObj.src : logo;

      return (
        <a key={`key-${i}`} href={temp.url}>
          <div id={`carousel-item-${i}`} className={`c-carouselItem ${i === 0 ? 'is-first' : ''}`}>
            <amp-img
              width={`${hasImage && resizedObj.src ? '36' : '54'}`}
              height="50"
              src={carouselImage}
            />
            <div className='c-itemText'>
              <div className={`carousel-text ${!hasImage && temp.teaseIcon ? 'with-icon' : ''}`}>
                {truncateHeadline(temp.headline)}
              </div>
            </div>
          </div>
        </a>
      );
    }
    return null;
  });

  return elements;
}
