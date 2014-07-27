require.config({
    baseUrl: "assets/js",
    // urlArgs: 'bust=' + new Date().getTime().toString(), // bust cache for development purposes ("bust=v2" for production)
    paths: {
        // Core
        'requirejs'   : 'libs/requirejs/require',
        'jquery'      : 'libs/jquery/jquery',
        'threejs'     : 'libs/threejs/three.min',

        // Three.js Extensions
        'detector'            : 'libs/threejs/extensions/detector',
        'stats'               : 'libs/threejs/extensions/stats',
        'convexgeometry'      : 'libs/threejs/extensions/convexgeometry',
        'AdditiveBlendShader' : 'app/Modules/ThreeJS/AdditiveBlendShader',

        // Main
        'main'        : 'app/main',
        'App'         : 'app/App',
        'Initializer' : 'app/SolarSystem/Init/Initializer',
        'SolarSystem' : 'app/SolarSystem/SolarSystem',

        // Environment
        'Time'        : 'app/Environment/Time',
        'Scene'       : 'app/Environment/Scene',
        'Camera'      : 'app/Environment/Camera',
        'Constants'   : 'app/Environment/Constants',

        // Factories
        'SolarSystemFactory' : 'app/SolarSystem/Factory/SolarSystemFactory',
        'SunFactory'         : 'app/SolarSystem/Factory/SunFactory',
        'PlanetFactory'      : 'app/SolarSystem/Factory/PlanetFactory',
        'AstroidBeltFactory' : 'app/SolarSystem/Factory/AstroidBeltFactory',
        'RingFactory'        : 'app/SolarSystem/Factory/RingFactory',
        'MoonFactory'        : 'app/SolarSystem/Factory/MoonFactory',
        'OrbitFactory'       : 'app/SolarSystem/Factory/OrbitFactory',
        'StarFactory'        : 'app/SolarSystem/Factory/StarFactory',

        // Controllers
        'OrbitController' : 'app/Controllers/OrbitController',
        'Console'         : 'app/Controllers/ConsoleController',
        'TimeController'  : 'app/Controllers/TimeController',
        'UIController'    : 'app/Controllers/UIController',

        // Modules
        'Modules'                  : 'app/Modules/Modules',
        'Accordian'                : 'app/Modules/Accordian',
        'MissingArgumentException' : 'app/Modules/Error/MissingArgumentException',
        'InvalidArgumentException' : 'app/Modules/Error/InvalidArgumentException',
        'RandomNumber'             : 'app/Modules/RandomNumber',

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
            deps: ['jquery', 'threejs', 'App', 'AdditiveBlendShader', 'Constants', 'Time', 'Modules', 'OrbitFactory', 'UIController']
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
        'UIController': {
            deps: ['SolarSystem', 'Time', 'Scene']
        },
        'Modules': {
            deps: ['MissingArgumentException', 'InvalidArgumentException']
        },
        'Camera': {
            deps: ['threejs']
        },
        'Scene': {
            deps: ['Camera']
        },
        'OrbitFactory': {
            deps: ['threejs']
        },
        'StarFactory': {
            deps: ['Scene', 'RandomNumber']
        }
    }
});

// Load the main app module
requirejs(["app/main"]);
