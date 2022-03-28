import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext, useAppContext } from 'fusion:context';
import updateImageRefs from '../../layouts/_helper_functions/listpage/updateImageRefs';
import AddFirstInlineImage from '../../../content/sources/helper_functions/AddFirstInlineImage';
import getNewsTipText from '../../layouts/_helper_functions/listpage/getNewsTipText';
import getTitle from '../../layouts/_helper_functions/listpage/getTitle';
import ListItem from './children/ListItem/default';
import LoadMoreButton from '../../_helper_components/loadMoreBtn/default';
import filter from '../../../content/filters/collectionTitle';
import ArcAd from '../ads/default';
import './default.scss';

const ListEnhanced = ({ customFields = {} }) => {
  const { arcSite } = useFusionContext();
  const appContext = useAppContext();
  const { metaValue, globalContentConfig: { query: globalContentQuery, source: globalContentContentSource } } = appContext;
  const noAds = metaValue('noAds');
  const {
    content = {},
    title,
    textBox,
    titleUrl,
  } = customFields;
  const { contentConfigValues: customFieldsQuery, contentService: customFieldContentSource } = content;
  let source;

  const storiesPerLoadMoreBtnClick = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoadMoreBtnClick);
  const isStaffBio = globalContentContentSource === 'author-search';

  if (isStaffBio) {
    source = 'author-stories-list';
    // Loading 10+ the number of storiesPerLoadMoreBtnClick basically preloads the next set.
    globalContentQuery.size = storiesCount + 10;
  } else if (customFieldContentSource) {
    source = customFieldContentSource;
  } else if (globalContentContentSource) {
    source = globalContentContentSource;
  }

  let contentData = useContent({
    source,
    query: {
      ...customFieldsQuery,
      ...globalContentQuery,
      arcSite,
    },
  });

  const isCollection = customFieldsQuery?.id?.length === 26 || globalContentQuery?.id?.length === 26;
  const collectionMetaData = useContent({
    source: isCollection ? 'collection-meta-data' : null,
    query: {
      id: customFieldsQuery?.id || globalContentQuery?.id,
      arcSite,
    },
    filter,
  });

  const totalStories = contentData?.count;

  if (!Array.isArray(contentData)) {
    if (Array.isArray(contentData?.content_elements)) {
      contentData = contentData.content_elements;
    } else {
      return null;
    }
  }


  const storiesPerSection = Math.min(storiesPerLoadMoreBtnClick, contentData?.length);

  const collectionTitle = collectionMetaData?.headlines?.basic;
  const filteredStories = contentData?.slice(0, storiesCount);
  const moreStoriesToLoad = (!isStaffBio && !!(contentData?.length - filteredStories?.length)) || (isStaffBio && totalStories > filteredStories?.length);
  const sections = Math.ceil(filteredStories?.length / storiesPerSection) || 0;

  let filteredTeases = AddFirstInlineImage(filteredStories, 'list', ['list']);
  filteredTeases = updateImageRefs(filteredTeases);

  if (source === 'most-read') {
    filteredTeases = filteredTeases
      .filter(element => element.sections
        .some(subElement => !subElement.toLowerCase().includes('live')))
      .map((element) => {
        const n = Object.assign({}, element, {
          sections: element.sections.filter(
            subElement => !subElement.toLowerCase().includes('live'),
          ),
        });
        return n;
      });
  }

  if (!Array.isArray(filteredTeases) || !filteredTeases?.length) {
    return null;
  }

  return (
    <>
      <div className="c-list-enhanced b-margin-bottom-d30-m20">
        {getTitle({ title, titleUrl, collectionTitle })}
        {getNewsTipText(textBox, 'mobile-tablet')}
        {Array.from(Array(sections).keys()).map((i, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <section className="section">
              <div className="content">
                {sectionIndex === 0 && getNewsTipText(textBox, 'desktop')}
                <div className="list-items">
                  <span className="tablet-line"></span>
                  <div className="col-1">
                    {filteredTeases.map((el, storyIndex) => {
                      if (
                        sectionIndex * storiesPerSection <= storyIndex
                        && storyIndex < (sectionIndex + 1) * storiesPerSection - (storiesPerSection / 2)
                      ) {
                        return (
                          <ListItem
                            key={`${sectionIndex}-${storyIndex}`}
                            {...el}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="col-2">
                    {filteredTeases.map((el, storyIndex) => {
                      if (
                        sectionIndex * storiesPerSection + (storiesPerSection / 2) <= storyIndex
                        && storyIndex < (sectionIndex + 1) * storiesPerSection
                      ) {
                        return (
                          <ListItem
                            key={`${sectionIndex}-${storyIndex}`}
                            {...el}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {!noAds && (
                  <>
                    <ArcAd
                      staticSlot={'MP05'}
                      key={`MP05-${sectionIndex + 1}`}
                      customId={`div-id-MP05_${sectionIndex + 1}`}
                    />
                    <ArcAd
                      staticSlot={'HP05-listPage'}
                      key={`HP05-${sectionIndex + 1}`}
                      customId={`div-id-HP05_${sectionIndex + 1}`}
                    />
                  </>
                )}

                {sectionIndex + 1 === sections && moreStoriesToLoad && (
                  <LoadMoreButton
                    numberOfTotalStories={filteredStories?.length}
                    handleOnClick={() => setStoryCount(storiesCount + storiesPerLoadMoreBtnClick)
                    }
                  />
                )}
              </div>
              <div className="right-rail">
                {!noAds && sectionIndex === 0 && (
                  <ArcAd staticSlot="RP01-List-Page" key="RP01-List-Page" />
                )}
                {!noAds && sectionIndex !== 0 && (
                  <ArcAd
                    staticSlot={'RP09 sticky listPage'}
                    key={`RP09-List-Page-${sectionIndex}`}
                    customId={`div-id-RP09_${sectionIndex}`}
                  />
                )}
              </div>
            </section>
          </Fragment>
        ))}
      </div>
    </>
  );
};

ListEnhanced.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed', 'most-read']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
      description: 'Title of List',
    }),
    titleUrl: PropTypes.string.tag({
      name: 'Title Url',
      description: 'Optional title URL',
    }),
    textBox: PropTypes.richtext.tag({
      name: 'Text Box',
      description: 'Text beneath title',
    }),
  }),
};

ListEnhanced.label = 'List Enhanced';

export default ListEnhanced;
