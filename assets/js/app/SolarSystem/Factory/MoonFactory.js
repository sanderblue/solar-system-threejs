define(['jquery', 'Scene', 'System', 'OrbitController'], function($, Scene, System, OrbitController) {

    var MoonFactory = {
        getMoonTexture: function(moon) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
            // return new THREE.ImageUtils.loadTexture('../assets/textures/'+ moon.name.toLowerCase() +'.jpg');
        },

        buildMoon: function(planet, moon, planetObj) {
            var Controller = new OrbitController();
            var thisMoon = new THREE.Object3D({
                                name: moon.name
                            });

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

            Controller.positionObject(thisMoon, planetObj);

            thisMoon.position.x = planet.radius + moon.distanceFromParent;
            thisMoon.rotation.x = planet.radius + moon.distanceFromParent * Math.PI / 3;

            planetObj.add(thisMoon);
        }
    };

    return MoonFactory;
});