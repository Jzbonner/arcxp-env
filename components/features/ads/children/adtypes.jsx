export const defaultAdSlot = {
  name: 'div-id-',
  slotName: '',
  display: 'all',
  dimensions: [
    [1, 1],
  ],
  breakpoints: [
    [0, 0], // mobile
  ],
  targeting: {
    // key:value pairs; should be passed-in at ad-request time (e.g. article-basic)
  },
};

export const adSlots = {
  PX01: {
    dimensions: [
      [1, 1],
    ],
  },
  HS01: {
    dimensions: [
      [1, 1],
    ],
  },
  HP01: {
    dimensions: [
      [
        [920, 250],
        [728, 90],
      ], // desktop
      [
        [728, 315],
        [728, 90],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  HP02: {
    dimensions: [
      [
        [920, 250],
        [728, 90],
      ], // desktop
      [
        [728, 315],
        [728, 90],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  HP05: {
    dimensions: [
      [
        [0, 0],
      ], // desktop
      [
        [728, 90],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  RP01: {
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
      [
        [300, 600],
        [300, 250],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  RP02: {
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
      [
        [300, 600],
        [300, 250],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  'RP01-Story-Desktop': {
    slotName: 'RP01',
    dimensions: [
      [300, 600],
      [300, 250],
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
  },
  'RP01-Story-FlatPage': {
    slotName: 'RP01',
    dimensions: [
      [300, 600],
      [300, 250],
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
    isSticky: true,
  },
  'RP01-Story-Tablet': {
    slotName: 'RP01',
    dimensions: [
      [
        [0, 0],
      ], // desktop
      [
        [300, 600],
        [300, 250],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  'RP01-List-Page': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
      [
        [300, 600],
        [300, 250],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    isSticky: true,
  },
  'RP09-Story-Desktop': {
    slotName: 'RP09',
    dimensions: [
      [300, 600],
      [300, 250],
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
    isSticky: true,
  },
  'RP09-Story-Tablet': {
    slotName: 'RP09',
    dimensions: [
      [
        [0, 0],
      ], // desktop
      [
        [300, 600],
        [300, 250],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
  },
  MP01: {
    dimensions: [
      [
        [0, 0],
      ], // tablet+
      [
        [320, 150],
        [320, 50],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
  MP02: {
    dimensions: [
      [
        [0, 0],
      ], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
  MP03: {
    dimensions: [
      [
        [0, 0],
      ], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
  MP04: {
    dimensions: [
      [
        [0, 0],
      ], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
  MP05: {
    dimensions: [
      [
        [0, 0],
      ], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
  PG01: {
    slotName: 'PG01',
    dimensions: [
      [600, 400],
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  PG02: {
    slotName: 'PG02',
    dimensions: [
      [88, 31],
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  MPG01: {
    slotName: 'MPG01',
    dimensions: [
      [300, 250],
    ],
    breakpoints: [
      [1, 0], // mobile
    ],
    display: 'mobile',
  },
};
