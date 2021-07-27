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

const ListEnhanced = ({ customFields }) => {
  const { arcSite } = useFusionContext();
  const appContext = useAppContext();
  const { metaValue, globalContent, globalContentConfig } = appContext;
  const noAds = metaValue('noAds');
  const { content, title, textBox } = customFields;
  const { contentConfigValues, contentService } = content;

  const storiesPerLoad = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoad);

  const featureContent = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });

  const collectionMetaData = useContent({
    source: 'collection-meta-data',
    query: {
      id: contentConfigValues?.id || globalContentConfig?.query?.id,
      arcSite,
    },
    filter,
  });

  const data = (Array.isArray(featureContent)
      && featureContent?.slice(0, contentConfigValues.size))
    || (Array.isArray(globalContent)
      && globalContent?.slice(0, globalContentConfig?.query?.size));

  if (!data) {
    return null;
  }

  const collectionTitle = collectionMetaData?.headlines?.basic;
  const filteredStories = data?.slice(0, storiesCount);
  const moreStoriesToLoad = !!(data?.length - filteredStories?.length);
  const sections = Math.ceil(filteredStories?.length / storiesPerLoad);

  let filteredTeases = AddFirstInlineImage(filteredStories, 'list', ['list']);
  filteredTeases = updateImageRefs(filteredTeases);

  if (!Array.isArray(filteredTeases)) {
    return null;
  }

  return (
    <>
      <div className="c-list-enhanced b-margin-bottom-d30-m20">
        {getTitle(title, collectionTitle)}
        {getNewsTipText(textBox, 'mobile-tablet')}
        {Array.from(Array(sections).keys()).map((i, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <section className="section">
              <div className="content">
                <div className="list-items">
                {sectionIndex === 0 && getNewsTipText(textBox, 'desktop')}
                  <span className="tablet-line"></span>
                  {filteredStories.map((el, storyIndex) => {
                    if (
                      sectionIndex * storiesPerLoad <= storyIndex
                      && storyIndex < (sectionIndex + 1) * storiesPerLoad
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
                {!noAds && (
                  <>
                    <ArcAd
                      staticSlot={'MP05'}
                      key={`MP05-${sectionIndex + 1}`}
                      customId={`div-id-MP05_${sectionIndex + 1}`}
                    />
                    <ArcAd
                      staticSlot={'HP05'}
                      key={`HP05-${sectionIndex + 1}`}
                      customId={`div-id-HP05_${sectionIndex + 1}`}
                    />
                  </>
                )}

                {sectionIndex + 1 === sections && moreStoriesToLoad && (
                  <LoadMoreButton
                    numberOfNewStories={filteredStories.length}
                    handleOnClick={() => setStoryCount(storiesCount + storiesPerLoad)
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
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
      description: 'Title of List',
    }),
    textBox: PropTypes.richtext.tag({
      name: 'Text Box',
      description: 'Text beneath title',
    }),
  }),
};

ListEnhanced.label = 'List Page - List Enhanced';

export default ListEnhanced;
