define(
    [
        'Scene',
        'System'
    ],
    function(Scene, System) {

        var MoonFactory = {

            /**
             * Gets a moon's texture.
             *
             * @param moon [object]
             */
            getMoonTexture: function(moon) {
                var ImageUtils = THREE.ImageUtils;

                switch (moon.name) {
                    case 'Europa':
                        // console.log("Europa\n");
                        return ImageUtils.loadTexture('/textures/europa.jpg');
                        break;
                    case 'Titan':
                        // console.log("Titan\n");
                        return ImageUtils.loadTexture('/textures/moon.jpg');
                        break;
                    case 'Io':
                        // console.log("Io\n");
                        return ImageUtils.loadTexture('/textures/moon.jpg');
                        break;
                    case 'Iapetus':
                        // console.log("Iapetus\n");
                        return ImageUtils.loadTexture('/textures/moon.jpg');
                        break;
                    default:
                        return ImageUtils.loadTexture('/textures/moon.jpg');
                }
            },

            /**
             * Builds a moon and adds the moon to it's parent planet.
             *
             * @param parent    [object]
             * @param moon      [object]
             * @param planetObj [THREE object]
             */
            buildMoon: function(parent, moon, planetObj) {
                var texture =  MoonFactory.getMoonTexture(moon);

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                var material = new THREE.MeshLambertMaterial({ map: texture }),
                    widthSegments = 20,
                    heightSegments = 14
                ;

                if (moon.name == 'Europa') {
                    widthSegments = 42;
                    heightSegments = 42;
                }

                thisMoon = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    moon.radius,
                                    widthSegments,
                                    heightSegments
                                ),
                                material
                            );

                thisMoon.rotation.x    = parent.axialTilt;
                thisMoon.name          = moon.name;
                thisMoon.parent3d      = planetObj;
                thisMoon.parentliteral = parent;
                thisMoon.objectliteral = moon;

                Scene.moons.push(thisMoon);

                if (moon.name == 'Europa') {
                    Scene.majorMoons.push(thisMoon);
                }

                planetObj.add(thisMoon);
            }
        };

        return MoonFactory;
    }
);
