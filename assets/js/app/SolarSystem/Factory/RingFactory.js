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
                if (!planet.rings.length) {
                    return promise.resolve();
                }

                for (var i = 0; i < planet.rings.length; i++) {
                    RingFactory.buildRing(planet, planet.rings[i], thisPlanet);

                    if (planet.rings[i].subRings && planet.rings[i].subRings.length) {
                        for (var n = 0; n < planet.rings[i].subRings.length; n++) {
                            RingFactory.buildSubRing(planet, planet.rings[i].subRings[n], thisPlanet);
                        }
                    }
                }

                promise.resolve();
            });
        },

        /**
         * Builds a single ring.
         *
         * @param planet     [object]
         * @param ring       [object]
         * @param thisPlanet [THREE object]
         */
        buildRing: function(planet, ring, thisPlanet) {
            return $.Deferred(function(promise) {
                var resolution = 720, // segments in the line
                    length     = 360 / resolution
                ;

                var material = new THREE.LineBasicMaterial({
                                    color: ring.color,
                                    linewidth: 0.1,
                                    linejoin: 'round'
                                  });

                if (material.linewidth > 1) {
                    material.linewidth = 0.7;

                    if (planet.name === 'Jupiter') {
                        material.linewidth = 0.1;
                    }
                }

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * length) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * (ring.distanceFromParent + planet.radius),
                            Math.sin(segment) * (ring.distanceFromParent + planet.radius),
                            0
                        )
                    );
                }

                var ringLine = new THREE.Line(ringLine, material);

                ringLine.rotation.x = Math.PI / 2;

                thisPlanet.add(ringLine);

                promise.resolve();
            });
        },

        buildSubRing: function(planet, ring, thisPlanet) {
            return $.Deferred(function(promise) {
                var resolution = 720, // segments in the line
                    length     = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                    color: ring.color,
                                    linewidth: ring.width * 0.00001,
                                    linejoin: 'round'
                                  });

                if (material.linewidth > 1) {
                    material.linewidth = 0.7;

                    if (planet.name === 'Jupiter') {
                        material.linewidth = material.linewidth - 0.3;
                    }
                }

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * length) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * (ring.distanceFromParent + planet.radius),
                            Math.sin(segment) * (ring.distanceFromParent + planet.radius),
                            0
                        )
                    );
                }

                var ringLine = new THREE.Line(ringLine, material);

                ringLine.rotation.x = Math.PI / 2;

                thisPlanet.add(ringLine);

                promise.resolve();
            });
        }
    };

    return RingFactory;
});
