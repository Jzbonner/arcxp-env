const buildJsonObject = (adSlot = '', uuid = '', topics = []) => {
  const obj = {};

  obj.targeting = {};
  obj.targeting.ad_slot = [adSlot];
  obj.targeting.breakpoint = ['1px'];
  obj.targeting.uuid = [uuid];
  obj.targeting.obj_type = ['story_amp'];
  obj.targeting.useSameDomainRenderingUntilDeprecated = 1;
  obj.targeting.topics = topics;

  return JSON.stringify(obj);
};

export default buildJsonObject;
