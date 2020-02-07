export const defaultAdSlot = {
  name: 'div-id-',
  slotName: '',
  display: 'all',
  dimensions: [
    [
      [1, 1],
    ], // desktop
    [
      [1, 1],
    ], // tablet
    [
      [1, 1],
    ], // mobile
  ],
  breakpoints: [
    [972, 0], // desktop
    [768, 0], // tablet
    [1, 0], // mobile
  ],
  targeting: {
    // key:value pairs; should be passed-in at ad-request time (e.g. article-basic)
  },
};

export const adSlots = {
  PX01: {
    dimensions: [
      [
        [1, 1],
      ], // desktop
      [
        [1, 1],
      ], // tablet
      [
        [1, 1],
      ], // mobile
    ],
  },
  HS01: {
    dimensions: [
      [
        [1, 1],
      ], // desktop
      [
        [1, 1],
      ], // tablet
      [
        [1, 1],
      ], // mobile
    ],
  },
  HP01: {
    dimensions: [
      [
        [970, 250],
        [728, 90],
      ], // desktop
      [
        [728, 315],
        [728, 90],
      ], // tablet
      [
        [0, 0],
      ], // mobile
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
      [
        [0, 0],
      ], // mobile
    ],
  },
  'RP01-Story-Desktop': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ],
    ],
    breakpoints: [
      [972, 0], // desktop
    ],
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
      [972, 0], // desktop
      [768, 0], // tablet
    ],
  },
  RP09: {
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
      [
        [972, 0], // tablet
        [768, 0], // mobile
      ],
    ],
  },
  MP01: {
    dimensions: [
      [320, 150],
      [320, 50],
    ],
    breakpoints: [
      [1, 0], // mobile
    ],
  },
  MP02: {
    dimensions: [
      [
        [0, 0], // tablet
      ],
      [
        [320, 250], // mobile
      ],
    ],
    breakpoints: [
      [768, 0], // tablet
      [1, 0], // mobile
    ],
  },
  MP03: {
    dimensions: [
      [320, 250],
    ],
    breakpoints: [
      [0, 0], // mobile
    ],
  },
};
