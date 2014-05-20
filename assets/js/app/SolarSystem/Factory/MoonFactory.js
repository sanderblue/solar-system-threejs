define(['jquery', 'Scene'], function($, Scene) {

    var MoonFactory = {
        getMoonTexture: function() {
            return new THREE.ImageUtils.loadTexture('../textures/moon.jpg');
        },

        buildMoon: function(planet, moon, index) {
            var thisMoon = new THREE.Object3D({
                                id: index,
                                name: moon.name
                            });

            var texture = PlanetBuilder.getMoonTexture();

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
                                moon.radius * 2,
                                10,
                                8
                            ),
                            material
                        );

            planet.add(thisMoon);

            thisMoon.position.x = 20;
        }
    };

    return MoonFactory;
});