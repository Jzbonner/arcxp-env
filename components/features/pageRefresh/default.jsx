import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useComponentContext } from 'fusion:context';

const pageRefresh = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  const { refreshActive, refreshInterval = 300 } = componentContext.customFields;

  if (!isAdmin && refreshActive && refreshInterval) {
    return <meta httpEquiv='refresh' content={refreshInterval} />;
  }
  return null;
};

pageRefresh.propTypes = {
  customFields: PropTypes.shape({
    refreshActive: PropTypes.bool.tag({
      name: 'Page Refresh Active?',
      defaultValue: true,
    }).isRequired,
    refreshInterval: PropTypes.number.tag({
      name: 'Page Refresh Interval (in seconds)',
      description: 'Default, when active, is 300 (5 minutes)',
      value: '',
    }),
  }),
};

export default pageRefresh;
