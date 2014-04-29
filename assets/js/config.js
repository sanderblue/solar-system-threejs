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

        // Modules
        'main'        : 'app/main', // loads all the main modules
        'SolarSystem' : 'app/SolarSystem/SolarSystem',
        'Console'     : 'app/Controllers/ConsoleController',
        'Time'        : 'app/Controllers/TimeController',
        'UI'          : 'app/Controllers/UIController',
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