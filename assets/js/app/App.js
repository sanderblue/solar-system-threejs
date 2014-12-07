define(function() {

    var config = {
        audio: {
            enabled: false
        },
        build: {
            SceneEnabled: true,
            SunFactoryEnabled: true,
            PlanetFactoryEnabled: true,
            DwarfPlanetFactoryEnabled: false,
            MoonFactoryEnabled: true,
            AsteroidBeltFactoryEnabled: true,
            RingFactoryEnabled: true,
            OrbitFactoryEnabled: true,
            OrbitInclinationsEnabled: false,
            SolarSystemFactoryEnabled: true,
            StarFactoryEnabled: true,
            UIonly: false
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
