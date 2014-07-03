define(function() {

    /*
     * Solar System
     *
     * Units of measurement = kilometers (km)
     *
     * Initial Scales:
     *     Planets = 1:1000
     *     Orbit Amplitudes = 1:100000 (multiplied by orbitScale)
     *     Moons = 1:1000
     *
     */

    var orbitScale = 2.63;

    var SolarSystem = {
        buildEnabled: true, // toggle factories on/off
        orbitScale: orbitScale,
        parent: {
            name: 'Sun',
            radius: 700,
            diameter: 1400,
            texture: null
        },
        planets: [
            {
                id: 1,
                name: 'Mercury',
                radius: 2.44,
                diameter: 4.88,
                distanceFromParent: 57.9 * orbitScale, // 1:100000
                orbitDuration: 88,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 2,
                name: 'Venus',
                radius: 6.05,
                diameter: 12.1,
                distanceFromParent: 108.2 * orbitScale, // 1:100000
                orbitDuration: 224.7,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 3,
                name: 'Earth',
                radius: 6.35,
                diameter: 12.7,
                distanceFromParent: 149.5 * orbitScale, // 1:100000
                orbitDuration: 364.25,
                texture: null,
                moons: [
                    {
                        name: 'Moon',
                        radius: 1.737,
                        orbitDuration: 27,
                        distanceFromParent: 38.44, // 1:10000
                        axisTilt: 2 / 180 * Math.PI // radians
                    }
                ],
                rings: []
            },
            {
                id: 4,
                name: 'Mars',
                radius: 3.4,
                diameter: 6.8,
                distanceFromParent: 227.9 * orbitScale,
                orbitDuration: 687,
                moons: [
                    {
                        name: 'Phobos',
                        radius: 0.267, // (11.2667)
                        orbitDuration: 0.3189 * 3,
                        distanceFromParent: 9.378, // 1:1000
                        axisTilt: 26.04 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Deimos',
                        radius: 0.211, // (6.2)
                        orbitDuration: 1.263 * 3,
                        distanceFromParent: 23.46, // 1:1000
                        axisTilt: 27.58 / 180 * Math.PI // radians
                    }
                ],
                texture: null,
                rings: []
            },
            {
                id: 5,
                name: 'Jupiter',
                radius: 71.5,
                diameter: 143,
                distanceFromParent: 778.3 * orbitScale,
                orbitDuration: 4329,
                moons: [],
                texture: null,
                rings: [],
                moons: [
                    {
                        name: 'Amalthea',
                        radius: 0.835, // 83.5 km
                        orbitDuration: 0.498, // (0.498)
                        distanceFromParent: 18.1366, // 1:10000 (181,366)
                        axisTilt: 0.374 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Thebe',
                        radius: 0.493, // 49.3 km
                        orbitDuration: 0.675,
                        distanceFromParent: 22.1889, // (221,889)
                        axisTilt: 1.076 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Io',
                        radius: 1.8216, // 1:1000
                        orbitDuration: 1.769,
                        distanceFromParent: 42.1700, // 1:10000
                        axisTilt: 2.21 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Europa',
                        radius: 1.8, //  (1,561)
                        orbitDuration: 3.551,
                        distanceFromParent: 67.1034, // 1:10000
                        axisTilt: 0.47 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Ganymede',
                        radius: 2.6341,
                        orbitDuration: 7.155,
                        distanceFromParent: 107.0412, // 1:10000 (1,070,412)
                        axisTilt: 0.2 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Callisto',
                        radius: 2.41,
                        orbitDuration: 16.689,
                        distanceFromParent: 188.2709, // 1:10000 (1,882,709)
                        axisTilt: 0.192 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Himalia',
                        radius: 1.45, // 85 km
                        orbitDuration: 250.23,
                        distanceFromParent: 1145.1971, // 1:10000 (11,451,971)
                        axisTilt: 30.486 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Lysithea',
                        radius: 1.36, // 36 km
                        orbitDuration: 259.89,
                        distanceFromParent: 1174.056, // 1:10000 (11,740,560)
                        axisTilt: 27.006 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Elara',
                        radius: 1.43, // 43 km
                        orbitDuration: 257.62,
                        distanceFromParent: 1177.8034, // 1:10000 (11,778,034)
                        axisTilt: 29.691 / 180 * Math.PI // radians
                    }
                ],
            },
            {
                id: 6,
                name: 'Saturn',
                radius: 60,
                diameter: 120,
                distanceFromParent: 1429.4 * orbitScale,
                orbitDuration: 10753,
                moons: [],
                texture: null,
                rings: [160, 180, 185, 195, 210, 220, 225, 240],
                moons: [
                    {
                        name: 'Titan',
                        radius: 2.576,
                        orbitDuration: 15.945,
                        distanceFromParent: 122.187, // 1:10000 (1,221,870)
                        axisTilt: 0.34854 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Rhea',
                        radius: 0.7638,
                        orbitDuration: 4.518212,
                        distanceFromParent: 52.7108, // 1:10000 (527,108)
                        axisTilt: 0.345 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Iapetus',
                        radius: 0.7345,
                        orbitDuration: 79.322,
                        distanceFromParent: 356.082, // 1:10000 (3,560,820)
                        axisTilt: 17.28 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Dione',
                        radius: 0.5614,
                        orbitDuration: 2.737,
                        distanceFromParent: 356.082, // 1:10000 (3,560,820)
                        axisTilt: 0.019 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Tethys',
                        radius: 0.5311,
                        orbitDuration: 1.889,
                        distanceFromParent: 29.4619, // 1:10000 (294,619)
                        axisTilt: 0.019 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Enceladus',
                        radius: 0.2521,
                        orbitDuration: 1.37,
                        distanceFromParent: 37.7396, // 1:10000 (377,396)
                        axisTilt: 0.019 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Mimas',
                        radius: 0.4156,
                        orbitDuration: 0.942,
                        distanceFromParent: 18.9176, // 1:10000 (189,176)
                        axisTilt: 1.574 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Hyperion',
                        radius: 0.135,
                        orbitDuration: 21.276,
                        distanceFromParent: 148.1009, // 1:10000 (1,481,009)
                        axisTilt: 0.43 / 180 * Math.PI // radians
                    }
                ]
            },
            {
                id: 7,
                name: 'Uranus',
                radius: 25.6,
                diamter: 51.2,
                distanceFromParent: 2871 * orbitScale,
                orbitDuration: 30714,
                moons: [],
                texture: null,
                rings: [65, 69, 72],
                moons: [
                    {
                        name: 'Cressida',
                        radius: 0.80 + 0.04, // (80 ±4 km)
                        orbitDuration: 0.464, // (0.335)
                        distanceFromParent: 6.1780, // 1:10000 (61,780)
                        axisTilt: 0.006 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Juliet',
                        radius: 0.468 + 0.04, // (46.8 ±4 km)
                        orbitDuration: 0.493, // (0.493)
                        distanceFromParent: 6.4350, // 1:10000 (64,350)
                        axisTilt: 0.065 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Puck',
                        radius: 0.81 + 0.02, // (81 ± 2 km)
                        orbitDuration: 0.762, // (0.762)
                        distanceFromParent: 8.6010, // 1:10000 (86,010)
                        axisTilt: 0.3192 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Miranda',
                        radius: 1.2358 + 0.007, // (235.8 ±0.7 km)
                        orbitDuration: 1.413, // (1.413479)
                        distanceFromParent: 12.9390, // 1:10000 (129,390)
                        axisTilt: 4.232 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Ariel',
                        radius: (1.1578 * 1.2) + 0.12, // (1157.8 ±1.2 km)
                        orbitDuration: 2.520, // (2.520379)
                        distanceFromParent: 19.1020, // 1:10000 (191,020)
                        axisTilt: 0.26 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Umbriel',
                        radius: (1.1694 * 1.56) + 0.56, // (1169.4 ±5.6 km)
                        orbitDuration: 4.144, // (4.144177)
                        distanceFromParent: 26.6300, // 1:10000 (266,300)
                        axisTilt: 0.205/ 180 * Math.PI // radians
                    },
                    {
                        name: 'Titania',
                        radius: (1.5768 * 1.2) + 0.12, // (1576.8 ±1.2 km)
                        orbitDuration: 8.706, // (8.705872)
                        distanceFromParent: 43.5910, // 1:10000 (435,910)
                        axisTilt: 0.34 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Oberon',
                        radius: (1.5228 * 1.52) + 0.052, // (1522.8 ±5.2 km)
                        orbitDuration: 13.463, // (13.463239)
                        distanceFromParent: 58.3520, // 1:10000 (583,520)
                        axisTilt: 0.058 / 180 * Math.PI // radians
                    }
                ]
            },
            {
                id: 8,
                name: 'Neptune',
                radius: 24.3,
                diameter: 48.6,
                distanceFromParent: 4504.3 * orbitScale,
                orbitDuration: 60025,
                moons: [],
                texture: null,
                rings: [60, 67, 71], // Neptune has 9 rings (3 major)
                moons: [
                   {
                       name: 'Despina',
                       radius: 0.75 + 0.03, // (75 ±3 km)
                       orbitDuration: 0.335, // (0.335)
                       distanceFromParent: 5.2526, // 1:10000 (52,526)
                       axisTilt: 0.068 / 180 * Math.PI // radians
                   },
                   {
                       name: 'Galatea',
                       radius: 0.88 + 0.04, // (88 ±4 km)
                       orbitDuration: 0.429, // (0.335)
                       distanceFromParent: 6.1953, // 1:10000 (61,953)
                       axisTilt: 0.034 / 180 * Math.PI // radians
                   },
                   {
                       name: 'Larissa',
                       radius: 0.97 + 0.03, // (97 ±3 km)
                       orbitDuration: 0.555, // (0.335)
                       distanceFromParent: 7.3548, // 1:10000 (73,548)
                       axisTilt: 0.205 / 180 * Math.PI // radians
                   },
                   {
                       name: 'Proteus',
                       radius: 1.210 + 0.05, // (210 ±5 km)
                       orbitDuration: 1.122, // (0.335)
                       distanceFromParent: 11.7646, // 1:10000 (117,646)
                       axisTilt: 0.075 / 180 * Math.PI // radians
                   },
                   {
                       name: 'Tritan',
                       radius: 1.3534 + 0.09, // (1353.4 ±0.9 km)
                       orbitDuration: -5.876854, // (-5.876854 retrograde)
                       distanceFromParent: 35.4759, // 1:10000 (354,759)
                       axisTilt: 129.812 / 180 * Math.PI // radians
                   }
                ]
            }
        ],
        astroidBelt: {
            primary: [
                {
                    name: 'Ceres',
                    radius: 0.475,
                    orbitDuration: 1680,
                },
                {
                    name: 'Vesta',
                    radius: 0.262,
                    orbitDuration: 1325,
                },
                {
                    name: 'Pallas',
                    radius: 0.225,
                    orbitDuration: 1686
                },
                {
                    name: 'Hygiea',
                    radius: 0.2,
                    orbitDuration: 2031
                },
            ],
            secondary: [],
            totalCount: 1500, // true number is estimated in the billions within the main astroid belt
            distanceFromParent: 373 * orbitScale
        }
    };

    return SolarSystem;
});
