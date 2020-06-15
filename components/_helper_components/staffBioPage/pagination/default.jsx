import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageNumber from '../pageNumber/default';
import '../../global/pagination/default.scss';

const Pagination = ({ count, setIndex }) => {
  const [activePage, setPage] = useState(1);
  let pageNumArray = [];
  let above5Array = [];
  if (count <= 5) {
    for (let i = 1; i < count + 1; i += 1) {
      pageNumArray.push(i);
    }
  } else if (count > 5) {
    for (let i = 1; i < count + 1; i += 1) {
      pageNumArray.push(i);
    }
    above5Array = pageNumArray;
    pageNumArray = pageNumArray.slice(0, 5);
  }

  if (activePage >= 4 && count > 5 && activePage <= count - 2) {
    pageNumArray = above5Array.slice(activePage - 3, activePage + 2);
  } else if (activePage >= 4 && count > 5 && activePage > count - 2) {
    pageNumArray = above5Array.slice(count - 5, count);
  }

  const fetchPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((e.target.textContent * 10 - 10));
    setPage(parseInt(e.target.textContent, 10));
  };

  const rightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((activePage + 1) * 10 - 10);
    setPage(activePage + 1);
  };

  const leftClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((activePage - 1) * 10 - 10);
    setPage(activePage - 1);
  };


  const pageNumbers = pageNumArray.map(num => <PageNumber
    key={`page number - ${num}`} num={num} activePage={activePage} fetchPage={fetchPage} />);

  return (
        <div className='c-pagination'>
          { activePage !== 1
            ? <div onClick={ e => leftClick(e)} ><a className='left-button'></a></div> : null}
          <div className='c-pageNums'>{pageNumbers}</div>
          { activePage !== count
            ? <div onClick={ e => rightClick(e)} ><a className='right-button'></a></div> : null}
        </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  setIndex: PropTypes.func,
};

export default Pagination;
