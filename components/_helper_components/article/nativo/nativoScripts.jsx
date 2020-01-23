import React from 'react';

const NativoScripts = () => (
  <>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: "let _prx = window._prx || []; _prx.push(['cfg.SetNoAutoStart']);",
      }}
    ></script>
    <script type="text/javascript" src="//s.ntv.io/serve/load.js" async></script>
  </>
);

export default NativoScripts;
