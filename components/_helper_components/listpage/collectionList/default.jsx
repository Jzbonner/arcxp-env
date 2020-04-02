import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import Pagination from '../../listpage/pagination/default';

const CollectionList = ({ listItems, collectionLength, collectionID }) => {
  const [list, setItems] = useState(null);
  // const [fetch, fetchContent] = useState(false);
  const [index, setIndex] = useState(0);
  const paginationCount = Math.ceil(collectionLength / 20);

  const newItems = useContent({
    source: 'content-api',
    query: {
      type: 'collections',
      id: collectionID,
      from: index,
      size: 20,
    },
  });

  useEffect(() => {
    setItems(listItems.map((el, i) => <ListItem key={`ListItem-${i}`} {...el} />));
  }, []);

  useEffect(() => {
    if (newItems) {
      const {
        content_elements: contentElements,
      } = newItems;
      setItems(contentElements.map((el, i) => <ListItem key={`ListItem-${i}`} {...el} />));
    }
  }, [newItems, index]);

  return (
        <>
        {list}
        <Pagination count={paginationCount} setItems={setItems} collectionID={collectionID} setIndex={setIndex} />
        </>
  );
};

CollectionList.propTypes = {
  listItems: PropTypes.array,
  collectionLength: PropTypes.number,
  collectionID: PropTypes.string,
};

export default CollectionList;
