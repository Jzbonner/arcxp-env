import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import LoadMoreButton from '../../loadMoreBtn/default';

const CollectionList = ({
  listItems, collectionID, source,
}) => {
  if (!listItems) return null;
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const storiesPerLoad = 10;

  const [list, setItems] = useState(null);
  const [index, setIndex] = useState(null);

  const displayClass = 'all';
  const displayClassesRequiringImg = ['all'];

  const hideLoadMoreButton = !!(listItems && listItems.length <= 10);
  const newItems = useContent({
    source: `${source}`,
    query: {
      id: collectionID,
      from: index,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  useEffect(() => {
    if (index === null) {
      setItems(
        listItems.map((el) => {
          const { _id: id } = el || {};
          return (
            <ListItem {...el} listPage={true} key={`ListItem-${id}`} isStaffBioPage={true}/>
          );
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (index !== null && newItems) {
      const { content_elements: contentElements } = newItems;
      const newContent = contentElements.map((el) => {
        const { _id: id } = el || {};
        return (
          <ListItem {...el} listPage={true} key={`ListItem-${id}`} isStaffBioPage={true}/>
        );
      });

      setItems([...list, ...newContent]);
    }
  }, [newItems]);

  return (
    <>
      {list}
      {!hideLoadMoreButton && <LoadMoreButton
        newStories={list}
        handleOnClick={() => setIndex(index + storiesPerLoad)}
      />}
    </>
  );
};

CollectionList.propTypes = {
  listItems: PropTypes.array,
  collectionID: PropTypes.string,
  source: PropTypes.string,
};

export default CollectionList;
