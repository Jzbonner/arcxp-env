import React from 'react';
import PropTypes from 'prop-types';

const AmpCustomStyles = ({ arcSite, outputTypeProps }) => {
  const { Resource } = outputTypeProps || {};
  return (
      <Resource path={`resources/dist/${arcSite}-amp/css/style.css`}>
        {({ data }) => (data ? (
            <style
              amp-custom="amp-custom"
              dangerouslySetInnerHTML={{
                __html: `${data}`,
              }}
            />
        ) : null)}
      </Resource>
  );
};

AmpCustomStyles.propTypes = {
  arcSite: PropTypes.string,
  outputTypeProps: PropTypes.object,
};

export default AmpCustomStyles;
