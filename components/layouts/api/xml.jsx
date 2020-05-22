/* /components/layouts/api/xml.js */

const Api = ({ children }) => (Array.isArray(children) ? children[0] : null);

Api.sections = [
  'body',
];

export default Api;
