import AREAS_OF_EXPERTISE from '../../../_helper_components/allstaff/AREAS_OF_EXPERTISE';

const findArea = (selectedAreaTag) => {
  if (AREAS_OF_EXPERTISE().ajc.all.tag === selectedAreaTag) {
    return AREAS_OF_EXPERTISE().ajc.all;
  }
  if (AREAS_OF_EXPERTISE().ajc.newsroom.tag === selectedAreaTag) {
    return AREAS_OF_EXPERTISE().ajc.newsroom;
  }
  return AREAS_OF_EXPERTISE().ajc.areas.filter(area => area.tag === selectedAreaTag)[0];
};

export default findArea;
