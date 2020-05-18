import React from 'react';
import imageResizer from '../../../../layouts/_helper_functions/Thumbor';
import truncateHeadline from '../../../../layouts/_helper_functions/homepage/truncateHeadline';
import getDaysSincePublished from './getDaysSincePublished';
import getFirstInlineImage from './getFirstInlineImage';
import '../default.scss';

const filterCurrentStory = (contentElements, storyId) => contentElements.filter((el) => {
  if (el._id === storyId || getDaysSincePublished(el.first_publish_date) > 30) return null;
  return el;
});

export default function buildCarouselItems(relatedContentElements, storyId, logo) {
  if (!relatedContentElements.content_elements) return null;

  const filteredContentElements = filterCurrentStory(relatedContentElements.content_elements, storyId);
  let temp = {};

  const elements = filteredContentElements.map((el, i) => {
    // create up to 12 items
    if (i <= 11) {
      temp = {};
      temp.firstPublishDate = el.first_publish_date ? el.first_publish_date : null;
      temp.url = el.canonical_url || null;

      if (el.promo_items && el.promo_items.basic) {
        const basicPromo = el.promo_items.basic;
        if (basicPromo.type === 'gallery') {
          temp.src = basicPromo.promo_items && basicPromo.promo_items.basic
          && basicPromo.promo_items.basic.type && basicPromo.promo_items.basic.type === 'image'
          && basicPromo.promo_items.basic.url ? basicPromo.promo_items.basic.url : null;
        } else if (basicPromo.type === 'video') {
          temp.src = basicPromo.promo_image && basicPromo.promo_image.url ? basicPromo.promo_image.url : null;
        } else {
          temp.src = basicPromo.type === 'image'
          && basicPromo.url ? basicPromo.url : null;
        }
      }

      temp.headline = el.headlines && el.headlines.basic ? el.headlines.basic : null;

      if (!temp.src && el.content_elements) temp.src = getFirstInlineImage(el.content_elements);

      return (
        <a key={`key-${i}`} href={`${temp.url ? `${temp.url} + ?outputType=amp` : null}`}>
          <div id={`carousel-item-${i}`} className={`c-carouselItem ${i === 0 ? 'is-first' : ''}`}>
            <amp-img
              width={`${temp.src ? '90' : '76'}`}
              height="50"
              src={temp.src ? imageResizer(temp.src, 256, 144) : logo}
            />
            <div className={`c-itemText ${!temp.src && temp.teaseIcon ? 'with-icon' : ''}`}>
              {truncateHeadline(temp.headline)}
            </div>
          </div>
        </a>
      );
    }
    return null;
  });

  return elements;
}
