define(
    [
        'Scene',
        'System',
        'OrbitController'
    ],
    function(Scene, System, OrbitController) {

        var MoonFactory = {
            /**
             * Gets a moon's texture. Currently only using one texture. I will eventually use
             * moon surface textures for the major moons of the Solar System, such as Europa and Titan.
             *
             * @param moon [object] // currently not required
             */
            getMoonTexture: function(moon) {
                return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
            },

            /**
             * Builds a moon and adds the moon to it's parent planet.
             *
             * @param parent       [THREE object]
             * @param moon         [object]
             * @param planetObject [onject]
             */
            buildMoon: function(parent, moon, planetObj) {
                var texture = MoonFactory.getMoonTexture();

                var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xbbbbbb,
                                          map: texture,
                                          side: THREE.DoubleSide
                                        });

                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;

                texture.anisotropy = 5;

                thisMoon = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    moon.radius,
                                    24,
                                    17
                                ),
                                material
                            );

                var moonCentroid = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    1,
                                    1,
                                    1
                                ),
                                material
                            );

                moonCentroid.rotation.x = moon.inclination;

                var MoonController = new OrbitController(thisMoon, moon, parent, { interval: 1 });

                if (App.config.moonOrbitsEnabled) {
                    MoonController.positionObject(thisMoon);
                }

                console.log('MOON');

                planetObj.add(moonCentroid);
                moonCentroid.add(thisMoon);
            }
        };

        return MoonFactory;
    }
);
