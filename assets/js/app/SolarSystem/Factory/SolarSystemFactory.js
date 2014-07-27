define(
    [
        'Scene',
        'SolarSystem',
        'SunFactory',
        'PlanetFactory',
        'AstroidBeltFactory',
        'StarFactory',
        'TimerUtil',
        'System'
    ],
    function(Scene, SolarSystem, SunFactory, PlanetFactory, AstroidBeltFactory, StarFactory, TimerUtil, System) {

        /**
         * SolarSystemFactory
         *
         * This is the main factory that controls the construction of the Solar System. The contruction does not
         * begin until the scene has been built and initialized. Each build process is enabled or disabled by
         * the application configurations (found in App.js).
         */
        var SolarSystemFactory = {
            buildParent: function() {
                return $.Deferred(function(promise) {
                    if (!App.config.build.SunFactoryEnabled) {
                        return promise.resolve();
                    }

                    SunFactory.build();

                    promise.resolve();
                });
            },

            buildAstroidBelt: function() {
                return $.Deferred(function(promise) {
                    if (!App.config.build.AstroidBeltFactoryEnabled) {
                        return promise.resolve();
                    }

                    AstroidBeltFactory.buildBelt();

                    promise.resolve();
                });
            },

            buildPlanets: function() {
                return $.Deferred(function(promise) {
                    if (!App.config.build.PlanetFactoryEnabled) {
                        return promise.resolve();
                    }

                    var planets = SolarSystem.planets;

                    for (var i = 0; i < planets.length; i++) {
                        var planetBuildPromise = PlanetFactory.build(planets[i]);
                    }

                    promise.resolve();
                });
            },

            buildStars: function() {
                return $.Deferred(function(promise) {
                    if (!App.config.build.StarFactoryEnabled) {
                        return promise.resolve();
                    }

                    return $.when(StarFactory.build());
                });
            },

            build: function() {
                if (!App.config.build.SolarSystemFactoryEnabled) {
                    return promise.resolve();
                }

                var startTime = new Date().getTime();

                return $.when(
                    SolarSystemFactory.buildParent(),
                    SolarSystemFactory.buildAstroidBelt(),
                    SolarSystemFactory.buildPlanets(),
                    SolarSystemFactory.buildStars()
                )
                .done(function() {
                    var endTime = new Date().getTime();

                    System.log('Solar System Factory done building in ' +  TimerUtil.getElapsedTime('ms', startTime, endTime) / 1000 + ' seconds.');
                });
            }
        };

        return SolarSystemFactory;
    }
);
