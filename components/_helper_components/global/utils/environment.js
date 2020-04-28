import {
  ENVIRONMENT,
} from 'fusion:environment';

const fetchEnv = () => {
  const env = ENVIRONMENT || '';
  if (env.includes('localhost') || env.includes('sandbox') || env.includes('staging') || env.includes('dev')) return 'sandbox';
  return 'prod';
};

export default fetchEnv;
