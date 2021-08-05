import ListItem from '../../../_helper_components/home/ListItem/ListItem';

export default function getLists(apiData, start, limit, limitOverride, isLeftNoPhotoFeature, actualDisplayClass, isTTDFeature) {
  const listLimit = limitOverride || limit;
  let itemCounter = 0; /* item counter for Left Photo No Feature feature */
  return apiData.map((el, i) => {
    if (start <= i && i < start + listLimit) {
      if (isLeftNoPhotoFeature) itemCounter += 1;
      // eslint-disable-next-line react/react-in-jsx-scope
      return <ListItem key={`ListItem-${i}`} displayClass={actualDisplayClass} hidePromo={((isLeftNoPhotoFeature && itemCounter !== 1 && itemCounter !== 5) || false)} isTTDFeature={isTTDFeature} {...el} />;
    }
    return null;
  });
}
