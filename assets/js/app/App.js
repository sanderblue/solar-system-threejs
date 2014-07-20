define(function() {

    var Config = {
        build: {
            SceneEnabled: true,
            SunFactoryEnabled: false,
            PlanetFactoryEnabled: false,
            MoonFactoryEnabled: false,
            AstroidBeltFactoryEnabled: false,
            RingFactoryEnabled: true,
            OrbitFactoryEnabled: true,
            SolarSystemFactoryEnabled: true,
            StarFactoryEnabled: false,
        },
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
