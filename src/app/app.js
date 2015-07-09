require.config({
    baseUrl: './src/app',
    paths: {
        'jquery'  : 'vendor/jquery/dist/jquery.min',
        'threejs' : 'vendor/threejs/build/three.min'
    },
    shim: {
        'jquery': {
            exports: ['$', 'jQuery']
        },
        'threejs': {
            exports: ['THREE', '3']
        },
        'Modules/Config': {
            exports: ['App']
        },
        'init': {
            deps: ['Modules/Config']
        }
    },
    urlArgs: 'bust=' + new Date().getTime().toString()
});

// Load the main app module
requirejs(['init']);
