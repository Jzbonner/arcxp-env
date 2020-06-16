import React from 'react';
import PropTypes from 'prop-types';
import '../../global/pagination/default.scss';

const PageNumber = ({ num, activePage, fetchPage }) => {
  const pageActive = num === activePage ? 'active' : '';
  return (
        <div className={`page ${pageActive}`} onClick={ e => fetchPage(e)} key={`page number: ${num}`}>{num}</div>
  );
};

PageNumber.propTypes = {
  num: PropTypes.number,
  activePage: PropTypes.number,
  fetchPage: PropTypes.func,
};
export default PageNumber;
