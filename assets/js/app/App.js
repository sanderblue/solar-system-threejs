define(function() {

    var config = {
        audio: {
            enabled: true
        },
        build: {
            SceneEnabled: true,
            SunFactoryEnabled: true,
            PlanetFactoryEnabled: true,
            DwarfPlanetFactoryEnabled: true,
            MoonFactoryEnabled: true,
            AsteroidBeltFactoryEnabled: true,
            RingFactoryEnabled: true,
            OrbitFactoryEnabled: true,
            OrbitInclinationsEnabled: false,
            SolarSystemFactoryEnabled: true,
            StarFactoryEnabled: false,
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
