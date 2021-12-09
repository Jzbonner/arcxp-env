import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import Schedule from '../Schedule/default';
import Leaderboard from '../Leaderboard/default';

const Golf = ({ customFields = {} }) => {
  const currentYear = new Date().getFullYear();
  const tour = 'pga';
  const {
    widgetName,
    year = currentYear,
  } = customFields;

  switch (widgetName) {
    case 'Schedule':
      return <Schedule year={year} tour={tour} />;
    case 'Leaderboard':
      return <Leaderboard year={year} tour={tour} />;
    default:
      return <h1>{widgetName} is Under Construction</h1>;
  }
};

Golf.propTypes = {
  customFields: PropTypes.shape({
    widgetName: PropTypes.oneOf(['Schedule', 'Leaderboard', 'Tee Times', 'Statistics', 'Earnings']).tag({
      name: 'Widget Name',
    }),
    year: PropTypes.number.tag({
      name: 'Year',
    }),
    round: PropTypes.string.tag({
      name: 'Round',
    }),
  }),
};

export default Golf;
