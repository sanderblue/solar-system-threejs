define(function() {
    /**
     * Solar System
     *
     * This file contains the universal data to be used to build the entire model.
     * The initial scales differ for better user experience. Adjustments will be made
     * as the project progresses.
     */

    // Inital scales
    var sunScale        = 1 * Math.pow(10, -2.4),
        celestialScale  = 1 * Math.pow(10, -2),
        moonOrbitScale  = 1 * Math.pow(10, -2.35),
        orbitScale      = 1 * Math.pow(10, -4),
        axialTiltOffset = 180
    ;

    // Solar System data
    var SolarSystem = {
        orbitScale: orbitScale,
        celestialScale: celestialScale,
        moonOrbitScale: moonOrbitScale,
        parent: {
            name: 'Sun',
            radius: 696342 * sunScale, // 696342 ±65 km
            diameter: 1400,
            texture: null,
            distanceFromParent: 270000000000000030 //  2.7×10^17 km (27,200 light-years) from the Milky Way core
        },
        planets: [
            {
                id: 1,
                name: 'Mercury',
                radius: 2439.7 * celestialScale, // 2439.7 ±1.0 km
                diameter: 4.88,
                distanceFromParent: 57909050 * orbitScale, // 57,909,050 km
                orbitDuration: 88,
                inclination: 6.34 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 26.73 / 180 * Math.PI,
                moons: [],
                texture: null,
                rings: [],
                positionOffset: 48 // Earth days ahead in it based on the current day of the year
            },
            {
                id: 2,
                name: 'Venus',
                radius: 6051.8 * celestialScale, // 6051.8 ±1.0 km
                diameter: 12.1,
                distanceFromParent: 108208000 * orbitScale, // 108,208,000 km
                orbitDuration: 224.7,
                inclination: 2.19 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 177.36 / 180 * Math.PI,
                moons: [],
                rings: [],
                positionOffset: 155
            },
            {
                id: 3,
                name: 'Earth',
                radius: 6371 * celestialScale, // 6371.0 km
                diameter: 12.7,
                distanceFromParent: 149598261 * orbitScale, // 149,598,261 km
                orbitDuration: 364.25,
                inclination: 1.57869 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 23.5 / 180 * Math.PI,
                moons: [
                    {
                        name: 'Moon',
                        radius: 1737 * celestialScale, // 1737.10 km
                        orbitDuration: 27,
                        distanceFromParent: 384399 * moonOrbitScale, // 384,399 km
                        inclination: 2 / 180 * Math.PI
                    }
                ],
                rings: [],
                positionOffset: 0
            },
            {
                id: 4,
                name: 'Mars',
                radius: 3389.5 * celestialScale, // 3389.5 ±0.2 km
                diameter: 6.8,
                distanceFromParent: 227939100 * orbitScale, // 227,939,100 km
                orbitDuration: 687,
                inclination: 1.67 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 25.19 / 180 * Math.PI,
                moons: [
                    {
                        name: 'Phobos',
                        radius: 11.2667 * celestialScale + 0.75, // 11.2667 km (0.75 is to increase the size so it's somewhat visible)
                        orbitDuration: 0.3189 * 2.5, // slow it down so it's somewhat noticeable
                        distanceFromParent: 9376 * moonOrbitScale, // 9,376 km
                        inclination: 26.04 / 180 * Math.PI
                    },
                    {
                        name: 'Deimos',
                        radius: 6.2 * celestialScale + 0.65, // 6.2 ±0.18 km (0.65 is to increase the size so it's somewhat visible)
                        orbitDuration: 1.263 * 2.5, // slow it down so it's somewhat noticeable and has the same time scale as Phobos
                        distanceFromParent: 23463 * moonOrbitScale, // 23463.2 km
                        inclination: 27.58 / 180 * Math.PI
                    }
                ],
                texture: null,
                rings: [],
                positionOffset: 71
            },
            {
                id: 5,
                name: 'Jupiter',
                radius: 69911 * celestialScale, // 69911 ±6 km
                diameter: 143,
                distanceFromParent: 778547200 * orbitScale, // 778,547,200 km
                orbitDuration: 4329,
                inclination: 1.305 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 3.13 / 180 * Math.PI,
                moons: [],
                texture: null,
                rings: [
                    {
                        name: 'Halo Ring',
                        distanceFromParent: 107250 * moonOrbitScale, // 92,000 – 122,500 km (107250 mean)
                        width: 30500,
                        color: 0x706D67
                    },
                    {
                        name: 'Main Ring',
                        distanceFromParent: 125750 * moonOrbitScale, // 122,500 – 129,000 km (125,750 mean)
                        width: 6500,
                        color: 0x848176
                    },
                    {
                        name: 'Amalthea Gossamer Ring',
                        distanceFromParent: 155500 * moonOrbitScale, // 129,000 – 182,000 km (155,500 mean)
                        width: 53000,
                        color: 0x868375
                    },
                    {
                        name: 'Thebe Gossamer Ring',
                        distanceFromParent: 177500 * moonOrbitScale, // 129,000 – 226,000 km (177,500 mean)
                        width: 97000,
                        color: 0x7C786A
                    },
                ],
                moons: [
                    {
                        name: 'Amalthea',
                        radius: 83.5 * celestialScale + 6, // 83.5 km
                        orbitDuration: 0.498,
                        distanceFromParent: 181366 * moonOrbitScale, // 181,366 km
                        inclination: 0.374 / 180 * Math.PI
                    },
                    {
                        name: 'Thebe',
                        radius: 49.3 * celestialScale + 6, // 49.3 km
                        orbitDuration: 0.675,
                        distanceFromParent: 221889 * moonOrbitScale, // 221,889 km
                        inclination: 1.076 / 180 * Math.PI
                    },
                    {
                        name: 'Io',
                        radius: 1821.6 * celestialScale, // 1821.6 ±0.5 km
                        orbitDuration: 1.769,
                        distanceFromParent: 421700 * moonOrbitScale, // 421,700 km
                        inclination: 2.21 / 180 * Math.PI
                    },
                    {
                        name: 'Europa',
                        radius: 1560.8 * celestialScale, //  1560.8 ±0.5 km
                        orbitDuration: 3.551,
                        distanceFromParent: 670900 * moonOrbitScale, // 670,900 km
                        inclination: 0.47 / 180 * Math.PI
                    },
                    {
                        name: 'Ganymede',
                        radius: 2634.1 * celestialScale, // 2634.1±0.3 km
                        orbitDuration: 7.155,
                        distanceFromParent: 1070412 * moonOrbitScale, // 1,070,412 km
                        inclination: 0.2 / 180 * Math.PI
                    },
                    {
                        name: 'Callisto',
                        radius: 2410.3 * celestialScale, // 2410.3 ±1.5 km
                        orbitDuration: 16.689,
                        distanceFromParent: 1882700 * moonOrbitScale, // 1,882,700 km
                        inclination: 0.192 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Themisto',
                        radius: 28 * celestialScale + 6, // 4 km
                        orbitDuration: 129.87,
                        distanceFromParent: 7393216 * moonOrbitScale / 1.6, // 7,393,216 km
                        inclination: 45.762 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Leda',
                        radius: 16 * celestialScale + 6, // 8 km
                        orbitDuration: 240.82,
                        distanceFromParent: 11187781 * moonOrbitScale / 1.6, // 11,187,781 km
                        inclination: 27.562 / 180 * Math.PI
                    },
                    {
                        name: 'Himalia',
                        radius: 85 * celestialScale + 6, // 85 km
                        orbitDuration: 250.23,
                        distanceFromParent: 11451971 * moonOrbitScale / 1.6, // 11,451,971 km
                        inclination: 30.486 / 180 * Math.PI
                    },
                    {
                        name: 'Lysithea',
                        radius: 36 * celestialScale + 6, // 36 km
                        orbitDuration: 259.89,
                        distanceFromParent: 11740560 * moonOrbitScale / 1.6, // 11,740,560 km
                        inclination: 27.006 / 180 * Math.PI
                    },
                    {
                        name: 'Elara',
                        radius: 43 * celestialScale + 6, // 43 km
                        orbitDuration: 257.62,
                        distanceFromParent: 11778034 * moonOrbitScale / 1.6, // 11,778,034 km
                        inclination: 29.691 / 180 * Math.PI
                    },
                    {
                        name: 'Carpo',
                        radius: 13 * celestialScale + 6, // 3 km
                        orbitDuration: 257.62,
                        distanceFromParent: 17144873 * moonOrbitScale / 1.8, // 17,144,873 km
                        inclination: 29.691 / 180 * Math.PI
                    }
                ],
                positionOffset: 2692
            },
            {
                id: 6,
                name: 'Saturn',
                radius: 58232 * celestialScale, // 58232 ±6 km
                diameter: 120,
                distanceFromParent: 1433449370 * orbitScale, // 1,433,449,370 km
                orbitDuration: 10753,
                inclination: 2.48524 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 26.73 / 180 * Math.PI,
                moons: [],
                texture: null,
                rings: [
                    {
                        name: 'D Ring',
                        distanceFromParent: 70705 * moonOrbitScale, // 66,900 – 74,510 km (70,705 mean)
                        width: 7500,
                        color: 0x706D67
                    },
                    {
                        name: 'C Ring',
                        distanceFromParent: 83329 * moonOrbitScale, // 74,658 – 92,000 km (83,329 mean)
                        width: 17500,
                        color: 0x706D67
                    },
                    {
                        name: 'B Ring',
                        distanceFromParent: 104790 * moonOrbitScale, // 92,000 – 117,580 km (104,790 mean)
                        width: 25500,
                        color: 0x756A4C
                    },
                    {
                        name: 'Cassini Division',
                        distanceFromParent: 119875 * moonOrbitScale, // 117,580 – 122,170 km (119,875 mean)
                        width: 4700,
                        color: 0x72674D
                    },
                    {
                        name: 'A Ring',
                        distanceFromParent: 129473 * moonOrbitScale, // 122,170 – 136,775 km (129,473 mean)
                        width: 14600,
                        color: 0x6B624B
                    },
                    {
                        name: 'Roche Division',
                        distanceFromParent: 138078 * moonOrbitScale, // 136,775 – 139,380 km (138,078 mean)
                        width: 2600,
                        color: 0x615E58
                    },
                    {
                        name: 'F Ring',
                        distanceFromParent: 140180 * moonOrbitScale, // 140,180 km (140,180 mean)
                        width: 500,
                        color: 0x6E6758
                    },
                    {
                        name: 'Janus/Epimetheus Ring',
                        distanceFromParent: 151500 * moonOrbitScale, // 149,000 – 154,000 km (151,500 mean)
                        width: 5000,
                        color: 0x615E58
                    },
                    {
                        name: 'G Ring',
                        distanceFromParent: 170500 * moonOrbitScale, // 166,000 – 175,000 km (170,500 mean)
                        width: 9000,
                        color: 0x6B675D
                    },
                    {
                        name: 'Pallene Ring',
                        distanceFromParent: 212250 * moonOrbitScale, // 211,000 – 213,500 km (212,250 mean)
                        width: 2500,
                        color: 0x706C60
                    },
                    {
                        name: 'E Ring',
                        distanceFromParent: 330000 * moonOrbitScale, // 180,000 - 480,000 km (138,078 mean)
                        width: 300000, // 300,000 km
                        color: 0x615E58
                    }
                ],
                moons: [
                    {
                        name: 'Titan',
                        radius: 2576 * celestialScale, // 2576 ±2 km
                        orbitDuration: 15.945,
                        distanceFromParent: 1221870 * moonOrbitScale, // 1,221,870 km
                        inclination: 0.34854 / 180 * Math.PI
                    },
                    {
                        name: 'Rhea',
                        radius: 763.8 * celestialScale, // 763.8 ±1.0 km
                        orbitDuration: 4.518212,
                        distanceFromParent: 527108 * moonOrbitScale, // 527,108 km
                        inclination: 0.345 / 180 * Math.PI
                    },
                    {
                        name: 'Iapetus',
                        radius: 734.5 * celestialScale, // 734.5 ±2.8 km
                        orbitDuration: 79.322,
                        distanceFromParent: 3560820 * moonOrbitScale, // 3,560,820 km
                        inclination: 17.28 / 180 * Math.PI
                    },
                    {
                        name: 'Dione',
                        radius: 561.4 * celestialScale, // 561.4 ±0.4 km
                        orbitDuration: 2.737,
                        distanceFromParent: 377396 * moonOrbitScale, // 377396 km
                        inclination: 0.019 / 180 * Math.PI
                    },
                    {
                        name: 'Tethys',
                        radius: 531.1 * celestialScale, // 531.1 ±0.6 km
                        orbitDuration: 1.887802,
                        distanceFromParent: 294619 * moonOrbitScale, // 294619 km
                        inclination: 1.12 / 180 * Math.PI
                    },
                    {
                        name: 'Enceladus',
                        radius: 252.1 * celestialScale + 3, // 252.1 ±0.2 km
                        orbitDuration: 1.370218,
                        distanceFromParent: 237948 * moonOrbitScale, // 237948 km
                        inclination: 0.019 / 180 * Math.PI
                    },
                    {
                        name: 'Mimas',
                        radius: 198.2 * celestialScale + 3, // 198.2±0.4 km
                        orbitDuration: 0.942,
                        distanceFromParent: 189176 * moonOrbitScale, // 189,176 km
                        inclination: 1.574 / 180 * Math.PI
                    },
                    {
                        name: 'Hyperion',
                        radius: 135 * celestialScale + 2.75, // 135 ±4 km
                        orbitDuration: 21.276,
                        distanceFromParent: 1481009 * moonOrbitScale, // 1,481,009 km
                        inclination: 0.43 / 180 * Math.PI
                    },
                    {
                        name: 'Pheobe',
                        radius: 106.5 * celestialScale + 2.5, // 106.5 ±0.7 km
                        orbitDuration: 550.564636,
                        distanceFromParent: 12955759 * moonOrbitScale, // 12,955,759 km
                        inclination: 173.04 / 180 * Math.PI
                    },
                    {
                        name: 'Calypso',
                        radius: 10.7 * celestialScale + 2.4, // 10.7 ±0.7 km
                        orbitDuration: 1.887802,
                        distanceFromParent: 294619 * moonOrbitScale, // 294,619 km
                        inclination: 1.56 / 180 * Math.PI
                    },
                    {
                        name: 'Telesto',
                        radius: 17.6 * celestialScale + 2.45, // 17.6±0.4 km
                        orbitDuration: 2.736915,
                        distanceFromParent: 377396 * moonOrbitScale, // 377,396 km
                        inclination: 0.199 / 180 * Math.PI
                    }
                ],
                positionOffset: 13753
            },
            {
                id: 7,
                name: 'Uranus',
                radius: 25362 * celestialScale, // 25362 ±7 km
                diamter: 51.2,
                distanceFromParent: 2876679082 * orbitScale, // 2,876,679,082 km
                orbitDuration: 30687.15,
                inclination: 1.02 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 97.77 / 180 * Math.PI,
                moons: [],
                texture: null,
                rings: [
                    {
                        name: 'ζcc',
                        distanceFromParent: 30865 * moonOrbitScale, // 26,840 – 34,890 km (30,865 mean)
                        width: 8000,
                        color: 0x6E6E6E
                    },
                    {
                        name: 'ζc',
                        distanceFromParent: 36370 * moonOrbitScale, // 34,890 – 37,850 km (36,370 mean)
                        width: 7500,
                        color: 0xBDBDBD
                    },
                    {
                        name: '1986U2R',
                        distanceFromParent: 38250 * moonOrbitScale, // 37,000 – 39,500 km (38,250 mean)
                        width: 2500,
                        color: 0xA4A4A4
                    },
                    {
                        name: 'ζ',
                        distanceFromParent: 39600 * moonOrbitScale, // 37,850 – 41,350 km (39,600 mean)
                        width: 3500,
                        color: 0xA4A4A4
                    },
                    {
                        name: 'α',
                        distanceFromParent: 44718 * moonOrbitScale,
                        width: 7.1,
                        color: 0x9A9A9A
                    },
                    {
                        name: 'η',
                        distanceFromParent: 47175 * moonOrbitScale,
                        width: 2.19,
                        color: 0x8E8E8E
                    },
                    {
                        name: 'λ',
                        distanceFromParent: 50023 * moonOrbitScale,
                        width: 2,
                        color: 0xAEAEAE
                    },
                    {
                        name: 'ν',
                        distanceFromParent: 68000 * moonOrbitScale, // 66,100 – 69,900 km (39,600 mean)
                        width: 3800,
                        color: 0xB5A6A6
                    },
                    {
                        name: 'μ',
                        distanceFromParent: 94500 * moonOrbitScale, // 86,000 – 103,000 km (94,500 mean)
                        width: 17000,
                        color: 0xC4ADAD
                    }
                ],
                moons: [
                    {
                        name: 'Cressida',
                        radius: 39.8 * celestialScale + 2.398, // 39.8 ±2 km
                        orbitDuration: 0.46357,
                        distanceFromParent: 61766.730 * moonOrbitScale, // 61,766.730 ±0.046 km
                        inclination: 0.046 / 180 * Math.PI
                    },
                    {
                        name: 'Juliet',
                        radius: 46.8 * celestialScale + 2.468, // 46.8 ±4 km
                        orbitDuration: 0.49307,
                        distanceFromParent: 64358.222 * moonOrbitScale, // 64,358.222 ±0.048 km
                        inclination: 0.10546 / 180 * Math.PI
                    },
                    {
                        name: 'Portia',
                        radius: 67.6 * celestialScale + 2.676, // 67.6 ±4 km
                        orbitDuration: 0.513196,
                        distanceFromParent: 66097.265 * moonOrbitScale, // 66,097.265 ±0.050 km
                        inclination: 0.09808 / 180 * Math.PI
                    },
                    {
                        name: 'Belinda',
                        radius: 40.3 * celestialScale + 2.403, // 40.3 ±8 km
                        orbitDuration: 0.62353,
                        distanceFromParent: 75255.613 * moonOrbitScale, // 75,255.613 ± 0.057 km
                        inclination: 0.0306 / 180 * Math.PI
                    },
                    {
                        name: 'Puck',
                        radius: 81 * celestialScale + 2.81, // (81 ± 2 km)
                        orbitDuration: 0.7618,
                        distanceFromParent: 86004.444 * moonOrbitScale, // 86,004.444 km
                        inclination: 0.3192 / 180 * Math.PI
                    },
                    {
                        name: 'Miranda',
                        radius: 235.8 * celestialScale + 0.35, // 235.8 ±0.7 km
                        orbitDuration: 1.4135,
                        distanceFromParent: 129390 * moonOrbitScale, // 129,390 km
                        inclination: 4.232 / 180 * Math.PI
                    },
                    {
                        name: 'Ariel',
                        radius: 578.9 * celestialScale + 0.78, // 578.9 ±0.6 km
                        orbitDuration: 2.520,
                        distanceFromParent: 191020 * moonOrbitScale, // 191,020 km
                        inclination: 0.26 / 180 * Math.PI
                    },
                    {
                        name: 'Umbriel',
                        radius: 584.7 * celestialScale + 0.84, // 584.7 ±2.8 km
                        orbitDuration: 4.144,
                        distanceFromParent: 266000 * moonOrbitScale, // 266,000 km
                        inclination: 0.128 / 180 * Math.PI
                    },
                    {
                        name: 'Titania',
                        radius: 788.4 * celestialScale + 0.88, // 788.4 ±0.6 km
                        orbitDuration: 8.7062,
                        distanceFromParent: 435910 * moonOrbitScale, // 435,910 km
                        inclination: 0.34 / 180 * Math.PI
                    },
                    {
                        name: 'Oberon',
                        radius: 761.4 * celestialScale + 0.61, // 761.4 ±2.6 km
                        orbitDuration: 13.4632,
                        distanceFromParent: 583520 * moonOrbitScale, // 583,520 km
                        inclination: 0.058 / 180 * Math.PI
                    }
                ],
                positionOffset: 29654
            },
            {
                id: 8,
                name: 'Neptune',
                radius: 24622 * celestialScale, // 24622 ±19 km
                diameter: 48.6,
                distanceFromParent: 4503443661 * orbitScale, // 4,503,443,661 km
                orbitDuration: 60025,
                inclination: 1.768 / 180 * Math.PI,
                axialTilt: axialTiltOffset + 28.32 / 180 * Math.PI,
                moons: [],
                texture: null,
                rings: [
                    {
                        name: 'Galle',
                        distanceFromParent: 41900 * moonOrbitScale, // 40,900 – 42,900 km (41,900 mean)
                        width: 2000,
                        color: 0xBDBDBD
                    },
                    {
                        name: 'Le Verrier',
                        distanceFromParent: 53200 * moonOrbitScale,
                        width: 113,
                        color: 0x757B8A
                    },
                    {
                        name: 'Lassell',
                        distanceFromParent: 55200 * moonOrbitScale, // 53,200 – 57,200 km (55200 mean)
                        width: 4000,
                        color: 0x676F82
                    },
                    {
                        name: 'Arago',
                        distanceFromParent: 57200 * moonOrbitScale,
                        width: 100,
                        color: 0xC4ADAD
                    },
                    {
                        name: 'Adams',
                        distanceFromParent: 62932 * moonOrbitScale,
                        width: 50,
                        color: 0x626D8A
                    }
                ],
                moons: [
                    {
                        name: 'Thalassa',
                        radius: 41 * celestialScale + 2.41, // (75 ±3 km)
                        orbitDuration: 0.3115,
                        distanceFromParent: 50075 * moonOrbitScale, // 50,075 ±1 km
                        inclination: 0.23 / 180 * Math.PI // radians
                    },
                    {
                        name: 'Despina',
                        radius: 75 * celestialScale + 2.75, // 75 ±3 km
                        orbitDuration: 0.3347,
                        distanceFromParent: 52526 * moonOrbitScale, // 52,526 ± 1 km
                        inclination: 0.226 / 180 * Math.PI
                    },
                    {
                        name: 'Galatea',
                        radius: 88 * celestialScale + 2.88, // 88 ±4 km
                        orbitDuration: 0.4287,
                        distanceFromParent: 61953 * moonOrbitScale, // 61,953 ±1 km
                        inclination: 0.063 / 180 * Math.PI
                    },
                    {
                        name: 'Larissa',
                        radius: 97.3 * celestialScale + 2.973, // 97 ±3 km
                        orbitDuration: 0.5547,
                        distanceFromParent: 73548 * moonOrbitScale, // 73,548 ±1 km
                        inclination: 0.259 / 180 * Math.PI
                    },
                    {
                        name: 'Proteus',
                        radius: 210 * celestialScale + 3.1, // 210 ±7 km
                        orbitDuration: 1.1223,
                        distanceFromParent: 117647 * moonOrbitScale, // 117647 ±1 km
                        inclination: 0.524 / 180 * Math.PI
                    },
                    {
                        name: 'Triton',
                        radius: 1353.4 * celestialScale, // 1353.4 ±0.9 km
                        orbitDuration: -5.876854, // retrograde orbit
                        distanceFromParent: 354759 * moonOrbitScale, // 354,759 km
                        inclination: 129.812 / 180 * Math.PI
                    },
                    {
                        name: 'Nereid',
                        radius: 170 * celestialScale + 2.17, // 170 ±25 km
                        orbitDuration: 360.1362,
                        distanceFromParent: 5513787 * moonOrbitScale, // 5,513,787 km
                        inclination: 32.55 / 180 * Math.PI
                    },
                    {
                        name: 'Halimede',
                        radius: 62 * celestialScale + 2.62, // 62 km
                        orbitDuration: 1879.08,
                        distanceFromParent: 16611000 * moonOrbitScale, // 16,611,000 km
                        inclination: 112.712 / 180 * Math.PI
                    }
                ],
                positionOffset: 62885
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
                    radius: 2 * celestialScale + 1,
                    orbitDuration: 2031
                },
            ],
            secondary: [],
            count: 1400, // true number is estimated in the billions within the main astroid belt
            distanceFromParent: 450000000 * orbitScale // 450,000,000 km
        },
        stars: {
            count: 250
        }
    };

    return SolarSystem;
});
