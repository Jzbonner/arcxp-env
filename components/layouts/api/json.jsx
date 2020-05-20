/* /components/layouts/api/json.js */

const Api = ({ children }) => {
  console.log('carlos in json layout');
  return (Array.isArray(children) ? children[0] : null);
};


Api.sections = [
  'body',
];

export default Api;
