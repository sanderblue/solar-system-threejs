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
             * @param object [object]
             * @return float
             */
            getOrbitRadian: function(object) {
                return 360 / object.orbitDuration;
            },

            /**
             * Returns a planet's mean orbit amplitude (distance from the surface of the sun [semi-major axis]).
             *
             * @param parent   [object]
             * @param distance [integer]
             * @return float   [semi-major axis]
             */
            getOrbitAmplitute: function(parent, distance) {
                return parent.radius + distance;
            },

            /**
             * Builds a planet's orbit line (for display purposes only).
             *
             * @param planet [object]
             */
            build: function(planet) {
                if (planet.name === 'Ceres') {
                    return;
                }

                var resolution = 1080, // segments in the line
                    length     = 360 / resolution,
                    material   = new THREE.LineBasicMaterial({ color: 0x3f3f3f, linewidth: 0.1 }),
                    orbitLine  = new THREE.Geometry()
                ;

                // Build the orbit line
                for(var i = 0; i <= resolution; i++) {
                    var segment = ( i * length ) * Math.PI / 180,
                        orbitAmplitude = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, planet.distanceFromParent)
                    ;

                    orbitLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * orbitAmplitude,
                            Math.sin(segment) * orbitAmplitude,
                            0
                        )
                    );
                }

                var orbitLine = new THREE.Line(orbitLine, material);

                if (App.config.OrbitInclinationsEnabled) {
                    orbitLine.rotation.y = planet.inclination;
                }

                Scene.scene.add(orbitLine);
            }
        };

        return OrbitFactory;
    }
);
