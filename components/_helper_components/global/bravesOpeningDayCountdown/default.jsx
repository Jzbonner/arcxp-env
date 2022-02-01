import React, { useState } from 'react';
import Countdown from '../countdown/default';
import ArcAd from '../../../features/ads/default';

import ClosingIcon from '../../../../resources/images/amp-close.png';
import BravesLogo from '../../../../resources/images/braves-countdown/braves-logo.svg';
import CountdownBackGround from '../../../../resources/images/braves-countdown/countdown-bg.svg';

import './default.scss';

export const BravesOpeningDayCountdown = () => {
  const [display, setDisplay] = useState(true);

  return (
        <>
            { display
                && <div className="BraveOpeningDayCountdown">
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
                        <ArcAd staticSlot={'WCC01'} />
                    </div>
                    <img
                        src={ClosingIcon}
                        alt='closing-icon'
                        className='closing-icon'
                        onClick={() => setDisplay(false)}/>
                </div>
            }
        </>
  );
};

export default BravesOpeningDayCountdown;
