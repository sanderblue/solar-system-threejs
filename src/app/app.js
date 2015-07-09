require.config({
    baseUrl: './src/app',
    paths: {
        'jquery'  : 'vendor/jquery/dist/jquery.min',
    },
    shim: {
        'jquery': {
            exports: ['$']
        }
    },
    urlArgs: 'bust=' + new Date().getTime().toString()
});

// Load the main app module
requirejs(['init']);
