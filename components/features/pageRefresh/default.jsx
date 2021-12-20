import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useComponentContext } from 'fusion:context';

const pageRefresh = () => {
  /* retrieve custom fields from fusion's component context */
  const componentContext = useComponentContext();
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  const { refreshActive, refreshInterval } = componentContext.customFields;

  useEffect(() => {
    if (!isAdmin && refreshActive) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'refresh';
      meta.content = refreshInterval || '300';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);

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
