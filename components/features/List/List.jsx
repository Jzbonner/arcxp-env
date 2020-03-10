import React from 'react';
import PropTypes from 'prop-types';

const List = ({ customFields = {} }) => {
  if (customFields.number) {
    const lists = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= customFields.number; i++) {
      lists.push(<div>List Feature</div>);
    }
    return lists;
  }
  return null;
};

List.propTypes = {
  customFields: PropTypes.shape({
    number: PropTypes.number,
  }),
};

export default List;
