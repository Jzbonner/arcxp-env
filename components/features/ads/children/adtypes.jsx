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
        [728, 90],
      ], // desktop
      [
        [728, 315],
        [728, 90],
      ], // tablet
      [], // mobile
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop1', 'tablet1'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657462',
              placementName: 'AJC_ROS_DesktopTablet_HP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop1'],
            params: {
              placement: '5174475',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet1'],
            params: {
              placement: '5174480',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop1', 'tablet1'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529034',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop1', 'tablet1'],
            params: {
              unit: '540941866',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
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
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop1', 'tablet1', 'phone'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657464',
              placementName: 'AJC_ROS_HP02',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop1'],
            params: {
              placement: '5174478',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet1'],
            params: {
              placement: '5174479',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone'],
            params: {
              placement: '5174489',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop1', 'tablet1'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529036',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop1', 'tablet1', 'phone'],
            params: {
              unit: '540941867',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  HP05: {
    dimensions: [
      [728, 90], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop2', 'tablet1'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657465',
              placementName: 'AJC_ROS_DesktopTablet_HP05',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop2'],
            params: {
              placement: '5174472',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet1'],
            params: {
              placement: '5174484',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop2', 'tablet1'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529038',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop2', 'tablet1'],
            params: {
              unit: '540941868',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  RP01: {
    dimensions: [
      [300, 600],
      [300, 250], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657466',
              placementName: 'AJC_ROS_DesktopTablet_RP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174477',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174486',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941869',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP01 sticky': {
    slotName: 'RP01',
    dimensions: [
      [300, 600],
      [300, 250], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657466',
              placementName: 'AJC_ROS_DesktopTablet_RP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174477',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174486',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941869',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    isRightRailAd: true,
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657466',
              placementName: 'AJC_ROS_DesktopTablet_RP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174477',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174486',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941869',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [], // tablet
    ],
    breakpoints: [
      [1024, 0], // desktop
      [768, 0], // tablet
    ],
    isRightRailAd: true,
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657466',
              placementName: 'AJC_ROS_DesktopTablet_RP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174477',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174486',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941869',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP01-Story-Tablet': {
    slotName: 'RP01',
    dimensions: [
      [
        [300, 600],
        [300, 250], // tablet
      ],
      [], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657467',
              placementName: 'AJC_ROS_Tablet_RP01h2',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174483',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['tablet'],
            params: {
              unit: '540941871',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP01-List-Page': {
    slotName: 'RP01',
    dimensions: [
      [300, 600],
      [300, 250], // tablet +
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657466',
              placementName: 'AJC_ROS_DesktopTablet_RP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174477',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174486',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529040',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941869',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
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
      [300, 250],
      [300, 600], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657468',
              placementName: 'AJC_ROS_DesktopTablet_RP03',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174471',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174485',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529044',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941873',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP09-Story-Desktop': {
    slotName: 'RP09',
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
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657470',
              placementName: 'AJC_ROS_Desktop_RP09h2',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174474',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529050',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop'],
            params: {
              unit: '540941875',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP09-Story-Tablet': {
    slotName: 'RP09',
    dimensions: [
      [
        [300, 600],
        [300, 250],
      ], // tablet
      [], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657469',
              placementName: 'AJC_ROS_DesktopTablet_RP09',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174476',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174482',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529048',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941874',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  'RP09 sticky': {
    slotName: 'RP09',
    dimensions: [
      [300, 250],
      [300, 600], // tablet+
    ],
    breakpoints: [
      [768, 0], // tablet+
    ],
    isSticky: true,
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['desktop', 'tablet'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657469',
              placementName: 'AJC_ROS_DesktopTablet_RP09',
            },
          },
          {
            bidder: 'aol',
            labels: ['desktop'],
            params: {
              placement: '5174476',
            },
          },
          {
            bidder: 'aol',
            labels: ['tablet'],
            params: {
              placement: '5174482',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['desktop', 'tablet'],
            params: {
              accountId: '21858',
              siteId: '303388',
              zoneId: '1529048',
            },
          },
          {
            bidder: 'openx',
            labels: ['desktop', 'tablet'],
            params: {
              unit: '540941874',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['phone1'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657472',
              placementName: 'AJC_ROS_Phone_MP01',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone1'],
            params: {
              placement: '5174488',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['phone1'],
            params: {
              accountId: '21858',
              siteId: '303390',
              zoneId: '1529052',
            },
          },
          {
            bidder: 'openx',
            labels: ['phone1'],
            params: {
              unit: '540941877',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['phone'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657473',
              placementName: 'AJC_ROS_Phone_MP02',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone'],
            params: {
              placement: '5174492',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['phone'],
            params: {
              accountId: '21858',
              siteId: '303390',
              zoneId: '1529054',
            },
          },
          {
            bidder: 'openx',
            labels: ['phone'],
            params: {
              unit: '540941879',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['phone'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657474',
              placementName: 'AJC_ROS_Phone_MP03',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone'],
            params: {
              placement: '5174487',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['phone'],
            params: {
              accountId: '21858',
              siteId: '303390',
              zoneId: '1529056',
            },
          },
          {
            bidder: 'openx',
            labels: ['phone'],
            params: {
              unit: '540941880',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['phone'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657475',
              placementName: 'AJC_ROS_Phone_MP04',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone'],
            params: {
              placement: '5174491',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['phone'],
            params: {
              accountId: '21858',
              siteId: '303390',
              zoneId: '1529058',
            },
          },
          {
            bidder: 'openx',
            labels: ['phone'],
            params: {
              unit: '540941881',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
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
      [0, 0], // mobile
    ],
    bidding: {
      amazon: {
        enabled: true,
      },
      prebid: {
        enabled: true,
        bids: [
          {
            bidder: 'appnexus',
            labels: ['phone'],
            params: {
              publisher: 'AJC',
              placementGroup: 'ROS',
              placementId: '17657476',
              placementName: 'AJC_ROS_Phone_MP05',
            },
          },
          {
            bidder: 'aol',
            labels: ['phone'],
            params: {
              placement: '5174490',
            },
          },
          {
            bidder: 'rubicon',
            labels: ['phone'],
            params: {
              accountId: '21858',
              siteId: '303390',
              zoneId: '1529060',
            },
          },
          {
            bidder: 'openx',
            labels: ['phone'],
            params: {
              unit: '540941882',
              delDomain: 'ajc-d.openx.net',
            },
          },
        ],
      },
    },
  },
  PG01: {
    slotName: 'PG01',
    dimensions: [
      [600, 400],
      [300, 250], // desktop
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
      [300, 250], // tablet+
      [300, 250], // mobile
    ],
    breakpoints: [
      [768, 0], // tablet+
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
