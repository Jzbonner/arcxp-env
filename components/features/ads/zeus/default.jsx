import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import adMapping from './children/adMapping';

const Zeus = ({
  slotName,
}) => {
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  if (isAdmin) {
    return <div className={`arc_ad ${slotName}`} style={{
      background: '#efefef',
      fontSize: '30px',
      color: '#000',
      border: '1px solid #000',
      padding: '20px',
      width: 'auto',
    }}>{slotName} placeholder</div>;
  }

  const adOutput = <div className={`zeus-ad arcad ad ${slotName}`}><zeus-ad id={`zeus_${adMapping[slotName]?.id}`} /></div>;

  if (slotName === 'HS02' || slotName === 'WCC01') {
    return (
      <>
        <div id={`div-id-${slotName}`} className={`c-${slotName}`}>{adOutput}</div>
      </>
    );
  }

  return adOutput;
};

Zeus.propTypes = {
  slotName: PropTypes.string,
};

export default Zeus;
