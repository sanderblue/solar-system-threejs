require.config({
    baseUrl: "js",
    paths: {
        // Core
        'requirejs' : 'libs/requirejs/require',
        'jquery'    : 'libs/jquery/jquery',
        'threejs'   : 'libs/threejs/three.min',

        // Three.js Extensions
        'detector'  : 'libs/threejs/extensions/detector',
        'stats'     : 'libs/threejs/extensions/stats',

        // Modules
        'main'      : 'app/main'
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
        }

    }
});

// Load the main app module
requirejs(["app/main"]);