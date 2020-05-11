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
      temp.src = el.promo_items
        && el.promo_items.basic && el.promo_items.basic.type === 'image'
        && el.promo_items.basic.url ? el.promo_items.basic.url : null;

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
            <div className="c-itemText">
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