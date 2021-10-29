/* /components/output-types/json.js */

const Json = ({ children }) => (Array.isArray(children) ? children[0] : null);

// Specify content type
Json.contentType = 'application/json';

export default Json;
