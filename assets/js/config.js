require.config({
    baseUrl: "assets/js",
    // urlArgs: 'bust=' + new Date().getTime().toString(), // bust cache for development purposes ("bust=v2" for production)
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
        'App'         : 'app/App',
        'Initializer' : 'app/SolarSystem/Init/Initializer',
        'Scene'       : 'app/Environment/Scene',
        'SolarSystem' : 'app/SolarSystem/SolarSystem',

        // Factories
        'SolarSystemFactory' : 'app/SolarSystem/Factory/SolarSystemFactory',
        'SunFactory'         : 'app/SolarSystem/Factory/SunFactory',
        'PlanetFactory'      : 'app/SolarSystem/Factory/PlanetFactory',
        'AstroidBeltFactory' : 'app/SolarSystem/Factory/AstroidBeltFactory',
        'RingFactory'        : 'app/SolarSystem/Factory/RingFactory',
        'MoonFactory'        : 'app/SolarSystem/Factory/MoonFactory',

        // Controllers
        'OrbitController' : 'app/Controllers/OrbitController',
        'Console'         : 'app/Controllers/ConsoleController',
        'Time'            : 'app/Controllers/TimeController',
        'UI'              : 'app/Controllers/UIController',

        // Modules
        'Modules'                  : 'app/Modules/Modules',
        'MissingArgumentException' : 'app/Modules/Error/MissingArgumentException',
        'InvalidArgumentException' : 'app/Modules/Error/InvalidArgumentException',

        // Extensions
        'Date'        : 'app/Extensions/Date',

        // Utilities
        'System'    : 'app/Utilities/System',
        'TimerUtil' : 'app/Utilities/TimerUtil'
    },
    shim: {
        'jqsuery': {
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
            deps: ['jquery', 'threejs', 'App', 'Modules']
        },
        'Initializer': {
            deps: ['Scene']
        },
        'SolarSystem': {
            deps: ['jquery', 'threejs', 'detector', 'convexgeometry', 'Time', 'TimerUtil']
        },
        'SolarSystemFactory': {
            deps: ['Scene', 'SolarSystem']
        },
        'Time': {
            deps: ['Date']
        },
        'UI': {
            deps: ['SolarSystem', 'Time']
        },
        'Modules': {
            deps: ['MissingArgumentException', 'InvalidArgumentException']
        },
        'Scene': {
            deps: ['threejs']
        }
    }
});

// Load the main app module
requirejs(["app/main"]);