import React from 'react';
import PropTypes from 'prop-types';

const AmpCustomStyles = ({ arcSite, outputTypeProps }) => {
  const { Resource } = outputTypeProps || {};
  return (
    <>
      <Resource path={`resources/dist/${arcSite}-amp/css/style.css`}>
        {({ data }) => (data ? (
            <style
              amp-custom="amp-custom"
              dangerouslySetInnerHTML={{
                __html: `body .Mg2-connext[data-display-type].paywall {position: relative; width:100%; max-width:1064px; margin:0 auto} ${data}`,
              }}
            />
        ) : null)}
      </Resource>
      {/* <style
        amp-custom="amp-custom"
        dangerouslySetInnerHTML={{
          __html: `
          body. Mg2-connext[data-display-type]. paywall {position: relative; width:100%; max-width:1064px; margin:0 auto}`,
        }}
      /> */}
    </>
  );
};

AmpCustomStyles.propTypes = {
  arcSite: PropTypes.string,
  outputTypeProps: PropTypes.object,
};

export default AmpCustomStyles;
