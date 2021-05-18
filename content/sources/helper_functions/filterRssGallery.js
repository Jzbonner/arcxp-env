import pick from 'lodash/pick';

export default (data) => {
  data.map((el) => {
    const filteredEl = el;
    if (filteredEl && filteredEl.promo_items
      && filteredEl.promo_items.basic && filteredEl.promo_items.basic.content_elements) {
      filteredEl.promo_items.basic.content_elements = filteredEl.promo_items.basic.content_elements.map(contentEl => pick(contentEl, ['url', 'caption', 'credits', 'subtitle']));
    }
    return filteredEl;
  });
};
