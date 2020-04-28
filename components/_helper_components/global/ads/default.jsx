import React from 'react';
import PropTypes from 'prop-types';
import ArcAd from '../../../features/ads/default';
import AmpAd from '../../amp/amp-ads/AmpAd';
import '../../../../src/styles/base/_utility.scss';

const GlobalAdSlots = ({ ampPage, uuid, taxonomy }) => (
  ampPage ? <div className="b-hidden">
    <AmpAd
    adSlot='PX01'
    uuid={uuid}
    width={'300'}
    height={'300'}
    taxonomy={taxonomy}
    componentName='ArcAd'
    multiSize={'300x1'}
    multiSizeValidation={'false'}/></div>
    : <div className="b-hidden"><ArcAd staticSlot={'PX01'} /><ArcAd staticSlot={'HS01'} />
    </div>
);

GlobalAdSlots.propTypes = {
  ampPage: PropTypes.bool,
  uuid: PropTypes.string,
  taxonomy: PropTypes.object,
};

export default GlobalAdSlots;
