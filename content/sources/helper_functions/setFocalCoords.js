export default (additionalProperties, rootFocalPoint) => {
  const { focal_point: focalPoint } = additionalProperties || {};
  const { min: focalMin, max: focalMax } = focalPoint || {};
  /*
    we have to (re)create the root focalCoords array because the format of root-level focal_point arrays differs from those focal_point arrays contained within `additionalProperties`.
    The former have x, y coordinates, whereas the latter is an array of arrays, with `min` & `max` children that have keyless arrays of x & y coords.
    So our (re)created rootFocalCoords will match the format of the min & max arrays, rendering everything equal when it reaches the resizer content source.
  */
  const rootFocalCoords = rootFocalPoint ? [] : null;
  if (rootFocalPoint?.x && rootFocalPoint?.y) {
    rootFocalCoords.push(rootFocalPoint.x);
    rootFocalCoords.push(rootFocalPoint.y);
  }
  const focalCoords = focalMin || focalMax || rootFocalCoords || [];

  return focalCoords;
};
