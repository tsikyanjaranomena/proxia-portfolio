/**
 * Décor de fond (nappes de grille + formes floues), relevé dans Proxiatech.fig
 * (desktop_landing, mobile_landing, desktop_detailed_form, mobile_detailed_form).
 * Fichier généré : positions en px.
 * - desktop : `x` relatif au centre de la page (maquette 1440), `top` relatif au haut de la section
 * - mobile  : `x` depuis le bord gauche (maquette 390), `top` depuis le haut de la section / page
 * - `m` : matrice Figma [m00, m10, m01, m11] ; `t` / `stops` : dégradé de peinture Figma
 */
export interface BackgroundGrid {
  x: number;
  top: number;
  w: number;
  h: number;
  fade: "radial" | "inset";
  /** Contour Figma (tracé SVG dans le repère w × h) quand la nappe n'est pas rectangulaire. */
  clip?: string;
}

export interface BackgroundShape {
  shape: "branch" | "ring";
  x: number;
  top: number;
  w: number;
  h: number;
  m: [number, number, number, number];
  opacity: number;
  blur: number;
  t: [number, number, number, number, number, number];
  stops: Array<[number, string, number]>;
}

export interface BackgroundSet {
  grids: BackgroundGrid[];
  shapes: BackgroundShape[];
}

export type LandingSection = "hero" | "services" | "method" | "about" | "technologies" | "portfolio" | "testimonials" | "contact";

export const DESKTOP_BACKGROUNDS: Partial<Record<LandingSection, BackgroundSet>> = {
  about: {
    grids: [
      {
        x: 27,
        top: 230,
        w: 598,
        h: 620,
        fade: "radial"
      },
      {
        x: -781,
        top: 5,
        w: 351,
        h: 476,
        fade: "radial"
      },
      {
        x: -620,
        top: 347,
        w: 514,
        h: 570,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "ring",
        x: -1421,
        top: 639,
        w: 1133,
        h: 1133,
        m: [
          -0.388,
          0.922,
          0.922,
          0.388
        ],
        opacity: 0.1,
        blur: 40,
        t: [
          1.571,
          -0.078,
          -0.083,
          0.078,
          1.571,
          -0.936
        ],
        stops: [
          [
            0.14,
            "#0065fc",
            0.2
          ],
          [
            0.545,
            "#01c0fe",
            0.1
          ],
          [
            0.851,
            "#00eefd",
            0
          ]
        ]
      }
    ]
  },
  contact: {
    grids: [
      {
        x: -936,
        top: 369,
        w: 1872,
        h: 970,
        fade: "radial"
      },
      {
        x: -936,
        top: -110,
        w: 1272,
        h: 646,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "branch",
        x: 3222,
        top: 191,
        w: 3142,
        h: 3099,
        m: [
          -0.004,
          1,
          -1,
          -0.004
        ],
        opacity: 0.2,
        blur: 40,
        t: [
          -2.301,
          2.289,
          -1.105,
          -2.288,
          -2.239,
          2.463
        ],
        stops: [
          [
            0.469,
            "#00eefd",
            0
          ],
          [
            0.65,
            "#01c0fe",
            0.5
          ],
          [
            0.842,
            "#0065fc",
            1
          ]
        ]
      },
      {
        shape: "branch",
        x: -780,
        top: 1043,
        w: 2030,
        h: 2002,
        m: [
          -0.988,
          -0.155,
          0.155,
          -0.988
        ],
        opacity: 0.03,
        blur: 40,
        t: [
          -2.301,
          2.289,
          -1.105,
          -2.288,
          -2.239,
          2.463
        ],
        stops: [
          [
            0.469,
            "#00eefd",
            0
          ],
          [
            0.65,
            "#01c0fe",
            0.5
          ],
          [
            0.842,
            "#0065fc",
            1
          ]
        ]
      }
    ]
  },
  hero: {
    grids: [
      {
        x: -785,
        top: 166,
        w: 1539,
        h: 585,
        fade: "inset",
        clip: "M145.5 269L20.5 38.5L0 0L0 585L1538.5 585L1538.5 543.5L1538.5 367.5L1538.5 243L1520 215.5L1507.5 168C1497.2 170.7 1450.8 224.6 1376 235C1282.5 248 1287.5 279 1269.5 279C1255.1 279 1231.8 298 1214.5 317C1214.5 343 1136.4 320 1124 326C1108.5 333.5 1082.5 341.5 1062 341.5L971 341.5L929.5 354.5L898.5 354.5L813 354.5L713.5 354.5L623 354.5L547 354.5L448.5 354.5L302 341L145.5 269Z"
      }
    ],
    shapes: []
  },
  testimonials: {
    grids: [
      {
        x: -877,
        top: -302,
        w: 403,
        h: 1103,
        fade: "radial"
      },
      {
        x: 84,
        top: 254,
        w: 694,
        h: 716,
        fade: "radial"
      }
    ],
    shapes: []
  },
  portfolio: {
    grids: [
      {
        x: -759,
        top: 535,
        w: 526,
        h: 542,
        fade: "radial"
      },
      {
        x: -609,
        top: 67,
        w: 504,
        h: 430,
        fade: "radial"
      },
      {
        x: -400,
        top: 705,
        w: 1024,
        h: 1055,
        fade: "radial"
      },
      {
        x: 276,
        top: 43,
        w: 605,
        h: 545,
        fade: "radial"
      },
      {
        x: -1200,
        top: -79,
        w: 590,
        h: 609,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "branch",
        x: 354,
        top: 682,
        w: 676,
        h: 666,
        m: [
          -0.233,
          0.973,
          0.973,
          0.233
        ],
        opacity: 0.1,
        blur: 40,
        t: [
          -0.676,
          0.516,
          0.549,
          -0.522,
          -0.678,
          1.093
        ],
        stops: [
          [
            0.032,
            "#00eefd",
            0.05
          ],
          [
            0.42,
            "#01c0fe",
            0.25
          ],
          [
            0.793,
            "#0065fc",
            0.4
          ]
        ]
      }
    ]
  },
  technologies: {
    grids: [
      {
        x: -1120,
        top: 408,
        w: 713,
        h: 669,
        fade: "radial"
      },
      {
        x: 360,
        top: -38,
        w: 999,
        h: 899,
        fade: "radial"
      },
      {
        x: -466,
        top: 83,
        w: 568,
        h: 535,
        fade: "radial"
      },
      {
        x: -156,
        top: 625,
        w: 568,
        h: 535,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "ring",
        x: 230,
        top: 598,
        w: 1133,
        h: 1133,
        m: [
          0.983,
          -0.182,
          0.182,
          0.983
        ],
        opacity: 0.1,
        blur: 40,
        t: [
          0.499,
          -0.523,
          0.512,
          0.523,
          0.499,
          -0.011
        ],
        stops: [
          [
            0.149,
            "#00eefd",
            0
          ],
          [
            0.577,
            "#01c0fe",
            0.3
          ],
          [
            0.793,
            "#0065fc",
            0.6
          ]
        ]
      }
    ]
  },
  services: {
    grids: [
      {
        x: -926,
        top: 50,
        w: 694,
        h: 624,
        fade: "radial"
      },
      {
        x: -172,
        top: 560,
        w: 454,
        h: 408,
        fade: "radial"
      },
      {
        x: 310,
        top: -72,
        w: 584,
        h: 666,
        fade: "radial"
      },
      {
        x: -896,
        top: 943,
        w: 582,
        h: 687,
        fade: "radial"
      }
    ],
    shapes: []
  },
  method: {
    grids: [
      {
        x: 189,
        top: 17,
        w: 694,
        h: 476,
        fade: "radial"
      },
      {
        x: -389,
        top: 528,
        w: 358,
        h: 245,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "branch",
        x: -68,
        top: 235,
        w: 1943,
        h: 1915,
        m: [
          -0.233,
          0.973,
          0.973,
          0.233
        ],
        opacity: 0.1,
        blur: 40,
        t: [
          -0.787,
          0.641,
          0.633,
          -0.649,
          -0.79,
          1.229
        ],
        stops: [
          [
            0.013,
            "#00eefd",
            0
          ],
          [
            0.244,
            "#00eefd",
            0.05
          ],
          [
            0.497,
            "#01c0fe",
            0.25
          ],
          [
            0.841,
            "#0065fc",
            0.4
          ]
        ]
      }
    ]
  }
};

export const MOBILE_BACKGROUNDS: Partial<Record<LandingSection, BackgroundSet>> = {
  hero: {
    grids: [
      {
        x: 128,
        top: -139,
        w: 503,
        h: 572,
        fade: "radial"
      }
    ],
    shapes: [
      {
        shape: "branch",
        x: 359,
        top: -689,
        w: 894,
        h: 881,
        m: [
          0.988,
          0.155,
          -0.155,
          0.988
        ],
        opacity: 0.03,
        blur: 40,
        t: [
          -2.301,
          2.289,
          -1.105,
          -2.288,
          -2.239,
          2.463
        ],
        stops: [
          [
            0.469,
            "#00eefd",
            0
          ],
          [
            0.65,
            "#01c0fe",
            0.5
          ],
          [
            0.842,
            "#0065fc",
            1
          ]
        ]
      }
    ]
  }
};

export const PROJECT_BACKGROUNDS: { desktop: BackgroundSet; mobile: BackgroundSet } = {
  desktop: {
  grids: [
    {
      x: 221,
      top: -216,
      w: 669,
      h: 761,
      fade: "radial"
    },
    {
      x: -1118,
      top: -7,
      w: 669,
      h: 761,
      fade: "radial"
    },
    {
      x: -239,
      top: 229,
      w: 365,
      h: 415,
      fade: "radial"
    },
    {
      x: -467,
      top: 743,
      w: 585,
      h: 666,
      fade: "radial"
    },
    {
      x: -939,
      top: 387,
      w: 746,
      h: 849,
      fade: "radial"
    },
    {
      x: 356,
      top: 819,
      w: 877,
      h: 1000,
      fade: "radial"
    },
    {
      x: -924,
      top: 738,
      w: 1872,
      h: 415,
      fade: "radial"
    }
  ],
  shapes: [
    {
      shape: "branch",
      x: 193,
      top: 1157,
      w: 911,
      h: 898,
      m: [
        -0.966,
        -0.259,
        0.259,
        -0.966
      ],
      opacity: 0.03,
      blur: 40,
      t: [
        -2.301,
        2.289,
        -1.105,
        -2.288,
        -2.239,
        2.463
      ],
      stops: [
        [
          0.469,
          "#00eefd",
          0
        ],
        [
          0.65,
          "#01c0fe",
          0.5
        ],
        [
          0.842,
          "#0065fc",
          1
        ]
      ]
    },
    {
      shape: "branch",
      x: -559,
      top: 3242,
      w: 2447,
      h: 2414,
      m: [
        -0.988,
        -0.155,
        0.155,
        -0.988
      ],
      opacity: 0.05,
      blur: 40,
      t: [
        -2.301,
        2.289,
        -1.105,
        -2.288,
        -2.239,
        2.463
      ],
      stops: [
        [
          0.228,
          "#00eefd",
          0
        ],
        [
          0.487,
          "#01c0fe",
          0.5
        ],
        [
          0.75,
          "#0065fc",
          1
        ]
      ]
    }
  ]
},
  mobile: {
  grids: [
    {
      x: 19,
      top: -143,
      w: 669,
      h: 761,
      fade: "radial"
    },
    {
      x: -126,
      top: 403,
      w: 343,
      h: 416,
      fade: "radial"
    },
    {
      x: 89,
      top: 1169,
      w: 305,
      h: 304,
      fade: "radial"
    },
    {
      x: -116,
      top: 944,
      w: 231,
      h: 463,
      fade: "radial"
    },
    {
      x: -62,
      top: 1415,
      w: 231,
      h: 274,
      fade: "radial"
    },
    {
      x: 41,
      top: 827,
      w: 245,
      h: 232,
      fade: "radial"
    },
    {
      x: -98,
      top: 1385,
      w: 612,
      h: 131,
      fade: "radial"
    },
    {
      x: 272,
      top: 873,
      w: 343,
      h: 416,
      fade: "radial"
    },
    {
      x: 72,
      top: 1333,
      w: 208,
      h: 166,
      fade: "radial"
    },
    {
      x: -751,
      top: 1423,
      w: 1872,
      h: 431,
      fade: "radial"
    }
  ],
  shapes: [
    {
      shape: "branch",
      x: 414,
      top: -739,
      w: 1625,
      h: 961,
      m: [
        0.996,
        0.091,
        -0.261,
        0.965
      ],
      opacity: 0.03,
      blur: 40,
      t: [
        -2.301,
        2.289,
        -1.105,
        -2.288,
        -2.239,
        2.463
      ],
      stops: [
        [
          0.469,
          "#00eefd",
          0
        ],
        [
          0.65,
          "#01c0fe",
          0.5
        ],
        [
          0.842,
          "#0065fc",
          1
        ]
      ]
    }
  ]
},
};
