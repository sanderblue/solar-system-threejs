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
         * AstroidBeltFactory
         *
         * Builds the Solar System's Astroid Belt. The number of astroids to be rendered is set in
         * the SolarSystem object. Each astroid is randomly positioned within its orbit and between
         * the orbits of Mars and Jupiter.
         */
        var AstroidBeltFactory = {

            /**
             * Gets a generic texture for an astroid.
             */
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('../assets/textures/crust_tiny.jpg');
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
                return 360 / SolarSystem.astroidBelt.primary[0].orbitDuration; // Using Ceres as a reference point
            },

            /**
             * Builds the random points that create a unique shape for each astroid.
             */
            buildRandomPoints: function() {
                var points = [];

                for (var i = 0; i < 7; i ++) {
                    var radius = (Math.random() + 1150) * SolarSystem.celestialScale;

                    points.push(AstroidBeltFactory.getRandomPointCoordinate(radius));
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
                var amplitude = SolarSystem.astroidBelt.distanceFromParent + RandomNumber.getRandomNumber() * 65; // randomize the amplitudes to spread them out

                var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
                            * Math.cos(count + 25 * Math.random()
                            * AstroidBeltFactory.getAstroidRadian()
                            * Constants.degreesToRadianRatio);

                var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
                            * Math.sin(count + 45 * Math.random()
                            * AstroidBeltFactory.getAstroidRadian()
                            * Constants.degreesToRadianRatio);

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
                    var randomPoints = AstroidBeltFactory.buildRandomPoints();

                    var map = AstroidBeltFactory.getTexture();

                    map.wrapS = map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 2;

                    var materials = [
                        new THREE.MeshLambertMaterial({ ambient: 0xbbbbbb, map: map }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 })
                    ];

                    // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
                    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), materials);

                    AstroidBeltFactory.positionAstroid(object, index);
                    AstroidBeltFactory.addAstroid(object);

                    Scene.astroids.push(object);

                    promise.resolve(object);
                });
            },

            /**
             * Builds the entire astroid belt based on the configured astroid count.
             */
            buildBelt: function() {
                var astroids = SolarSystem.astroidBelt.count;

                for (var i = 0; i < astroids; i++) {
                    AstroidBeltFactory.buildAstroid(i);
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

        return AstroidBeltFactory;
    }
);
