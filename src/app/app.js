require.config({
    baseUrl: './src/app',
    paths: {
        // App
        'init': 'init'
    },
    shim: {
        'stats': {
            exports: ['Stats']
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
