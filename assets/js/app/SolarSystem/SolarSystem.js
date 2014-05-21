define(function() {

    /*
     * Solar System
     *
     * Units of measurement = kilometers (km)
     *
     * Initial Scales: {
     *     Planets = 1:1000
     *     Orbit Amplitudes = 1:100000 (multiplied by orbitScale)
     * }
     *
     */

    var SolarSystem = {
        buildEnabled: true, // toggle factories on/off
        orbitScale: 1,
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
                meanDistanceFromSun: 57.9, // 1:100000
                earthDaysToOrbitSun: 88,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 2,
                name: 'Venus',
                radius: 6.05,
                diameter: 12.1,
                meanDistanceFromSun: 108.2, // 1:100000
                earthDaysToOrbitSun: 224.7,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 3,
                name: 'Earth',
                radius: 6.35,
                diameter: 12.7,
                meanDistanceFromSun: 149.5, // 1:100000
                earthDaysToOrbitSun: 364.25,
                texture: null,
                moons: [
                    {
                        name: "Moon",
                        radius: 1.737,
                        orbitPeriod: 27,
                        distanceFromParent: 38.44 // 1:10000
                    }
                ],
                rings: []
            },
            {
                id: 4,
                name: 'Mars',
                radius: 3.4,
                diameter: 6.8,
                meanDistanceFromSun: 227.9,
                earthDaysToOrbitSun: 687,
                moons: [
                    {
                        name: "Phobos",
                        radius: 0.68, // 1:1000
                        orbitPeriod: 0.3189,
                        distanceFromParent: 9.378 // 1:1000
                    },
                    {
                        name: "Deimos",
                        radius: 1.2,
                        orbitPeriod: 1.263,
                        distanceFromParent: 23.46 // 1:1000
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
                meanDistanceFromSun: 778.3,
                earthDaysToOrbitSun: 4329,
                moons: [],
                texture: null,
                rings: []
            },
            {
                id: 6,
                name: 'Saturn',
                radius: 60,
                diameter: 120,
                meanDistanceFromSun: 1429.4,
                earthDaysToOrbitSun: 10753,
                moons: [],
                texture: null,
                rings: [160, 180, 185, 195, 210, 220, 225, 240]
            },
            {
                id: 7,
                name: 'Uranus',
                radius: 25.6,
                diamter: 51.2,
                meanDistanceFromSun: 2871,
                earthDaysToOrbitSun: 30714,
                moons: [],
                texture: null,
                rings: [65, 69, 72]
            },
            {
                id: 8,
                name: 'Neptune',
                radius: 24.3,
                diameter: 48.6,
                meanDistanceFromSun: 4504.3,
                earthDaysToOrbitSun: 60025,
                moons: [],
                texture: null,
                rings: [60, 67, 71] // Neptune has 9 rings (3 major)
            }
        ],
        astroidBelt: {
            primary: [
                {
                    name: 'Ceres',
                    radius: 0.475,
                    earthDaysToOrbitSun: 1680,
                },
                {
                    name: 'Vesta',
                    radius: 0.262,
                    earthDaysToOrbitSun: 1325,
                },
                {
                    name: 'Pallas',
                    radius: 0.225,
                    earthDaysToOrbitSun: 1686
                },
                {
                    name: 'Hygiea',
                    radius: 0.2,
                    earthDaysToOrbitSun: 2031
                },
            ],
            secondary: [],
            totalCount: 1500, // true number is estimated in the billions within the main astroid belt
            meanDistanceFromSun: 373
        }
    };

    return SolarSystem;
});
