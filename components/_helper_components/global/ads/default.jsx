import React from 'react';
import PropTypes from 'prop-types';
import ArcAd from '../../../features/ads/default';
import AmpAd from '../../amp/amp-ads/AmpAd';
import '../../../../src/styles/base/_utility.scss';

const GlobalAdSlots = ({
  ampPage,
  uuid,
  taxonomy,
  pbPage = false,
}) => {
  console.error('dave', pbPage);
  if (ampPage) {
    return <div className="b-hidden">
            <AmpAd
            adSlot='PX01'
            uuid={uuid}
            width={'300'}
            height={'300'}
            taxonomy={taxonomy}
            componentName='ArcAd'
            multiSize={'300x1'}
            multiSizeValidation={'false'}/>
        </div>;
  }

  return <div className="b-hidden">
    <ArcAd staticSlot={'PX01'} />
    <ArcAd staticSlot={'HS01'} />
    {pbPage && <>
        <ArcAd staticSlot={'HS02'} />
        <ArcAd staticSlot={'NS01'} />
        <ArcAd staticSlot={'NS02'} />
    </>}
  </div>;
};

GlobalAdSlots.propTypes = {
  ampPage: PropTypes.bool,
  uuid: PropTypes.string,
  taxonomy: PropTypes.object,
  pbPage: PropTypes.bool,
};

export default GlobalAdSlots;
