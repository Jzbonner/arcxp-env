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
  const paginationCount = Math.ceil(collectionLength / 10);
  const newItems = useContent({
    source: 'collections-api',
    query: {
      id: collectionID,
      from: index,
      size: 10,
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
      const leadArtVisible = type === 'image' || type === 'video' || type === 'gallery' ? '' : 'noPhoto';
      return (
    <div className={`listPage-item ${leadArtVisible}`} key={`ListItem-${i}`}><ListItem {...el} listPage={true} /></div>
      );
    }));
  }, []);

  useEffect(() => {
    if (index || index === 0) {
      const {
        content_elements: contentElements,
      } = newItems;

      const newContent = contentElements.map((el) => {
        const {
          _id: id,
          promo_items: promoItems,
        } = el || {};
        if (!promoItems) return null;

        const {
          basic,
        } = promoItems || {};
        const {
          type,
        } = basic || {};
        const leadArtVisible = type === 'image' || type === 'video' || type === 'gallery' ? '' : 'noPhoto';
        return (
      <div className={`listPage-item ${leadArtVisible}`} key={`ListItem-${id}`}><ListItem {...el} listPage={true} /></div>
        );
      });
      setItems(newContent);
      if (fetchRef.current) {
        if (window.innerWidth > 1023) {
          window.scrollTo(0, (fetchRef.current.offsetTop - fetchRef.current.getBoundingClientRect().height - 25));
        } else {
          window.scrollTo(0, (fetchRef.current.offsetTop - fetchRef.current.getBoundingClientRect().height - 60));
        }
      }
    }
  }, [newItems, index]);

  return (
        <>
        {list}
        {collectionLength > 9 ? <Pagination
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
