import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from './helpers/useInterval';
import './default.scss';

export const Countdown = ({ endDateTime, spacer = false }) => {
  let now = new Date();
  const [secondsRemaining, setSecondsRemaining] = useState(Math.round((endDateTime - now) / 1000));

  useInterval(() => {
    now = new Date();
    setSecondsRemaining(Math.round((endDateTime - now) / 1000));
  }, 1000);

  return (
    <div className="c-countdown">
      <div className="card">
        <div className="time">
          {Math.max(Math.floor(secondsRemaining / (60 * 60 * 24)), 0)}
        </div>
        <div className="label">D</div>
      </div>
      <div className="card">
        <div className="time">
          {Math.max(Math.floor((secondsRemaining % (60 * 60 * 24)) / (60 * 60)), 0)}
        </div>
        <div className="label">H</div>
      </div>
      <div className="card">
        <div className="time">
          {Math.max(Math.floor((secondsRemaining % (60 * 60)) / 60), 0)}
        </div>
        <div className="label">M</div>
      </div>
      <div className="card">
        <div className="time">
          {Math.max(Math.floor(secondsRemaining % 60), 0)}
        </div>
        <div className="label">S</div>
      </div>
      { spacer
        && <span className='spacer'></span>
      }
    </div>
  );
};

Countdown.propTypes = {
  endDateTime: PropTypes.number,
  spacer: PropTypes.bool,
};

export default Countdown;
