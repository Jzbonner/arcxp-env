export const defaultAdSlot = {
  name: 'div-id-',
  slotName: '',
  display: 'all',
  dimensions: [
    [
      [1, 1],
    ], // all
  ],
  breakpoints: [
    [0, 0], // all
  ],
  targeting: {
    // key:value pairs; should be global; currently set in components/features/ads/default.jsx
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
      [1, 1],
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  HP05: {
    dimensions: [
      [], // desktop
      [
        [728, 90],
      ], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  RP01: {
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  'RP01-Story-Desktop': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  'RP01-Story-FlatPage': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  'RP01-Story-Tablet': {
    slotName: 'RP01',
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  RP02: {
    dimensions: [
      [
        [300, 100],
      ], // tablet+
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  'RP09-Story-Desktop': {
    slotName: 'RP09',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
    isRightRailAd: true,
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
      [1, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
      [1, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
      [1, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
      [1, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
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
      [1, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
    },
  },
  PG01: {
    slotName: 'PG01',
    dimensions: [
      [
        [600, 400],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  PG02: {
    slotName: 'PG02',
    dimensions: [
      [
        [88, 31],
      ], // desktop
    ],
    breakpoints: [
      [1024, 0], // desktop
    ],
  },
  MPG01: {
    slotName: 'MPG01',
    dimensions: [
      [], // tablet+
      [
        [300, 250],
      ], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
      [1, 0], // mobile
    ],
  },
  SP01: {
    slotName: 'SP01',
    dimensions: [
      [
        [88, 31],
      ],
    ],
    breakpoints: [
      [1, 0],
    ],
  },
};
