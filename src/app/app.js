require.config({
    baseUrl: './src/app',
    paths: {
        init: 'init',
        twig: 'vendor/twig.js/twig',
        backbone: 'vendor/backbone/backbone',
        underscore: 'vendor/underscore/underscore'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['underscore']
        },
        stats: {
            exports: 'Stats'
        },
        twig: {
            exports: 'Twig'
        },
        init: {
            deps: [
                'Extensions/Date',
                'Extensions/HSV',
                'Modules/ThirdPartyScripts',
                'Modules/Error/InvalidArgumentException',
                'Modules/Error/MissingArgumentException'
            ]
        }
    },
    urlArgs: 'bust=' + new Date().getTime()
});

// Initialize app
require(['init']);
