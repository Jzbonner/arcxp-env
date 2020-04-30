import React from 'react';
import imageResizer from '../../../../layouts/_helper_functions/Thumbor';
import truncateHeadline from '../../../../layouts/_helper_functions/homepage/truncateHeadline';
import getDaysSincePublished from './getDaysSincePublished';
import '../default.scss';

const filterCurrentStory = (contentElements, storyId) => contentElements.filter((element) => {
  if (element._id === storyId) return null;
  return element;
});

export default function buildCarouselItems(relatedContentElements, storyId) {
  if (!relatedContentElements.content_elements) return null;

  const filteredContentElements = filterCurrentStory(relatedContentElements.content_elements, storyId);

  let temp = {};
  // console.log(relatedContentElements)
  const elements = filteredContentElements.map((el, i) => {
    if (getDaysSincePublished(el.first_publish_date) > 30) return null;
    temp = {};
    temp.firstPublishDate = el.first_publish_date ? el.first_publish_date : null;
    temp.url = el.canonical_url || null;
    temp.src = el.promo_items
      && el.promo_items.basic && el.promo_items.basic.type === 'image'
      && el.promo_items.basic.url ? el.promo_items.basic.url : null;

    temp.headline = el.headlines && el.headlines.basic ? el.headlines.basic : null;

    return (
      <a key={`key-${i}`}>
        <div id={`carousel-item-${i}`} className="c-carouselItem">
          <img src={imageResizer(temp.src, 256, 144)} />
          <div className="c-itemText">
            {truncateHeadline(temp.headline)}
          </div>
        </div>
      </a>
    );
  });

  return elements;
}
