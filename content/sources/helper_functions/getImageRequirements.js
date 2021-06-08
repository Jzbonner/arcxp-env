const getImageRequirements = (displayClass, displayClassesRequiringImg) => {
  const requiresImages = displayClassesRequiringImg.some(requiredClass => requiredClass === displayClass);
  let requiresImageEveryX = requiresImages ? 0 : null;
  if (displayClass === '5-Item Feature - No Photo') {
    requiresImageEveryX = 1;
  }
  return requiresImageEveryX;
};

export default getImageRequirements;
