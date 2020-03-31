import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../home/ListItem/ListItem';
import Pagination from '../../listpage/pagination/default';


const CollectionList = ({ listItems, collectionLength }) => {
  const [list, setItems] = useState(null);
  const paginationCount = Math.ceil(collectionLength / 20);
  console.log(listItems);


  useEffect(() => {
    setItems(listItems.map((el, i) => <ListItem key={`ListItem-${i}`} {...el} />));
  }, []);
  return (
        <>
        {list}
        <Pagination count={paginationCount} />
        </>
  );
};

CollectionList.propTypes = {
  listItems: PropTypes.array,
  collectionLength: PropTypes.number,
};

export default CollectionList;
