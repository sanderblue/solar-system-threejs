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

        'init': {
            deps: [
                'Modules/Error/InvalidArgumentException',
                'Modules/Error/MissingArgumentException'
            ]
        }
    },
    urlArgs: 'bust=' + new Date().getTime().toString()
});

// Load the main app module
requirejs(['init']);
