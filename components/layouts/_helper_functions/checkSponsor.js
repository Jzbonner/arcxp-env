const checkSponsor = (sections) => {
  const sponsorSection = sections.filter(section => section && section.path && section.path.includes('/sponsor/'));
  const sponsorSectionID = sponsorSection && sponsorSection[0] && sponsorSection[0].path ? sponsorSection[0].path : null;
  return sponsorSectionID;
};

export default checkSponsor;
