/* filters out all stories not under the heirachy of the current article's primary section */
export default function (contentElements = [], currentPrimarySection = '') {
  const primaryElements = [];

  contentElements.forEach((el) => {
    if (el && el.taxonomy && el.taxonomy.primary_section
      && ((el.taxonomy.primary_section.path && (el.taxonomy.primary_section.path.includes(currentPrimarySection)))
      || (el.taxonomy.primary_section.referent && el.taxonomy.primary_section.referent.id
        && el.taxonomy.primary_section.referent.id.includes(currentPrimarySection)))) return primaryElements.push(el);
    return null;
  });

  return primaryElements;
}
