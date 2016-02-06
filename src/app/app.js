require.config({
    baseUrl: './src/app',
    paths: {
        // App
        'init': 'init',
        'twig': 'vendor/twig.js/twig'
    },
    shim: {
        'stats': {
            exports: ['Stats']
        },
        'twig': {
            exports: ['Twig']
        },
        'init': {
            deps: [
                'Extensions/Date',
                'Modules/Error/InvalidArgumentException',
                'Modules/Error/MissingArgumentException'
            ]
        }
    },
    urlArgs: 'bust=' + new Date().getTime().toString()
});

// Initialize app
require(['init']);
