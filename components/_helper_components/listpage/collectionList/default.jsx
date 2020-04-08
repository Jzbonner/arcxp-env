import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import Pagination from '../../listpage/pagination/default';

const CollectionList = ({
  listItems, collectionLength, collectionID, fetchRef,
}) => {
  const [list, setItems] = useState(null);
  const [index, setIndex] = useState(null);
  const paginationCount = Math.ceil(collectionLength / 20);
  const newItems = useContent({
    source: 'collections-api',
    query: {
      id: collectionID,
      from: index,
    },
  });

  useEffect(() => {
    setItems(listItems.map((el, i) => {
      const {
        promo_items: promoItems,
      } = el || {};
      const {
        basic,
      } = promoItems || {};
      const {
        type,
      } = basic || {};
      const leadArtVisible = (type === 'image') ? '' : 'noPhoto';
      return (
    <div className={`listPage-item ${leadArtVisible}`} key={`ListItem-${i}`}><ListItem {...el} /></div>
      );
    }));
  }, []);

  useEffect(() => {
    if (index || index === 0) {
      console.log(list);
      const {
        content_elements: contentElements,
      } = newItems;
      console.log(contentElements);
      setItems(contentElements.map((el, i) => {
        const {
          promo_items: promoItems,
        } = el || {};
        const {
          basic,
        } = promoItems || {};
        const {
          type,
        } = basic || {};
        const leadArtVisible = (type === 'image') ? '' : 'noPhoto';
        return (
      <div className={`listPage-item ${leadArtVisible}`} key={`ListItem-${i}`}><ListItem {...el} /></div>
        );
      }));
      if (fetchRef.current) {
        if (window.innerWidth > 1023) {
          window.scrollTo(0, (fetchRef.current.offsetTop));
        } else {
          window.scrollTo(0, (fetchRef.current.offsetTop - fetchRef.current.getBoundingClientRect().height));
        }
      }
      console.log(list);
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
  fetchRef: PropTypes.object,
};

export default CollectionList;
