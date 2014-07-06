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
    var sunScale       = 1 * Math.pow(10, -2.4),
        celestialScale = 1 * Math.pow(10, -2),   // 1:100
        orbitScale     = 1 * Math.pow(10, -4),   // 1:10000
        moonOrbitScale = 1 * Math.pow(10, -3)    // 1:100
    ;

    console.log(4 * celestialScale + 6)

    var SolarSystem = {
        buildEnabled: true, // toggle factories on/off
        orbitScale: orbitScale,
        celestialScale: celestialScale,
        moonOrbitScale: moonOrbitScale,
        parent: {
            name: 'Sun',
            radius: 696342 * sunScale, // 696342 ±65 km
            diameter: 1400,
            texture: null,
            distanceFromParent: 270000000000000030 //  2.7×10^17 km (27,200 light-years) from Milky Way core
        },
        planets: [
            {
                id: 1,
                name: 'Mercury',
                radius: 2439.7 * celestialScale, // 2439.7 ±1.0 km
                diameter: 4.88,
                distanceFromParent: 57909050 * orbitScale, // 57,909,050 km
                orbitDuration: 88,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 2,
                name: 'Venus',
                radius: 6051.8 * celestialScale, // 6051.8 ±1.0 km
                diameter: 12.1,
                distanceFromParent: 108208000 * orbitScale, // 108,208,000 km
                orbitDuration: 224.7,
                moons: [],
                rings: []
            },
            {
                id: 3,
                name: 'Earth',
                radius: 6371 * celestialScale, // 6371.0 km
                diameter: 12.7,
                distanceFromParent: 149598261 * orbitScale, // 149,598,261 km
                orbitDuration: 364.25,
                moons: [
                    {
                        name: 'Moon',
                        radius: 1737 * celestialScale, // 1737.10 km
                        orbitDuration: 27,
                        distanceFromParent: 384399 * moonOrbitScale, // 384,399 km
                        axisTilt: 2 / 180 * Math.PI // radians
                    }
                ],
                rings: []
            },
            {
                id: 4,
                name: 'Mars',
                radius: 3389.5 * celestialScale, // 3389.5 ±0.2 km
                diameter: 6.8,
                distanceFromParent: 227939100 * orbitScale, // 227,939,100 km
                orbitDuration: 687,
                moons: [
                    {
                        name: 'Phobos',
                        radius: (11.2667 * celestialScale) + 0.75, // 11.2667 km (0.75 is to increase the size so it's somewhat visible)
                        orbitDuration: 0.3189 * 2.5, // slow it down so it's somewhat noticeable
                        distanceFromParent: 9376 * moonOrbitScale, // 9,376 km
                        axisTilt: 26.04 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Deimos',
                        radius: (6.2 * celestialScale) + 0.75, // 6.2 ±0.18 km (0.75 is to increase the size so it's somewhat visible)
                        orbitDuration: 1.263 * 2.5, // slow it down so it's somewhat noticeable and has the same time scale as Phobos
                        distanceFromParent: 23463 * moonOrbitScale, // 23463.2 km
                        axisTilt: 27.58 / 180 * Math.PI // radians
                    }
                ],
                texture: null,
                rings: []
            },
            {
                id: 5,
                name: 'Jupiter',
                radius: 69911 * celestialScale, // 69911 ±6 km
                diameter: 143,
                distanceFromParent: 778547200 * orbitScale, // 778,547,200 km
                orbitDuration: 4329,
                moons: [],
                texture: null,
                rings: [],
                moons: [
                    {
                        name: 'Amalthea',
                        radius: 83.5 * celestialScale + 6, // 83.5 km
                        orbitDuration: 0.498,
                        distanceFromParent: 181366 * moonOrbitScale, // 181,366 km
                        axisTilt: 0.374 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Thebe',
                        radius: 49.3 * celestialScale + 6, // 49.3 km
                        orbitDuration: 0.675,
                        distanceFromParent: 221889 * moonOrbitScale, // 221,889 km
                        axisTilt: 1.076 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Io',
                        radius: 1821.6 * celestialScale, // 1821.6 ±0.5 km
                        orbitDuration: 1.769,
                        distanceFromParent: 421700 * moonOrbitScale, // 421,700 km
                        axisTilt: 2.21 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Europa',
                        radius: 1560.8 * celestialScale, //  1560.8 ±0.5 km
                        orbitDuration: 3.551,
                        distanceFromParent: 670900 * moonOrbitScale, // 670,900 km
                        axisTilt: 0.47 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Ganymede',
                        radius: 2634.1 * celestialScale, // 2634.1±0.3 km
                        orbitDuration: 7.155,
                        distanceFromParent: 1070412 * moonOrbitScale, // 1,070,412 km
                        axisTilt: 0.2 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Callisto',
                        radius: 2410.3 * celestialScale, // 2410.3 ±1.5 km
                        orbitDuration: 16.689,
                        distanceFromParent: 1882700 * moonOrbitScale, // 1,882,700 km
                        axisTilt: 0.192 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Themisto',
                        radius: 28 * celestialScale + 6, // 4 km
                        orbitDuration: 129.87,
                        distanceFromParent: 7393216 * moonOrbitScale / 1.6, // 7,393,216 km
                        axisTilt: 45.762 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Leda',
                        radius: 16 * celestialScale + 6, // 8 km
                        orbitDuration: 240.82,
                        distanceFromParent: 11187781 * moonOrbitScale / 1.6, // 11,187,781 km
                        axisTilt: 27.562 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Himalia',
                        radius: 85 * celestialScale + 6, // 85 km
                        orbitDuration: 250.23,
                        distanceFromParent: 11451971 * moonOrbitScale / 1.6, // 11,451,971 km
                        axisTilt: 30.486 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Lysithea',
                        radius: 36 * celestialScale + 6, // 36 km
                        orbitDuration: 259.89,
                        distanceFromParent: 11740560 * moonOrbitScale / 1.6, // 11,740,560 km
                        axisTilt: 27.006 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Elara',
                        radius: 43 * celestialScale + 6, // 43 km
                        orbitDuration: 257.62,
                        distanceFromParent: 11778034 * moonOrbitScale / 1.6, // 11,778,034 km
                        axisTilt: 29.691 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Carpo',
                        radius: 13 * celestialScale + 6, // 3 km
                        orbitDuration: 257.62,
                        distanceFromParent: 17144873 * moonOrbitScale / 1.8, // 17,144,873 km
                        axisTilt: 29.691 / 180 * Math.PI // radians
                    }
                ],
            },
            {
                id: 6,
                name: 'Saturn',
                radius: 58232 * celestialScale, // 58232 ±6 km
                diameter: 120,
                distanceFromParent: 1433449370 * orbitScale, // 1,433,449,370 km
                orbitDuration: 10753,
                moons: [],
                texture: null,
                rings: [160, 180, 185, 195, 210, 220, 225, 240],
                moons: [
                    {
                        name: 'Titan',
                        radius: 2576 * celestialScale, // 2576 ±2 km
                        orbitDuration: 15.945,
                        distanceFromParent: 1221870 * moonOrbitScale, // 1,221,870 km
                        axisTilt: 0.34854 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Rhea',
                        radius: 763.8 * celestialScale, // 763.8 ±1.0 km
                        orbitDuration: 4.518212,
                        distanceFromParent: 527108 * moonOrbitScale, // 527,108 km
                        axisTilt: 0.345 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Iapetus',
                        radius: 734.5 * celestialScale, // 734.5 ±2.8 km
                        orbitDuration: 79.322,
                        distanceFromParent: 3560820 * moonOrbitScale, // 3,560,820 km
                        axisTilt: 17.28 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Dione',
                        radius: 561.4 * celestialScale, // 561.4 ±0.4 km
                        orbitDuration: 2.737,
                        distanceFromParent: 377396 * moonOrbitScale, // 377396 km
                        axisTilt: 0.019 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Tethys',
                        radius: 531.1 * celestialScale, // 531.1 ±0.6 km
                        orbitDuration: 1.887802,
                        distanceFromParent: 294619 * moonOrbitScale, // 294619 km
                        axisTilt: 1.12 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Enceladus',
                        radius: 252.1 * celestialScale + 3, // 252.1 ±0.2 km
                        orbitDuration: 1.370218,
                        distanceFromParent: 237948 * moonOrbitScale, // 237948 km
                        axisTilt: 0.019 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Mimas',
                        radius: 198.2 * celestialScale + 3, // 198.2±0.4 km
                        orbitDuration: 0.942,
                        distanceFromParent: 189176 * moonOrbitScale, // 189,176 km
                        axisTilt: 1.574 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Hyperion',
                        radius: 135 * celestialScale + 2.75, // 135 ±4 km
                        orbitDuration: 21.276,
                        distanceFromParent: 1481009 * moonOrbitScale, // 1,481,009 km
                        axisTilt: 0.43 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Pheobe',
                        radius: 106.5 * celestialScale + 2.5, // 106.5 ±0.7 km
                        orbitDuration: 550.564636,
                        distanceFromParent: 12955759 * moonOrbitScale, // 12,955,759 km
                        axisTilt: 173.04 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Calypso',
                        radius: 10.7 * celestialScale + 2.4, // 10.7 ±0.7 km
                        orbitDuration: 1.887802,
                        distanceFromParent: 294619 * moonOrbitScale, // 294,619 km
                        axisTilt: 1.56 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Telesto',
                        radius: 17.6 * celestialScale + 2.45, // 17.6±0.4 km
                        orbitDuration: 2.736915,
                        distanceFromParent: 377396 * moonOrbitScale, // 377,396 km
                        axisTilt: 0.199 / 180 * Math.PI // radians
                    }
                ]
            },
            {
                id: 7,
                name: 'Uranus',
                radius: 25362 * celestialScale, // 25362 ±7 km
                diamter: 51.2,
                distanceFromParent: 2876679082, // 2,876,679,082 km
                orbitDuration: 30714,
                moons: [],
                texture: null,
                rings: [65, 69, 72],
                moons: [
                    {
                        name: 'Cressida',
                        radius: 39.8 * celestialScale + 2.5, // 39.8 ±2 km
                        orbitDuration: 0.46357,
                        distanceFromParent: 61,766.730 * moonOrbitScale, // 61,766.730 ±0.046 km
                        axisTilt: 0.046 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Juliet',
                        radius: 46.8 * celestialScale + 2.6, // 46.8 ±4 km
                        orbitDuration: 0.49307,
                        distanceFromParent: 64,358.222 * moonOrbitScale, // 64,358.222 ±0.048 km
                        axisTilt: 0.10546 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Portia',
                        radius: 67.6 * celestialScale + 2.7, // 67.6 ±4 km
                        orbitDuration: 0.513196,
                        distanceFromParent: 66097.265 * moonOrbitScale, // 66,097.265 ±0.050 km
                        axisTilt: 0.09808 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Belinda',
                        radius: 40.3 * celestialScale + 2.47, // 40.3 ±8 km
                        orbitDuration: 0.62353,
                        distanceFromParent: 75255.613 * moonOrbitScale, // 75,255.613 ± 0.057 km
                        axisTilt: 0.0306 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Puck',
                        radius: 0.81 + 0.02, // (81 ± 2 km)
                        orbitDuration: 0.762,
                        distanceFromParent: 8.6010, // 1:10000 (86,010)
                        axisTilt: 0.3192 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Miranda',
                        radius: 235.8 * celestialScale + 0.3, // 235.8 ±0.7 km
                        orbitDuration: 1.4135,
                        distanceFromParent: 129390 * moonOrbitScale, // 129,390 km
                        axisTilt: 4.232 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Ariel',
                        radius: 578.9 * celestialScale + 0.125, // 578.9 ±0.6 km
                        orbitDuration: 2.520, // (2.520379)
                        distanceFromParent: 191020 * moonOrbitScale, // 191,020 km
                        axisTilt: 0.26 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Umbriel',
                        radius: 584.7 * celestialScale + 0.133, // 584.7 ±2.8 km
                        orbitDuration: 4.144, // (4.144177)
                        distanceFromParent: 266000 * moonOrbitScale, // 266,000 km
                        axisTilt: 0.128 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Titania',
                        radius: 788.4 * celestialScale + 0.16, // 788.4 ±0.6 km
                        orbitDuration: 8.7062,
                        distanceFromParent: 435910 * moonOrbitScale, // 435,910 km
                        axisTilt: 0.34 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Oberon',
                        radius: 761.4 * celestialScale + 0.15, // 761.4 ±2.6 km
                        orbitDuration: 13.4632,
                        distanceFromParent: 583520 * moonOrbitScale, // 583,520 km
                        axisTilt: 0.058 / 180 * Math.PI // radians
                    }
                ]
            },
            {
                id: 8,
                name: 'Neptune',
                radius: 24622 * celestialScale, // 24622 ±19 km
                diameter: 48.6,
                distanceFromParent: 4503443661 * orbitScale, // 4,503,443,661 km
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
                    radius: 475 * celestialScale,
                    orbitDuration: 1680,
                },
                {
                    name: 'Vesta',
                    radius: 262 * celestialScale,
                    orbitDuration: 1325,
                },
                {
                    name: 'Pallas',
                    radius: 225 * celestialScale,
                    orbitDuration: 1686
                },
                {
                    name: 'Hygiea',
                    radius: 2 * celestialScale,
                    orbitDuration: 2031
                },
            ],
            secondary: [],
            totalCount: 1800, // true number is estimated in the billions within the main astroid belt
            distanceFromParent: 450000000 * orbitScale // 450,000,000 km
        }
    };

    return SolarSystem;
});
