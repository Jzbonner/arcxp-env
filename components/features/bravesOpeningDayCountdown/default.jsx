import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Countdown from '../../_helper_components/global/countdown/default';
import ArcAd from '../ads/default';

import ClosingIcon from '../../../resources/images/amp-close.png';
import BravesLogo from '../../../resources/images/braves-countdown/braves-logo.svg';
import CountdownBackGround from '../../../resources/images/braves-countdown/countdown-bg.svg';

import './default.scss';

export const BravesOpeningDayCountdown = ({ tags = [], storyPage = false }) => {
  const [display, setDisplay] = useState(true);
  const [displayAd, setDisplayAd] = useState(false);

  const countDownTime = 1649373600000; // equivalent to `Date('2022-04-07 19:20:00-04:00').getTime()` but that format is invalid for iOS Safari (because of course) so I'm just using the timestamp directly
  const now = new Date();

  if (Math.round((countDownTime - now) / 1000) <= 0) {
    return null;
  }

  if (storyPage && !tags.some(tag => tag.slug === 'atlanta-braves')) {
    return null;
  }

  useEffect(() => {
    const handleWCC01Flighted = () => {
      setDisplayAd(true);
    };

    document.addEventListener('WCC01_Flighted', handleWCC01Flighted);

    return () => {
      document.removeEventListener('WCC01_Flighted', handleWCC01Flighted);
    };
  }, []);

  return (
    <>
      {display && (
        <div className="BraveOpeningDayCountdown">
          <div className="bravesLogo flex-center">
            <img src={BravesLogo} alt="braves logo" />
          </div>
          <div className="countdown flex-center">
            <img src={CountdownBackGround} alt="countdown background" />
            <Countdown endDateTime={countDownTime} spacer={true} />
            <div className="opening-day">
              <span></span>
              <div>Opening Day</div>
            </div>
          </div>
          <div
            className="ad flex-center"
            style={{ display: `${displayAd ? 'flex' : 'none'}` }}
          >
            <ArcAd staticSlot={'WCC01'} />
          </div>
          <img
            src={ClosingIcon}
            alt="closing-icon"
            className="closing-icon"
            onClick={() => setDisplay(false)}
          />
        </div>
      )}
    </>
  );
};

BravesOpeningDayCountdown.propTypes = {
  tags: PropTypes.array,
  storyPage: PropTypes.bool,
};

export default BravesOpeningDayCountdown;
