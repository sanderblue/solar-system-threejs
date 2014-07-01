define(['jquery', 'Scene', 'System', 'OrbitController'], function($, Scene, System, OrbitController) {

    var MoonFactory = {
        getMoonTexture: function(moon) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
        },

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
                                16,
                                9
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

            moonCentroid.rotation.x = moon.axisTilt;

            // console.log(thisMoon, moonCentroid)

            var Controller = new OrbitController(thisMoon, moon, parent, { interval: 1 });

            if (App.config.moonOrbitsEnabled) {
                Controller.positionObject(thisMoon);
            }

            planetObj.add(moonCentroid);
            moonCentroid.add(thisMoon);
        }
    };

    return MoonFactory;
});
