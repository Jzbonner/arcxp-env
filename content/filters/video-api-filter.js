import siteMetaFilter from './common/siteMetaFilter';
import topNavBreakingNewsFilter from './common/topNavBreakingNewsFilter';

const VideoFilter = [
  '_id',
  'credits.affiliation',
  'description.basic',
  'streams',
  'taxonomy.primary_section',
];

const headlineFilter = [
  'headlines.basic',
  ...VideoFilter,
];

// Need to import these common filters in case this content source is used as global content such as on the video-basic layout.
export default [...new Set([
  ...siteMetaFilter,
  ...topNavBreakingNewsFilter,
  ...headlineFilter,
])].join(',');
