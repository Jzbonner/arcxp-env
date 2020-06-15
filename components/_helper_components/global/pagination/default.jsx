import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Pagination = ({
  activePage,
  setActivePage,
  totalStories,
  storiesPerPage,
  maxPagesToDisplay,
}) => {
  const pages = Array.from(
    Array(Math.ceil(totalStories / storiesPerPage)),
    (e, i) => i + 1,
  );

  const [visiblePages, setVisiblePages] = useState(
    pages.slice(0, maxPagesToDisplay),
  );

  const changePage = (newActivePage) => {
    setActivePage(newActivePage);
    window.scrollTo(0, 0);

    if (newActivePage < visiblePages[0]) {
      if (newActivePage - maxPagesToDisplay > 0) {
        setVisiblePages(
          pages.slice(newActivePage - maxPagesToDisplay, newActivePage),
        );
      } else {
        setVisiblePages(pages.slice(0, maxPagesToDisplay));
      }
    }
    if (newActivePage > visiblePages[visiblePages.length - 1]) {
      setVisiblePages(
        pages.slice(newActivePage - 1, newActivePage + maxPagesToDisplay),
      );
    }
  };

  return (
    <div className="c-pagination">
      {activePage > 1 && (
        <btn
          className="left-button"
          onClick={() => changePage(activePage - 1)}
        />
      )}
      <div className="c-pageNums">
        {visiblePages.map(page => (
          <div
            key={`key-${page}`}
            className={`page ${activePage === page ? 'active' : ''}`}
            onClick={() => changePage(page)}
          >
            {page}
          </div>
        ))}
      </div>
      {activePage < pages.length && (
        <btn
          className="right-button"
          onClick={() => changePage(activePage + 1)}
        />
      )}
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  setActivePage: PropTypes.func,
  totalStories: PropTypes.number,
  storiesPerPage: PropTypes.number,
  maxPagesToDisplay: PropTypes.number,
};

export default Pagination;
