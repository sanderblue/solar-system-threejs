define(
    [
        'Scene',
        'SolarSystem',
        'RandomNumber'
    ],
    function(Scene, SolarSystem, RandomNumber) {

        /**
         * StarFactory
         *
         * Builds the distance stars in space. The number of stars to be rendered is set in the SolarSystem object.
         *
         * Note: This is currently not being used due to performance issues. I will be optimizing this in hopes of creating
         *       a true 3d array of stars.
         */
        var StarFactory = {
            getPosition: function(i) {
                var sceneRadius = 40000,
                    isSecond    = i % 2 == 0,
                    isThird     = i % 3 == 0,
                    isFourth    = i % 4 == 0,
                    x           = 0,
                    y           = 0,
                    z           = 0
                ;

                return RandomNumber.getRandomPointInSphere(sceneRadius, x, y, z);
            },

            buildStar: function(i) {
                return $.Deferred(function(promise) {
                    var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xffffff,
                                          emissive: 0xffffff,
                                          side: THREE.DoubleSide,
                                          transparent: true,
                                          opacity: 1
                                        });

                    var geometry  = new THREE.SphereGeometry(30, 1, 1);
                    var Star      = new THREE.Mesh(geometry, material);
                    var Starlight = new THREE.PointLight(0xffffff, 10);

                    var randomizedPosition = StarFactory.getPosition(i);

                    console.log(randomizedPosition);

                    Star.add(Starlight);

                    Star.position.set(
                        randomizedPosition.x,
                        randomizedPosition.y,
                        randomizedPosition.z
                    );

                    Scene.scene.add(Star);

                    promise.resolve();
                });
            },

            build: function() {
                var promises = [];

                return $.Deferred(function(promise) {
                    for (var i = 0; i < SolarSystem.stars.count; i++) {
                        promises.push(StarFactory.buildStar(i));
                    }


                    return $.when.apply($, promises).done();
                });
            }
        };

        return StarFactory;
    }
);
