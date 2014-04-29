define([], function() {

    var SolarSystemBuilder = {
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
        }
    };

    return SolarSystemBuilder;
});