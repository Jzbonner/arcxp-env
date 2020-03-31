import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Pagination = ({ count }) => {
  const pageNumArray = [];
  for (let i = 1; i < count + 1; i += 1) {
    pageNumArray.push(i);
  }

  const pageNumbers = pageNumArray.map(num => <div className='page' key={`page number: ${num}`}>{num}</div>);

  return (
        <div className='c-pagination'>
          <div className='c-pageNums'>{pageNumbers}</div>
          <div className='c-right-button'><a className='right-button'>
          </a></div>
        </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
};

export default Pagination;
