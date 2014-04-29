if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystem,
    Zoom,
    Tilt,
    Scene,
    Scale
;

Scale = 2.25;
Zoom = 5200;
Tilt = 500;

SolarSystem = {
    Parent: {
        name: 'Sun',
        radius: 700,
        diameter: 1400,
        texture: null
    },
    Planets: [
        {
            id: 1,
            name: 'Mercury',
            radius: 2.44,
            diameter: 4.88,
            meanDistanceFromSun: 57.9 * Scale,
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
            meanDistanceFromSun: 108.2 * Scale,
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
            meanDistanceFromSun: 149.5 * Scale,
            earthDaysToOrbitSun: 364.25,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 4,
            name: 'Mars',
            radius: 3.4,
            diameter: 6.8,
            meanDistanceFromSun: 227.9 * Scale,
            earthDaysToOrbitSun: 687,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 5,
            name: 'Jupiter',
            radius: 71.5,
            diameter: 143,
            meanDistanceFromSun: 778.3 * Scale,
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
            meanDistanceFromSun: 1429.4 * Scale,
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
            meanDistanceFromSun: 2871 * Scale,
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
            meanDistanceFromSun: 4504.3 * Scale,
            earthDaysToOrbitSun: 60025,
            moons: [],
            texture: null,
            rings: [60, 67, 71] // Neptune has 9 rings (3 major)
        }
    ],
    AstroidBelt: {
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
        meanDistanceFromSun: 373 * Scale
    }
};

Scene.camera.focalPoint = Scene.Sun.position;

var startFor = new Date().getTime();
var planets = SolarSystem.Planets;

$.when(SolarSystemBuilder.buildPlanets()).done(function() {
    $.when(SolarSystemBuilder.buildAstroidBelt()).done(function() {
        TimeController.createTime();
    });
});

var endFor = new Date().getTime();

console.log('Builder Done: ', endFor - startFor + ' milliseconds');


$.when(init()).done(function(scene) {
    $('#zoom').val(Zoom);
    $('#tilt').val(Tilt);

    Scene.camera.focalPoint = Scene.Sun.position;
    animate();
});
