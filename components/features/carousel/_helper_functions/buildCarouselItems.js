import React from 'react';
// import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';

export default function buildCarouselItems(relatedContentElements) {
  if (!relatedContentElements.content_elements) return null;

  let temp = {};
  // console.log(relatedContentElements)
  const elements = relatedContentElements.content_elements.map((el, i) => {
    temp = {};
    temp.url = el.canonical_url || null;
    temp.src = el.promo_items
      && el.promo_items.basic && el.promo_items.basic.type === 'image'
      && el.promo_items.basic.url ? el.promo_items.basic.url : null;
    // console.log('image url', temp.src);
    // debugger;
    temp.headline = el.headlines && el.headlines.basic ? el.headlines.basic : null;

    return (
      <a key={`item-${i}`} href={temp.url}>
        <div className="c-carouselItem">
          <amp-img width="78" height="44" src={temp.src}>
          </amp-img>
          <p>{truncateHeadline(temp.headline)}</p>
        </div>
      </a>
    );
  });

  return elements;
}
