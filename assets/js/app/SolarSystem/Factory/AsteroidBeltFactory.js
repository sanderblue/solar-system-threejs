define(
    [
        'Scene',
        'SolarSystem',
        'OrbitFactory',
        'Constants',
        'RandomNumber'
    ],
    function(Scene, SolarSystem, OrbitFactory, Constants, RandomNumber) {

        /**
         * AsteroidBeltFactory
         *
         * Builds the Solar System's Astroid Belt. The number of astroids to be rendered is set in
         * the SolarSystem object. Each astroid is randomly positioned within its orbit and between
         * the orbits of Mars and Jupiter.
         */
        var AsteroidBeltFactory = {

            /**
             * Gets a generic texture for an astroid.
             */
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('/textures/crust_tiny.jpg');
            },

            /**
             * Gets a random Vector3 object to create a random point
             *
             * @param radius   [float]
             * @return Vector3 [THREE object]
             */
            getRandomPointCoordinate: function(radius) {
                return new THREE.Vector3(
                    Math.random() * radius,
                    Math.random() * radius,
                    Math.random() * radius
                );
            },

            /**
             * Gets an astroid's current radian value based on each astroid's earth days to orbit the Sun.
             * This ratio helps create an accurate representation of each astroid's location along its orbit.
             */
            getAstroidRadian: function() {
                return 360 / SolarSystem.asteroidBelt.primary[0].orbitDuration; // Using Ceres as a reference point
            },

            /**
             * Builds the random points that create a unique shape for each astroid.
             * Each asteriod has a max radius of ~13 units.
             */
            buildRandomPoints: function() {
                var points = [];

                for (var i = 0; i < 5; i ++) {
                    var radius = (Math.random() * 1100) * SolarSystem.celestialScale + (i + 1.5);

                    points.push(AsteroidBeltFactory.getRandomPointCoordinate(radius));
                }

                return points;
            },

            /**
             * Positions an astroid within its orbit. The semi-major axis of each astroid's orbit is randomized to
             * distribute the astroids between the Mars and Jupiter orbits.
             *
             * @param astroid [THREE object]
             * @param count   [integer]
             */
            positionAstroid: function(astroid, count) {
                var amplitude = SolarSystem.asteroidBelt.distanceFromParent + RandomNumber.getRandomNumber() * 115; // randomize the amplitudes to spread them out

                var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
                    * Math.cos(count + 25 * Math.random()
                    * AsteroidBeltFactory.getAstroidRadian()
                    * Constants.degreesToRadiansRatio)
                ;

                var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
                    * Math.sin(count + 45 * Math.random()
                    * AsteroidBeltFactory.getAstroidRadian()
                    * Constants.degreesToRadiansRatio)
                ;

                astroid.position.set(
                    posX,
                    posY,
                    0
                );
            },

            /**
             * Builds a uniquely shaped astroid.
             *
             * @param index [integer]
             */
            buildAstroid: function(index) {
                return $.Deferred(function(promise) {
                    var randomPoints = AsteroidBeltFactory.buildRandomPoints(),
                        map          = AsteroidBeltFactory.getTexture()
                    ;

                    map.wrapS = map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 1;

                    var materials = [
                        new THREE.MeshLambertMaterial({ map: map }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 1 })
                    ];

                    // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
                    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), materials),
                        centroid = new THREE.Object3D(),
                        isOdd = index % 2,
                        offset = isOdd ? -1 : 1
                    ;

                    // Create a random orbit inclination to give the Asteroid Belt some "depth"
                    var orbitInclination = (Math.random() * RandomNumber.getRandomNumberWithinRange(1, 3) / 180 * Math.PI * 0.375) * offset;

                    centroid.rotation.x = orbitInclination;

                    centroid.add(object);

                    AsteroidBeltFactory.positionAstroid(object, index);
                    AsteroidBeltFactory.addAstroid(centroid);

                    Scene.astroids.push(object);

                    promise.resolve();
                });
            },

            /**
             * Builds the entire astroid belt based on the configured astroid count.
             */
            buildBelt: function() {
                var astroids = SolarSystem.asteroidBelt.count;

                for (var i = 0; i < astroids; i++) {
                    AsteroidBeltFactory.buildAstroid(i);
                }
            },

            /**
             * Adds an astroid to the scene.
             *
             * @param astroid [THREE object]
             */
            addAstroid: function(astroid) {
                Scene.scene.add(astroid);
            }
        };

        return AsteroidBeltFactory;
    }
);
