define(['jquery', 'Scene', 'System', 'OrbitController'], function($, Scene, System, OrbitController) {

    var MoonFactory = {
        getMoonTexture: function(moon) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
            // return new THREE.ImageUtils.loadTexture('../assets/textures/'+ moon.name.toLowerCase() +'.jpg');
        },

        buildMoon: function(parent, moon, planetObj) {
            // System.log([planet, moon], false)

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
                                10,
                                8
                            ),
                            material
                        );

            var Controller = new OrbitController(thisMoon, moon, parent, { interval: 1 });

            if (App.config.moonOrbitsEnabled) {
                Controller.positionObject(thisMoon);
            }

            planetObj.add(thisMoon);
        }
    };

    return MoonFactory;
});