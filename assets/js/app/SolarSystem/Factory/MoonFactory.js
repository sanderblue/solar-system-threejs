define(
    [
        'Scene',
        'System'
    ],
    function(Scene, System) {

        var MoonFactory = {
            /**
             * Gets a moon's texture. Currently only using one texture. I will eventually use
             * moon surface textures for the major moons of the Solar System, such as Europa and Titan.
             *
             * @param moon [object] // currently not required
             */
            getMoonTexture: function(moon) {
                return new THREE.ImageUtils.loadTexture('/textures/moon.jpg');
            },

            /**
             * Builds a moon and adds the moon to it's parent planet.
             *
             * @param parent    [object]
             * @param moon      [object]
             * @param planetObj [THREE object]
             */
            buildMoon: function(parent, moon, planetObj) {
                var texture = MoonFactory.getMoonTexture();

                var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xbbbbbb,
                                          map: texture
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

                thisMoon.parent3d      = planetObj;
                thisMoon.parentliteral = parent;
                thisMoon.objectliteral = moon;

                Scene.moons.push(thisMoon);

                planetObj.add(moonCentroid);
                moonCentroid.add(thisMoon);
            }
        };

        return MoonFactory;
    }
);
