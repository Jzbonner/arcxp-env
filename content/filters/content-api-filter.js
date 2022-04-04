import siteMetaFilter from './common/siteMetaFilter';
import topNavBreakingNewsFilter from './common/topNavBreakingNewsFilter';
import headlineFilter from './common/headlineFilter';

const contributorBadgeFilter = [
  'taxonomy.tags',
];

const partnerBadgeFilter = [
  'taxonomy.sections',
];

const sectionLabelFilter = [
  'label.custom_label.text',
  'taxonomy.primary_section.path',
  'taxonomy.primary_section.name',
  'taxonomy.primary_section.referent.id',
];

const bylineFilter = [
  'credits.by',
  'taxonomy.sections',
];

const timestampFilter = [
  'first_publish_date',
  'display_date',
  'taxonomy.tags',
  'taxonomy.sections',
  'label.hide_timestamp.text',
];

const socialShareFilter = [
  'headlines.basic',
  'canonical_url',
];

const webHeadlineFilter = [
  'headlines.web',
];

const subHeadlineFilter = [
  'subheadlines.basic',
];

const redirectUrlFilter = [
  'related_content.redirect',
  'redirect_url',
];

const ampAdFilter = [
  'taxonomy.primary_section.path',
  'taxonomy.tags',
];

const sponsorStoryMessage = [
  'taxonomy.sections',
  'content_restrictions.content_code',
];

const relatedListFilter = [
  'taxonomy.primary_section.path',
  'taxonomy.primary_section.referent.id',
];

const articleLayoutFilter = [
  'credits.by',
  'content_elements',
  'content_restrictions.content_code',
  'label.hide_timestamp.text',
  'promo_items.basic.type',
  'taxonomy.sections',
  'taxonomy.tags',
];

export default [...new Set([
  ...siteMetaFilter,
  ...topNavBreakingNewsFilter,
  ...headlineFilter,
  ...contributorBadgeFilter,
  ...partnerBadgeFilter,
  ...sectionLabelFilter,
  ...bylineFilter,
  ...timestampFilter,
  ...socialShareFilter,
  ...webHeadlineFilter,
  ...subHeadlineFilter,
  ...redirectUrlFilter,
  ...ampAdFilter,
  ...sponsorStoryMessage,
  ...relatedListFilter,
  ...articleLayoutFilter,
])].join(',');
