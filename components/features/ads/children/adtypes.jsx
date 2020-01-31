export const defaultAdSlot = {
  name: 'div-id-',
  slotName: '',
  display: 'all',
  dimensions: [
    [
      [1, 1],
    ], // mobile
    [
      [1, 1],
    ], // tablet
    [
      [1, 1],
    ], // desktop
  ],
  breakpoints: [
    [1, 0], // mobile
    [768, 0], // tablet
    [972, 0], // desktop
  ],
  targeting: {
    // todo: add default targeting info (from content)
  },
};

export const adSlots = {
  PX01: {},
  HS01: {},
  HP01: {
    dimensions: [
      [], // mobile
      [
        [728, 315],
        [728, 90],
      ], // tablet
      [
        [970, 250],
        [728, 90],
      ], // desktop
    ],
  },
  RP01: {
    dimensions: [
      [], // mobile
      [
        [300, 600],
        [300, 250],
      ], // tablet
      [
        [300, 600],
        [300, 250],
      ], // desktop
    ],
  },
  RP09: {
    dimensions: [
      [], // mobile
      [
        [300, 600],
        [300, 250],
      ], // tablet
      [
        [300, 600],
        [300, 250],
      ], // desktop
    ],
  },
  MP01: {
    dimensions: [
      [
        [320, 150],
        [320, 50],
      ], // mobile
      [], // tablet
      [], // desktop
    ],
  },
  MP02: {
    dimensions: [
      [
        [320, 250],
      ], // mobile
      [], // tablet
      [], // desktop
    ],
  },
  MP03: {
    dimensions: [
      [
        [320, 250],
      ], // mobile
      [], // tablet
      [], // desktop
    ],
  },
};
