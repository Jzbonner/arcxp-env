import React from 'react';
import Countdown from '../countdown/default';
import './default.scss';
import BravesLogo from '../../../../resources/images/braves-countdown/braves-logo.svg';
import CountdownBackGround from '../../../../resources/images/braves-countdown/countdown-bg.svg';

export const BravesOpeningDayCountdown = () => {
    (<div className="BraveOpeningDayCountdown">
        <div className="bravesLogo flex-center">
            <img src={BravesLogo} alt="braves logo" />
        </div>
        <div className="countdown flex-center">
            <img src={CountdownBackGround} alt="countdown background" />
            <Countdown endDateTime={1648753365446} spacer={true} />
            <div className='opening-day'>
                <span></span>
                <div className='text'>Opening Day</div>
            </div>
        </div>
        <div className="ad flex-center">
            kroger!
        </div>
    </div>);
};

export default BravesOpeningDayCountdown;
