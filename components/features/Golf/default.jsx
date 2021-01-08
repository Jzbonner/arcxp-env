import React from 'react';
import PropTypes from 'prop-types';

const Golf = () => <h1>Under Construction</h1>;

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
