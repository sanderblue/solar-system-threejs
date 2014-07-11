define(function() {

    var Config = {
        buildEnabled: true,
        moonOrbitsEnabled: true,
        logger: {
            enabled: false
        }
    };

    var App = {
        title: 'Solar System',
        config: Config,
    };

    if (typeof window !== 'undefined') {
        window.App = App;
    }

    return App;

});
