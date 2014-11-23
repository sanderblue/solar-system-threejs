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

            asteroidBelt: new THREE.Object3D({ name: 'asteroid_belt_centroid' }),

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
             * Each asteroid has a max radius of ~13 units.
             */
            buildRandomPoints: function() {
                var points = [];

                for (var i = 0; i < 8; i ++) {
                    var radius = (Math.random() * 6000) * SolarSystem.celestialScale + (i + 1.9);

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
            buildAstroid: function(index, addBelt) {
                return $.Deferred(function(promise) {
                    var randomPoints = AsteroidBeltFactory.buildRandomPoints(),
                        texture      = AsteroidBeltFactory.getTexture()
                    ;

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.anisotropy = 1;

                    // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
                    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), [new THREE.MeshLambertMaterial({ map: texture })]),
                        centroid = new THREE.Object3D(),
                        isOdd = index % 2,
                        offset = isOdd ? -1 : 1
                    ;

                    // Create a random orbit inclination to give the Asteroid Belt some "depth"
                    var orbitInclination = (Math.random() * RandomNumber.getRandomNumberWithinRange(1, 5) / 150) * offset;

                    centroid.rotation.x = orbitInclination;
                    centroid.add(object);

                    AsteroidBeltFactory.positionAstroid(object, index);
                    AsteroidBeltFactory.addAstroid(centroid);

                    Scene.astroids.push(object);

                    if (addBelt) {
                        AsteroidBeltFactory.addAstroidBelt();
                    }

                    promise.resolve();
                });
            },

            /**
             * Builds the entire astroid belt based on the configured astroid count.
             */
            buildBelt: function() {
                for (var i = 0; i < SolarSystem.asteroidBelt.count; i++) {
                    if (i === SolarSystem.asteroidBelt.count - 1) {
                        AsteroidBeltFactory.buildAstroid(i, true);
                    }

                    AsteroidBeltFactory.buildAstroid(i, false);
                }
            },

            /**
             * Adds an astroid to the scene.
             *
             * @param astroid [THREE object]
             */
            addAstroid: function(astroid) {
                AsteroidBeltFactory.asteroidBelt.add(astroid);
            },

            addAstroidBelt: function() {
                Scene.asteroidBelt = AsteroidBeltFactory.asteroidBelt;
                Scene.scene.add(AsteroidBeltFactory.asteroidBelt);
            }
        };

        return AsteroidBeltFactory;
    }
);
