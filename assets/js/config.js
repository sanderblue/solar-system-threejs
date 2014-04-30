require.config({
    baseUrl: "assets/js",
    paths: {
        // Core
        'requirejs'   : 'libs/requirejs/require',
        'jquery'      : 'libs/jquery/jquery',
        'threejs'     : 'libs/threejs/three.min',

        // Three.js Extensions
        'detector'       : 'libs/threejs/extensions/detector',
        'stats'          : 'libs/threejs/extensions/stats',
        'convexgeometry' : 'libs/threejs/extensions/convexgeometry',

        // Main
        'main'        : 'app/main',
        'Scene'       : 'app/Environment/Scene',
        'SolarSystem' : 'app/SolarSystem/SolarSystem',

        // Factories
        'SolarSystemFactory' : 'app/SolarSystem/Factory/SolarSystemFactory',
        'SunFactory'         : 'app/SolarSystem/Factory/SunFactory',
        'PlanetFactory'      : 'app/SolarSystem/Factory/PlanetFactory',
        'AstroidBeltFactory' : 'app/SolarSystem/Factory/AstroidBeltFactory',
        'RingFactory'        : 'app/SolarSystem/Factory/RingFactory',

        // Controllers
        'Console'     : 'app/Controllers/ConsoleController',
        'Time'        : 'app/Controllers/TimeController',
        'UI'          : 'app/Controllers/UIController',

        // Extensions
        'Date'        : 'app/Extensions/Date'

    },
    shim: {
        'jquery': {
            exports: ['$', 'jQuery']
        },
        'detector': {
            deps: ['threejs']
        },
        'stats': {
            deps: ['detector']
        },
        'convexgeometry': {
            deps: ['stats']
        },
        'main': {
            deps: ['jquery', 'threejs']
        },
        'SolarSystem': {
            deps: ['jquery', 'threejs', 'detector', 'convexgeometry', 'Time']
        },
        'Time': {
            deps: ['Date']
        },
        'UI': {
            deps: ['SolarSystem', 'Time']
        }

    }
});

// Load the main app module
requirejs(["app/main"]);