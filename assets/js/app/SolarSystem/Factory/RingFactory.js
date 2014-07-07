define(function() {

    var RingFactory = {
        buildRings: function(thisPlanet, planet) {
            return $.Deferred(function(promise) {
                var hasRings = Boolean(planet.rings.length);

                if (hasRings) {
                    var rings = planet.rings;

                    for (var i = 0; i < rings.length; i++) {
                        $.when(
                            RingFactory.buildRing(planet, rings[i].distanceFromParent)
                        )
                        .done(function(response) {
                            response.centroid.add(response.line);

                            thisPlanet.add(response.centroid);
                        });
                    }

                    var promiseObject = {
                        planet: planet,
                        thisPlanet: thisPlanet
                    };

                    promise.resolve(promiseObject);

                } else {
                    var promiseObject = {
                        planet: planet,
                        thisPlanet: thisPlanet
                    };

                    promise.resolve(promiseObject);
                }
            });
        },

        buildRing: function(planet, amplitude) {
            return $.Deferred(function(promise) {
                var resolution = 540, // segments in the line
                    size       = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                    color: 0x353535,
                                    linewidth: 0.7
                                  });

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * size) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * (amplitude + planet.radius),
                            Math.sin(segment) * (amplitude + planet.radius),
                            0
                        )
                    );
                }

                var ringLine = new THREE.Line(ringLine, material);

                var ringCentroid = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    1,
                                    1,
                                    1
                                ),
                                material
                            );

                ringCentroid.rotation.x = planet.axialTilt;

                // We need to flip the planet's ring axis so the text renders as a vertical canvas
                // ringLine.rotation.x = Math.PI / 2;

                var responseObject = {
                    line: ringLine,
                    centroid: ringCentroid
                };

                promise.resolve(responseObject);
            });
        }
    };

    return RingFactory;
});
