/* /components/output-types/json.js */

const Json = ({ children }) => {
  console.log('carlos typeof', typeof children, Array.isArray(children));
  return (Array.isArray(children) ? children[0] : null);
};


// Specify content type
Json.contentType = 'application/json';

export default Json;
