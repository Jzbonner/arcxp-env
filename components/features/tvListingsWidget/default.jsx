import React from 'react';

const TVwidget = () => {
  const jquerySrc = '<script src="https://host.coxmediagroup.com/ajc/digital/elements/js/jquery-2.2.4.js"></script>';

  return (
    <div className="c-tvListings-widget b-margin-bottom-d40-m20" style={{ width: '100%' }}>
      <div
        id="zwrap"
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          overflow: 'hidden',
        }}
      >
        <div
          id="zcont"
          style={{
            width: '100%',
            height: '100%',
            margin: 0,
            overflow: 'hidden',
          }}
        >
          <script src={jquerySrc}></script>
          <iframe width="100%" height="600px" scrolling="auto" src="https://tvlistings.gracenote.com/grid-affiliates.html?aid=ajc"></iframe>
        </div>
      </div>
    </div>
  );
};

export default TVwidget;
