import pick from 'lodash/pick';
import filter from '../../filters/collectionFilter';

export default data => data.map((el) => {
  const filteredEl = pick(el, filter);
  if (filteredEl && filteredEl.promo_items
    && filteredEl.promo_items.basic && filteredEl.promo_items.basic.content_elements) {
    filteredEl.promo_items.basic.content_elements = filteredEl.promo_items.basic.content_elements.map(contentEl => pick(contentEl, ['url', 'caption', 'credits', 'subtitle']));
  }
  return filteredEl;
});
