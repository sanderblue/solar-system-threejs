define(['jquery', 'Scene'], function($, Scene) {

    var MoonFactory = {
        getMoonTexture: function(moon) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/moon.jpg');
            // return new THREE.ImageUtils.loadTexture('../assets/textures/'+ moon.name.toLowerCase() +'.jpg');
        },

        buildMoon: function(planet, moon, planetObj) {
            var thisMoon = new THREE.Object3D({
                                name: moon.name
                            });

            console.log(planet, moon)

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

            planetObj.add(thisMoon);

            thisMoon.position.x = planet.radius + moon.distanceFromParent;
        }
    };

    return MoonFactory;
});