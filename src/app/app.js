require.config({
    baseUrl: './src/app',
    paths: {
        // Vendor
        'jquery': 'vendor/jquery/dist/jquery.min',

        // App
        'init': 'init'
    },
    shim: {
        'jquery': {
            exports: ['$']
        },

        'stats': {
            exports: ['Stats']
        },

        'init': {
            deps: [
                'Extensions/Date',
                'Modules/Error/InvalidArgumentException',
                'Modules/Error/MissingArgumentException',
                'Controllers/TimeController'
            ]
        }
    },
    urlArgs: 'bust=' + new Date().getTime().toString()
});

// Initialize app
require(['init']);
