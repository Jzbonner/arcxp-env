const getImageRequirements = (displayClass, displayClassesRequiringImg) => {
  const requiresImages = displayClassesRequiringImg.some(requiredClass => requiredClass === displayClass);
  let requiresImageEveryX = requiresImages ? 1 : null;
  if (displayClass === 'Redesign Feature - Left Photo No Photo') {
    requiresImageEveryX = 3;
  } else if (displayClass === '5-Item Feature - No Photo') {
    requiresImageEveryX = 2;
  }
  return requiresImageEveryX;
};

export default getImageRequirements;
