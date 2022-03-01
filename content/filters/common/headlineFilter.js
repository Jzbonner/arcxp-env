import imageFilter from './imageFilter';
import galleryFilter from './galleryFilter';
import videoFilter from './videoFilter';

export default [
  'headlines.basic',
  'promo_items.basic.type',
  ...imageFilter,
  ...galleryFilter,
  ...videoFilter,
];
