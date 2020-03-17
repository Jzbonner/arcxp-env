import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import Image from '../../_helper_components/global/image/default';
import SectionLabel from '../../_helper_components/global/sectionLabel/default';
import TimeStamp from '../../_helper_components/article/timestamp/default';
import './list.scss';

const List = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 100,
      columns = 1,
    },
  } = customFields;

  function getDisplayClassMap(displayC) {
    switch (displayC) {
      case 'Top Photo':
        return 'top-photo-display-class';
      case 'Left Photo':
        return 'left-photo-display-class';
      case 'No Photo':
        return 'no-photo-display-class';
      case 'Link':
        return 'link-display-class';
      default:
        return 'top-photo-display-class';
    }
  }

  function getColumnsMap(columnsC) {
    switch (columnsC) {
      case 1:
        return 'one-column';
      case 2:
        return 'two-columns';
      case 3:
        return 'three-columns';
      case 4:
        return 'four-columns';
      default:
        return 'one-column';
    }
  }

  function truncateHeadline(headline) {
    if (headline.length > 72) {
      let newHeadline = '';
      headline.split(' ').forEach((word) => {
        if (newHeadline.length + word.length + 1 < 72) {
          newHeadline = newHeadline.concat(word, ' ');
        }
      });
      return newHeadline.slice(0, -1).concat('...');
    }
    return headline;
  }

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  if (data && data.data) {
    return (
      <div className={`c-homeListContainer b-margin-bottom-d15-m10 ${getColumnsMap(columns)} ${getDisplayClassMap(displayClass)}`}>
        {data.data.map((el, i) => {
          if (startIndex - 1 <= i && i < itemLimit + startIndex - 1) {
            const {
              promo_items: promoItems,
              label,
              taxonomy,
              first_publish_date: firstPublishDate,
              display_date: displayDate,
              headlines,
              website_url: relativeURL,
            } = el;

            const { hide_timestamp: hideTimestamp } = label || {};
            const { text: isHideTimestampTrue } = hideTimestamp || {};

            return (
              <div key={`homeListItem-${i}`} className="c-homeList">
                {promoItems.basic && (
                  <a href={relativeURL} className="homeList-image">
                    <Image
                      src={promoItems.basic || promoItems.lead_art.promo_items.basic}
                      width={1066}
                      height={600}
                      imageType="isHomepageImage"
                    />
                  </a>
                )}
                <div className="homeList-text">
                  <div className="c-label-wrapper">
                    <SectionLabel label={label} taxonomy={taxonomy} />
                    <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
                  </div>
                  <div className="headline">
                    <a href={relativeURL}>{truncateHeadline(headlines.basic)}</a>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

List.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 100,
    }),
    displayClass: PropTypes.oneOf(['Top Photo', 'Left Photo', 'No Photo', 'Link']).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
    }),
    columns: PropTypes.oneOf([1, 2, 3, 4]).tag({
      name: 'Columns',
      defaultValue: 1,
    }),
  }),
};

export default List;
