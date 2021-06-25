import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import Pagination from '../pagination/default';

const CollectionList = ({
  listItems, collectionLength, collectionID, fetchRef, source,
}) => {
  if (!listItems) return null;
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const [list, setItems] = useState(null);
  const [index, setIndex] = useState(null);
  const paginationCount = Math.ceil(collectionLength / 10);

  const displayClass = 'all';
  const displayClassesRequiringImg = ['all'];

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
    setItems(
      listItems.map((el, i) => (
        <ListItem {...el} listPage={true} key={`ListItem-${i}`} />
      )),
    );
  }, []);

  useEffect(() => {
    if (index || index === 0) {
      const { content_elements: contentElements } = newItems;
      const newContent = contentElements.map((el) => {
        const { _id: id } = el || {};
        return (
          <div className={'listPage-item'} key={`ListItem-${id}`}>
            <ListItem {...el} listPage={true} />
          </div>
        );
      });
      setItems(newContent);
      if (fetchRef.current) {
        if (window.innerWidth > 1023) {
          window.scrollTo(0, fetchRef.current.offsetTop - fetchRef.current.getBoundingClientRect().height - 25);
        } else {
          window.scrollTo(0, fetchRef.current.offsetTop - fetchRef.current.getBoundingClientRect().height - 60);
        }
      }
    }
  }, [newItems, index]);

  return (
    <>
      {list}
      {collectionLength > 9 ? (
        <Pagination count={paginationCount} setItems={setItems} collectionID={collectionID} setIndex={setIndex} />
      ) : null}
    </>
  );
};

CollectionList.propTypes = {
  listItems: PropTypes.array,
  collectionLength: PropTypes.number,
  collectionID: PropTypes.string,
  fetchRef: PropTypes.object,
  source: PropTypes.string,
};

export default CollectionList;
