define(function() {

    /**
     * RingFactory
     *
     * Builds a planet's rings if present.
     */
    var RingFactory = {

        /**
         * Builds a planet's rings.
         *
         * @param thisPlanet [THREE object]
         * @param planet     [object]
         */
        buildRings: function(thisPlanet, planet) {
            return $.Deferred(function(promise) {
                var hasRings = Boolean(planet.rings.length);

                if (hasRings) {
                    var rings = planet.rings;

                    for (var i = 0; i < rings.length; i++) {
                        $.when(
                            RingFactory.buildRing(planet, rings[i])
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

        /**
         * Builds a single ring.
         *
         * @param planet [object]
         * @param ring   [object]
         */
        buildRing: function(planet, ring) {
            return $.Deferred(function(promise) {
                var resolution = 540, // segments in the line
                    size       = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                    color: ring.color,
                                    linewidth: ring.width * 0.00001,
                                    linejoin: 'round'
                                  });

                if (material.linewidth > 1) {
                    material.linewidth = 0.7;
                }

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * size) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * (ring.distanceFromParent + planet.radius),
                            Math.sin(segment) * (ring.distanceFromParent + planet.radius),
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
