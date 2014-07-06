define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'RingFactory',
        'MoonFactory',
        'OrbitFactory',
        'TimerUtil',
        'System'
    ],
    function($, Scene, SolarSystem, RingFactory, MoonFactory, OrbitFactory, TimerUtil, System) {

        var PlanetFactory = {
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
                var texturePath = '../assets/textures/' + planet.name.toLowerCase() + '.jpg';

                return new THREE.ImageUtils.loadTexture(texturePath);
            },

            addMoons: function(planet, planetObj) {
                return $.Deferred(function(promise) {
                    for (var i = 0; i < planet.moons.length; i++) {
                        MoonFactory.buildMoon(planet, planet.moons[i], planetObj);
                    }

                    promise.resolve();
                });
            },

            /**
             * Builds a planet's core.
             *
             * @param planet [THREE Object]
             */
            buildCore: function(planet) {
                var texture = new THREE.ImageUtils.loadTexture('../assets/textures/crust_tiny.jpg');

                texture.wrapS      = THREE.RepeatWrapping;
                texture.wrapT      = THREE.RepeatWrapping;
                texture.anisotropy = 4;

                var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xbbbbbb,
                                          map: texture,
                                          side: THREE.DoubleSide
                                        });

                var core = new THREE.Object3D();

                core.name = planet.name;

                // We need to flip the core's axis
                core.rotation.x = Math.PI / 2;

                Scene.planetCores.push(core);

                Scene.scene.add(core);
            },

            /**
             * Builds a representation of a planet as a Three.js mesh based on a planet's data.
             *
             * @param planet [Object]
             */
            build: function(planet) {
                return $.Deferred(function(promise) {
                    var startTime            = new Date().getTime(),
                        degreesToRadianRatio = 0.0174532925
                    ;

                    // Create our orbit line geometry first
                    OrbitFactory.build(planet);

                    var thisPlanet = new THREE.Object3D({
                                        id: planet.id,
                                        name: planet.name
                                    });

                    var texture = PlanetFactory.getTexture(planet);

                    texture.wrapS      = THREE.RepeatWrapping;
                    texture.wrapT      = THREE.RepeatWrapping;
                    texture.anisotropy = 4;

                    var planetMaterial = new THREE.MeshLambertMaterial({
                                              ambient: 0xbbbbbb,
                                              map: texture,
                                              side: THREE.DoubleSide
                                            });

                    thisPlanet = new THREE.Mesh(
                                new THREE.SphereGeometry(
                                        planet.radius,
                                        200,
                                        120
                                    ),
                                    planetMaterial
                                 );

                    var orbitCentroid = new THREE.Mesh(
                                new THREE.SphereGeometry(
                                        1,
                                        1,
                                        1
                                    ),
                                    planetMaterial
                                );

                    orbitCentroid.rotation.y = planet.inclination;

                    // We need to flip the planet's axis so the text renders as a vertical canvas
                    thisPlanet.rotation.x = Math.PI / 2;
                    thisPlanet.name       = planet.name;

                    if (planet.name === 'Saturn') {
                        thisPlanet.rotation.z = degreesToRadianRatio * 12;
                    }

                    PlanetFactory.buildCore(thisPlanet);

                    $.when(PlanetFactory.addMoons(planet, thisPlanet)).done(function() {
                        $.when(PlanetFactory.buildRings(thisPlanet, planet)).done(function(response) {
                            var posX = OrbitFactory.getOrbitAmplitute(planet.distanceFromParent);

                            thisPlanet.position.set(
                                posX, // x
                                0,    // y
                                0     // z
                            );

                            PlanetFactory.addPlanet(thisPlanet, orbitCentroid);

                            Scene.planets.push(thisPlanet);

                            var endTime = new Date().getTime();

                            var builderStatement = 'Planet Factory done building ' + thisPlanet.name + ' in ' + TimerUtil.getElapsedTime('ms', startTime, endTime) + ' milliseconds';

                            System.log(builderStatement);

                            promise.resolve(thisPlanet);
                        });
                    });
                });
            },

            addPlanet: function(planet, orbitCentroid) {
                Scene.scene.add(orbitCentroid);
                orbitCentroid.add(planet);
            }
        };

        return PlanetFactory;
    }
);
