export const defaultAdType = {
  name: 'HP01',
  slotName: 'HP01',
  display: 'all',
  dimensions: [[728, 90]],
  targeting: {
    pos: 2,
  },
};

export const adTypes = [
  defaultAdType,
  {
    name: 'RP09',
    slotName: 'RP09',
    display: 'all',
    dimensions: [[300, 250]],
    targeting: {
      pos: 1,
    },
  },
  {
    name: 'PX01',
    slotName: 'PX01',
    display: 'all',
    dimensions: [[350, 90]],
    targeting: {
      pos: 2,
    },
  },
];

/**
 * Given an array of ad types, return a list of all the ad names
 *
 * @param {Array} types an array of adTypes
 * @return {Array} a list of adTypes.name values
 * */
export const adTypeOptions = (types) => {
  const result = [];
  Object.keys(types).forEach(index => result.push(types[index].name));
  return result;
};
