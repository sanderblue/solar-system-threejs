define(['Scene', 'SolarSystem', 'SunFactory', 'PlanetFactory', 'AstroidBeltFactory'], function(Scene, SolarSystem, SunFactory) {

    var SolarSystemBuilder = {
        buildParent: function() {
            return $.Deferred(function(promise) {

                SunFactory.build();

                promise.resolve();
            });
        },

        buildAstroidBelt: function() {
            return $.Deferred(function(promise) {
                AstroidBelt.buildBelt();

                promise.resolve();
            });
        },

        buildPlanets: function() {
            return $.Deferred(function(promise) {
                var promises = new Array();

                for (var i = 0; i < planets.length; i++) {
                    var planetBuildPromise = PlanetBuilder.build(planets[i]);

                    promises.push(planetBuildPromise);
                }

                promise.resolve(promises);
            });
        },

        build: function() {
            SolarSystemBuilder.buildParent();
        }
    };

    return SolarSystemBuilder;
});