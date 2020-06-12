const checkSponsor = (sections) => {
  if (!sections) {
    return null;
  }
  let sponsorSectionID = null;
  const sponsorSection = sections.filter(section => section && section.path && section.path.includes('/sponsor/'));

  sponsorSection.forEach((el) => {
    const inactive = el.additional_properties
    && el.additional_properties.original
    && el.additional_properties.original.inactive ? el.additional_properties.original.inactive : false;

    if (!sponsorSectionID && !inactive) {
      sponsorSectionID = el.path || null;
    }
  });

  return sponsorSectionID;
};

export default checkSponsor;
