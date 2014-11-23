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
         * Builds the distance stars in space. The star count is depicted in
         * the Solar System object.
         */
        var StarFactory = {

            starsCentriod: new THREE.Object3D({ name: 'stars_centriod' }),
            distanceFromCenter: (6850236100 * (1 * Math.pow(10, -3.87))) + 200000,

            getPosition: function(i) {
                var isSecond    = i % 2 == 0,
                    isThird     = i % 3 == 0,
                    isFourth    = i % 4 == 0,
                    x           = 0,
                    y           = 0,
                    z           = 0
                ;

                return RandomNumber.getRandomPointInSphere(StarFactory.distanceFromCenter, x, y, z);
            },

            buildStar: function(i) {
                return $.Deferred(function(promise) {
                    var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xffffff,
                                          emissive: 0xffffff,
                                          shininess: 10000
                                        });

                    var radius             = RandomNumber.getRandomNumberWithinRange(250, 450);
                        geometry           = new THREE.SphereGeometry(radius, 6, 3),
                        Star               = new THREE.Mesh(geometry, material),
                        randomizedPosition = StarFactory.getPosition(i)
                    ;

                    Star.position.set(
                        randomizedPosition.x,
                        randomizedPosition.y,
                        randomizedPosition.z
                    );

                    StarFactory.starsCentriod.add(Star);

                    promise.resolve();
                });
            },

            build: function() {
                var promises = [];

                return $.Deferred(function(promise) {
                    for (var i = 0; i < SolarSystem.stars.count; i++) {
                        promises.push(StarFactory.buildStar(i));
                    }

                    return $.when.apply($, promises).done(function() {
                        StarFactory.addStars();
                    });
                });
            },

            addStars: function() {
                Scene.scene.add(StarFactory.starsCentriod);
            }
        };

        return StarFactory;
    }
);
