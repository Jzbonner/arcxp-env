import siteMetaFilter from './common/siteMetaFilter';
import topNavBreakingNewsFilter from './common/topNavBreakingNewsFilter';
import headlineFilter from './common/headlineFilter';

// Need to import these common filters in case this content source is used as global content such as on the video-basic layout.
export default [...new Set([
  ...siteMetaFilter,
  ...topNavBreakingNewsFilter,
  ...headlineFilter,
])].join(',');
