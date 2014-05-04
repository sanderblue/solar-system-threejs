define(
    [
        'Scene',
        'SolarSystem',
        'SunFactory',
        'PlanetFactory',
        'AstroidBeltFactory',
        'TimerUtil'
    ],
    function(Scene, SolarSystem, SunFactory, PlanetFactory, AstroidBeltFactory, TimerUtil) {

        var SolarSystemBuilder = {
            buildParent: function() {
                return $.Deferred(function(promise) {

                    SunFactory.build();

                    promise.resolve();
                });
            },

            buildAstroidBelt: function() {
                return $.Deferred(function(promise) {
                    AstroidBeltFactory.buildBelt();

                    promise.resolve();
                });
            },

            buildPlanets: function() {
                return $.Deferred(function(promise) {
                    var planets = SolarSystem.planets;

                    for (var i = 0; i < planets.length; i++) {
                        var planetBuildPromise = PlanetFactory.build(planets[i]);
                    }

                    console.log('Done building planets.');

                    promise.resolve();
                });
            },

            build: function() {
                var promise1 = SolarSystemBuilder.buildParent(),
                    promise2 = SolarSystemBuilder.buildAstroidBelt(),
                    promise3 = SolarSystemBuilder.buildPlanets()
                ;

                $.when(
                    promise1,
                    promise2,
                    promise3
                )
                .done(function() {
                    console.log('Solar System Factory done building.');
                });
            }
        };

        return SolarSystemBuilder;
    }
);