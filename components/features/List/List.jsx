import React from 'react';
import PropTypes from 'prop-types';

const List = ({ customFields = {} }) => {
  if (customFields.number) {
    return Array.from(customFields.number).map((item, index) => <div key={index}> List Feature</div>);
  }
  return null;
};

List.propTypes = {
  customFields: PropTypes.shape({
    number: PropTypes.number,
  }),
};

export default List;
