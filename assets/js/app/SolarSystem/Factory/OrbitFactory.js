define(
    [
        'Scene',
        'SolarSystem'
    ],
    function(Scene, SolarSystem) {

        var OrbitFactory = {

            /**
             * Returns a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
             * This ratio helps create an accurate representation of each planet's location along its orbit circumference.
             *
             * @param planet [Object]
             * @return float
             */
            getPlanetRadian: function(planet) {
                return 360 / planet.orbitDuration;
            },

            /**
             * Returns a planet's mean orbit amplitude (distance from the surface of the sun).
             *
             * @param distance [Integer]
             * @return float [semi-major axis]
             */
            getOrbitAmplitute: function(distance) {
                return SolarSystem.parent.radius + distance;
            },

            /**
             * Builds a planet's orbit line (for display purposes only).
             *
             * @param planet [Object]
             */
            build: function(planet) {
                var resolution = 540, // segments in the line
                    size       = 360 / resolution
                ;

                var material = new THREE.LineBasicMaterial({
                                        color: 0x848484,
                                        linewidth: 0.5
                                    });

                var orbitLine = new THREE.Geometry();

                // Build the orbit line
                for(var i = 0; i <= resolution; i++) {
                    var segment = ( i * size ) * Math.PI / 180,
                        orbitAmplitude = OrbitFactory.getOrbitAmplitute(planet.distanceFromParent);

                    orbitLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * orbitAmplitude,
                            Math.sin(segment) * orbitAmplitude,
                            0
                        )
                    );
                }

                var orbitLine = new THREE.Line(orbitLine, material);

                orbitLine.rotation.y = planet.inclination;

                Scene.scene.add(orbitLine);
            }
        };

        return OrbitFactory;
    }
);
