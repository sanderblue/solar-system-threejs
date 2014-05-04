define(['Scene', 'SolarSystem'], function(Scene, SolarSystem) {
    var SunFactory = {
        getTexture: function() {
            return new THREE.ImageUtils.loadTexture('../assets/textures/sun_large.jpg');
        },
        build: function() {
            console.log('sdfsdf', SolarSystem);

            return $.Deferred(function(promise) {
                var texture = SunFactory.getTexture();

                var material = new THREE.MeshLambertMaterial({
                                      ambient: 0xffffff,
                                      emissive: 0xffffff,
                                      map: texture,
                                      side: THREE.DoubleSide,
                                      transparent: true,
                                      opacity: 0.9
                                    });

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.anisotropy = 32;

                var sunGeometry = new THREE.SphereGeometry(
                                        SolarSystem.parent.radius,
                                        SolarSystem.parent.radius / 3.5,
                                        SolarSystem.parent.radius / 7
                                    );

                var Sun = new THREE.Mesh(sunGeometry, material);

                var pointLight = new THREE.PointLight(0xffffff, 1.95);

                Sun.scale.x = Sun.scale.y = Sun.scale.z = 1;

                Scene.Sun = Sun;

                Sun.position.set(0, 0, 0);

                Scene.scene.add(pointLight);
                Scene.scene.add(Sun);
            });
        }
    };

    return SunFactory;
});