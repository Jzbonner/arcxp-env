import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import Pagination from '../../listpage/pagination/default';

const CollectionList = ({ listItems, collectionLength, collectionID }) => {
  const [list, setItems] = useState(null);
  // const [fetch, fetchContent] = useState(false);
  const [index, setIndex] = useState(null);
  // console.log(index);
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
  // console.log(newItems);

  useEffect(() => {
    setItems(listItems.map((el, i) => {
      const {
        promo_items: promoItems,
      } = el;
      // console.log(el);
      const {
        basic,
        // lead_art: leadArt,
      } = promoItems;
      // console.log(promoItems);
      const leadArtVisible = (basic.type === 'image') ? '' : 'noPhoto';
      return (
    <div className={`listPage-item ${leadArtVisible}`} key={`ListItem-${i}`}><ListItem {...el} /></div>
      );
    }));
  }, []);

  useEffect(() => {
    if (index || index === 0) {
      const {
        content_elements: contentElements,
      } = newItems;
      setItems(contentElements.map((el, i) => <ListItem key={`ListItem-${i}`} {...el} />));
      window.scrollTo(0, 400);
      // console.log(list);
    }
  }, [newItems, index]);
  return (
        <>
        {list}
        {collectionLength > 19 ? <Pagination
        count={paginationCount} setItems={setItems}
        collectionID={collectionID} setIndex={setIndex} /> : null }
        </>
  );
};

CollectionList.propTypes = {
  listItems: PropTypes.array,
  collectionLength: PropTypes.number,
  collectionID: PropTypes.string,
};

export default CollectionList;
