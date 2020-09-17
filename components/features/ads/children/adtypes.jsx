export const defaultAdSlot = {
  name: 'div-id-',
  slotName: '',
  dimensions: [
    [1, 1], // all
  ],
  breakpoints: [
    [0, 0], // all
  ],
  targeting: {
    // key:value pairs; should be global; currently set in components/features/ads/default.jsx
  },
  display: 'all',
  bidding: {
    amazon: {
      enabled: false,
    },
    prebid: {
      enabled: false,
    },
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
  HS02: {
    dimensions: [
      [
        [970, 250],
        [728, 90],
      ], // desktop
      [
        [728, 90],
      ], // tablet
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
      [0, 0], // mobile
    ],
  },
  NS01: {
    dimensions: [
      [1, 1],
    ],
  },
  NS02: {
    dimensions: [
      [1, 1],
    ],
  },
  HP00: {
    dimensions: [
      [728, 90], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  HP01: {
    dimensions: [
      [
        [970, 250],
        [970, 90], // dayton size requirement.  TODO: apply for dayton sites ONLY
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
        [970, 250],
        [728, 90],
        [1, 1],
      ], // desktop
      [
        [728, 90],
        [1, 1],
      ], // tablet
      [
        [300, 250],
        [1, 1],
      ],
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
      [0, 0], // mobile
    ],
  },
  HP05: {
    dimensions: [
      [728, 90], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'HP05-FlatPage': {
    slotName: 'HP05',
    dimensions: [
      [], // desktop
      [728, 90], // tablet
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
        [300, 250], // tablet+
      ],
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'RP01 300x250': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 250],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'RP01 300x600': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'RP01 sticky': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
  },
  'RP01-Story-Desktop': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
      [], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    isRightRailAd: true,
  },
  'RP01-Story-FlatPage': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
      [], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    isRightRailAd: true,
    isSticky: true,
  },
  'RP01-Story-Tablet': {
    slotName: 'RP01',
    biddingName: 'RP01-tablet',
    dimensions: [
      [], // desktop
      [
        [300, 600],
        [300, 250], // tablet
      ],
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
      ], // tablet +
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  RP02: {
    dimensions: [
      [300, 100], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'RP03 sticky': {
    slotName: 'RP03',
    dimensions: [
      [
        [300, 250],
        [300, 600],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
  },
  'RP09-Story-Desktop': {
    slotName: 'RP09',
    biddingName: 'RP09-desktop',
    dimensions: [
      [
        [300, 600],
        [300, 250], // desktop
      ],
      [], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [0, 0], // tablet
    ],
    isRightRailAd: true,
    isSticky: true,
  },
  'RP09-Story-Tablet': {
    slotName: 'RP09',
    dimensions: [
      [], // desktop
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
  'RP09 300x250': {
    slotName: 'RP09',
    dimensions: [
      [
        [300, 250],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
  },
  'RP09 sticky': {
    slotName: 'RP09',
    dimensions: [
      [
        [300, 250],
        [300, 600],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
  },
  MP01: {
    dimensions: [
      [], // tablet+
      [
        [320, 150],
        [320, 50],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [0, 0], // mobile
    ],
  },
  MP02: {
    dimensions: [
      [], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [0, 0], // mobile
    ],
  },
  MP03: {
    dimensions: [
      [], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [0, 0], // mobile
    ],
  },
  MP04: {
    dimensions: [
      [], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [0, 0], // mobile
    ],
  },
  MP05: {
    dimensions: [
      [], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [0, 0], // mobile
    ],
  },
  PG01: {
    slotName: 'PG01',
    dimensions: [
      [
        [600, 400],
        [300, 250],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  PG02: {
    slotName: 'PG02',
    dimensions: [
      [88, 31], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  MPG01: {
    slotName: 'MPG01',
    dimensions: [
      [], // desktop
      [300, 250], // mobile+
    ],
    breakpoints: [
      [1024, 0], // desktop
      [0, 0], // mobile
    ],
  },
  SP01: {
    slotName: 'SP01',
    dimensions: [
      [88, 31],
    ],
  },
};
