define(
    [
        'Scene',
        'SolarSystem'
    ],
    function(Scene, SolarSystem) {

        var SunFactory = {
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('../assets/textures/sun_detailed.png');
            },

            build: function() {
                return $.Deferred(function(promise) {
                    var texture = SunFactory.getTexture();

                    var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xffffff,
                                          emissive: 0xffffff,
                                          map: texture,
                                          side: THREE.DoubleSide,
                                          transparent: true,
                                          opacity: 1
                                        });

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.anisotropy = 32;

                    var sunGeometry = new THREE.SphereGeometry(
                                            SolarSystem.parent.radius,
                                            160,
                                            100
                                        );

                    var Sun = new THREE.Mesh(sunGeometry, material);

                    var pointLight = new THREE.PointLight(0xffffff, 1.2);

                    Sun.scale.x = Sun.scale.y = Sun.scale.z = 1;

                    // Flip axis
                    Sun.rotation.x = Math.PI / 2;

                    Sun.position.set(0, 0, 0);

                    Scene.Sun = Sun;

                    Scene.scene.add(pointLight);
                    Scene.scene.add(Sun);
                });
            }
        };

        return SunFactory;
    }
);
