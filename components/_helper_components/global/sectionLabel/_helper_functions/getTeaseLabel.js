export default function getTeaseLabel(taxonomy, label) {
  const { basic = {} } = label || {};

  if (basic && basic.text) return basic.text;

  if (!taxonomy.sections || taxonomy.sections.length === 0) return null;

  let correctLabel = null;

  taxonomy.sections.forEach((el) => {
    if (!correctLabel && el.type === 'section' && el.name) {
      correctLabel = el.name;
    }
  });

  return correctLabel;
}
