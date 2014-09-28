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
                var sceneRadius = (4503443661 * (1 * Math.pow(10, -4))) + 400000,
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
                                          shininess: 100
                                        });

                    var radius             = RandomNumber.getRandomNumberWithinRange(180, 330);
                        geometry           = new THREE.SphereGeometry(radius, 4, 2),
                        Star               = new THREE.Mesh(geometry, material),
                        randomizedPosition = StarFactory.getPosition(i)
                    ;

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
