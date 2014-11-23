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
                var texture =  MoonFactory.getMoonTexture();

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                var material = new THREE.MeshLambertMaterial({ map: texture });

                thisMoon = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    moon.radius,
                                    24,
                                    12
                                ),
                                material
                            );

                thisMoon.rotation.x    = parent.axialTilt;
                thisMoon.name          = moon.name;
                thisMoon.parent3d      = planetObj;
                thisMoon.parentliteral = parent;
                thisMoon.objectliteral = moon;

                Scene.moons.push(thisMoon);

                planetObj.add(thisMoon);
            }
        };

        return MoonFactory;
    }
);
