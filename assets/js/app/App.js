define(function() {

    var config = {
        audio: {
            enabled: false
        },
        build: {
            SceneEnabled: true,
            SunFactoryEnabled: true,
            PlanetFactoryEnabled: true,
            MoonFactoryEnabled: true,
            AsteroidBeltFactoryEnabled: true,
            RingFactoryEnabled: true,
            OrbitFactoryEnabled: true,
            SolarSystemFactoryEnabled: true,
            StarFactoryEnabled: false,
            UIonly: false,
            AudioEnabled: true
        },
        moonOrbitsEnabled: true,
        logger: {
            enabled: false
        }
    };

    var App = {
        title: 'Solar System',
        config: config,
        objects: {}
    };

    if (typeof window !== 'undefined') {
        window.App = App;
    }

    return App;

});
