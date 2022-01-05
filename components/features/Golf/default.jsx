import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import Schedule from '../Schedule/default';
import Leaderboard from '../Leaderboard/default';

const Golf = ({ customFields = {} }) => {
  const tour = 'pga';
  const {
    widgetName,
    manualTournamentId,
    year,
  } = customFields;

  switch (widgetName) {
    case 'Schedule':
      return <Schedule year={year} tour={tour} />;
    case 'Leaderboard':
      return <Leaderboard year={year} tour={tour} manualTournamentId={manualTournamentId} />;
    default:
      return <h1>{widgetName} is Under Construction</h1>;
  }
};

Golf.propTypes = {
  customFields: PropTypes.shape({
    widgetName: PropTypes.oneOf(['Schedule', 'Leaderboard', 'Tee Times', 'Statistics', 'Earnings']).tag({
      name: 'Widget Name',
      defaultValue: 'Schedule',
    }),
    year: PropTypes.number.tag({
      name: 'Year',
      defaultValue: new Date().getFullYear(),
    }),
    round: PropTypes.string.tag({
      name: 'Round',
    }),
    manualTournamentId: PropTypes.string.tag({
      name: 'Manual Tournament Id',
    }),
  }),
};

export default Golf;
