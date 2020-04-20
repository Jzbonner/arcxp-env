const buildJsonObject = (adSlot = '', uuid = '', topics = []) => ({
  targeting: {
    ad_slot: [adSlot],
    breakpoint: ['1px'],
    uuid: [uuid],
    obj_type: ['story_amp'],
    useSameDomainRenderingUntilDeprecated: 1,
    topics,
  },
});

export default buildJsonObject;
