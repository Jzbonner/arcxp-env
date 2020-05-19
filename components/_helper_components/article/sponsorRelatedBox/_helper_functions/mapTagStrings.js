export default function mapTagStrings(tagArray) {
  return tagArray.map((el) => {
    if (el && el.text) return el.text;
    return null;
  });
}
