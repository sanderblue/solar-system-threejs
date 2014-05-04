define(['jquery', 'Scene', 'SolarSystem', 'RingFactory', 'TimerUtil'], function($, Scene, SolarSystem, RingFactory, TimerUtil) {

    var PlanetFactory = {
        OrbitBuilder: {
            getOrbitAmplitute: function(distance) {
                return SolarSystem.parent.radius + distance * SolarSystem.orbitScale;
            },

            // Gets a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
            // This ratio helps create an accurate representation of each planet's location along its orbit circumference.
            getPlanetRadian: function(planet) {
                return 360 / planet.earthDaysToOrbitSun;
            },

            build: function(planet) {
                var resolution = 270; // segments in the line
                var size = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                        color: 0x6E6E6E,
                                        opacity: 0.1
                                    });

                var orbitLine = new THREE.Geometry();

                // Build the orbit line
                for(var i = 0; i <= resolution; i++) {
                    var segment = ( i * size ) * Math.PI / 180,
                        orbitAmplitude = PlanetFactory.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

                    orbitLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * orbitAmplitude,
                            0,
                            Math.sin(segment) * orbitAmplitude
                        )
                    );
                }
                var orbitLine = new THREE.Line(orbitLine, material);

                Scene.scene.add(orbitLine);
            }
        },

        buildRings: function(thisPlanet, planet) {
            return $.Deferred(function(promise) {
                var hasRings = Boolean(planet.rings.length);

                if (hasRings) {
                    var amplitudes = planet.rings;

                    for (var i = 0; i < amplitudes.length; i++) {
                        $.when(RingFactory.buildRing(amplitudes[i])).done(function(response) {
                            thisPlanet.add(response.line);
                        });
                    }

                    var promiseObject = {
                        planet: planet,
                        thisPlanet: thisPlanet
                    };

                    promise.resolve(promiseObject);

                } else {
                    var promiseObject = {
                        planet: planet,
                        thisPlanet: thisPlanet
                    };

                    promise.resolve(promiseObject);
                }
            });
        },

        getTexture: function(planet) {
            return new THREE.ImageUtils.loadTexture('../assets/textures/' + planet.name.toLowerCase() + '.jpg');
        },

        addMoons: function(planet) {
            return $.Deferred(function(promise) {

            });
        },

        build: function(planet) {
            return $.Deferred(function(promise) {
                var startTime = new Date().getTime();

                // Create our orbit line geometry first
                PlanetFactory.OrbitBuilder.build(planet);

                var thisPlanet = new THREE.Object3D({
                                    id: planet.id,
                                    name: planet.name
                                });

                var texture = PlanetFactory.getTexture(planet);

                var planetMaterial = new THREE.MeshLambertMaterial({
                                          ambient: 0xbbbbbb,
                                          map: texture,
                                          side: THREE.DoubleSide
                                        });

                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;

                texture.anisotropy = 16;

                thisPlanet = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    planet.diameter,
                                    200,
                                    120
                                ),
                                planetMaterial
                             );

                // Attempt at adding Saturns axis tilt
                if (planet.name == 'Saturn') {
                    var quaternion = new THREE.Quaternion();
                    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

                    var vector = new THREE.Vector3(10, 0, 0);
                    vector.applyQuaternion(quaternion);

                    thisPlanet.add(vector);
                }

                thisPlanet.name = planet.name;

                $.when(PlanetFactory.buildRings(thisPlanet, planet)).done(function(response) {
                    PlanetFactory.addPlanet(thisPlanet);

                    var posX = PlanetFactory.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

                    thisPlanet.position.set(
                        posX, // x
                        0,    // y
                        0     // z
                    );

                    PlanetFactory.addPlanet(thisPlanet);
                    Scene.planets.push(thisPlanet);

                    var endTime = new Date().getTime();

                    var builderStatement = 'Planet Factory done building ' + thisPlanet.name + ' in ' + TimerUtil.getElapsedTime('ms', startTime, endTime) + ' milliseconds';

                    console.log(builderStatement);

                    promise.resolve(thisPlanet);
                });
            });
        },

        addPlanet: function(planet) {
            Scene.scene.add(planet);
        }
    };

    return PlanetFactory;
});