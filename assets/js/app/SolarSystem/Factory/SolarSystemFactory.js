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

                    promise.resolve();
                });
            },

            build: function() {
                var startTime = new Date().getTime();

                $.when(
                    SolarSystemBuilder.buildParent(),
                    SolarSystemBuilder.buildAstroidBelt(),
                    SolarSystemBuilder.buildPlanets()
                )
                .done(function() {

                    var endTime = new Date().getTime();

                    // console.log(TimerUtil.getElapsedTime('ms', startTime, endTime));

                    console.log('Solar System Factory done building in ' +  TimerUtil.getElapsedTime('ms', startTime, endTime) / 1000 + ' seconds.');
                });
            }
        };

        return SolarSystemBuilder;
    }
);