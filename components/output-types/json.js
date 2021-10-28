/* /components/output-types/json.js */
import getMetaValues from './_helper_components/getMetaValues';

const Json = (props) => {
  const data = getMetaValues();
  console.log("data: ", data);

  return props.template;
};
// Specify content type
Json.contentType = 'application/json';

export default Json;
