define(
    [
        'Scene',
        'SolarSystem'
    ],
    function(Scene, SolarSystem) {

        var AstroidBelt = {
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('../assets/textures/crust_tiny.jpg');
            },

            getRandomPointInSphere: function(radius) {
                return new THREE.Vector3(
                    ( Math.random() - 0.5 ) * 1.55 * radius,
                    ( Math.random() - 0.5 ) * 1.55 * radius,
                    ( Math.random() - 0.5 ) * 1.55 * radius
                );
            },

            // Gets an astroid's current radian conversion ratio based on each astroid's earth days to orbit the Sun.
            // This ratio helps create an accurate representation of each astroid's location along its orbit.
            getAstroidRadian: function() {
                return 360 / SolarSystem.astroidBelt.primary[0].earthDaysToOrbitSun; // Using Ceres just as a reference point
            },

            getOrbitAmplitute: function(distance) {
                return SolarSystem.parent.radius + distance;
            },

            buildRandomPoints: function() {
                var points = [];

                for (var i = 0; i < 4; i ++) {
                    var radius = Math.random() * 2.33;

                    points.push(AstroidBelt.getRandomPointInSphere(radius));
                }

                return points;
            },

            positionAstroid: function(astroid, count) {
                var degreesToRadianRatio = 0.0174532925,
                    randomNumA = new Date().getMilliseconds() - (new Date().getMilliseconds() / 2.1),
                    randomNumB = Math.random() * randomNumA,
                    amplitude = SolarSystem.astroidBelt.meanDistanceFromSun + randomNumB // randomize the amplitudes to spread them out
                ;

                var posX = AstroidBelt.getOrbitAmplitute(amplitude)
                            * Math.cos(count + 50 * Math.random()
                            * AstroidBelt.getAstroidRadian()
                            * degreesToRadianRatio);

                var posY = AstroidBelt.getOrbitAmplitute(amplitude)
                            * Math.sin(count + 50 * Math.random()
                            * AstroidBelt.getAstroidRadian()
                            * degreesToRadianRatio);

                astroid.position.set(
                    posX,
                    0,
                    posY
                );
            },

            buildAstroid: function(index) {
                return $.Deferred(function(promise) {
                    var randomPoints = AstroidBelt.buildRandomPoints();

                    var map = AstroidBelt.getTexture();

                    map.wrapS = map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 2;

                    var materials = [
                        new THREE.MeshLambertMaterial({ ambient: 0xbbbbbb, map: map }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 })
                    ];

                    // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
                    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), materials);

                    AstroidBelt.positionAstroid(object, index);
                    AstroidBelt.addAstroid(object);

                    Scene.astroids.push(object);

                    promise.resolve(object);
                });
            },

            buildBelt: function() {
                var astroids = SolarSystem.astroidBelt.totalCount;

                for (var i = 0; i < astroids; i++) {
                    AstroidBelt.buildAstroid(i);
                }
            },

            addAstroid: function(astroid) {
                Scene.scene.add(astroid);
            }
        };

        return AstroidBelt;
    }
);