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
            /**
             * Gets a planet's texture.
             *
             * @param planet [object]
             */
            getTexture: function(planet) {
                var texturePath = '../assets/textures/' + planet.name.toLowerCase() + '.jpg';

                return new THREE.ImageUtils.loadTexture(texturePath);
            },

            /**
             * Builds the could layer for earth.
             *
             * @param planet [THREE object]
             */
            buildEarthClouds: function(planet) {
                var geometry    = new THREE.SphereGeometry(planet.radius + 1.11, 100, 70);

                var material    = new THREE.MeshPhongMaterial({
                    map         : THREE.ImageUtils.loadTexture('../assets/textures/earth_clouds_fair2.png'),
                    side        : THREE.DoubleSide,
                    transparent : true,
                    opacity     : 0.9,
                });

                return new THREE.Mesh(geometry, material);
            },

            /**
             * Adds a planet's moons.
             *
             * @param planet    [object]
             * @param planetObj [THREE object]
             */
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
             * @param planet [THREE object]
             */
            buildCore: function(planet) {
                var core = new THREE.Object3D();

                core.name = planet.name;

                // We need to flip the core's axis
                core.rotation.x = Math.PI / 2;

                Scene.planetCores.push(core);

                Scene.scene.add(core);
            },

            /**
             * Builds a representation of a planet as a Three.js mesh based on the planet's data.
             *
             * @param planet [object]
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

                    var planetMaterial = new THREE.MeshPhongMaterial({
                                              ambient: 0xbbbbbb,
                                              map: texture,
                                              side: THREE.DoubleSide
                                            });

                    if (planet.name === 'Mercury' || planet.name === 'Venus' || planet.name === 'Earth' || planet.name === 'Mars') {
                        planetMaterial = new THREE.MeshPhongMaterial({
                            ambient     : 0xbbbbbb,
                            map         : THREE.ImageUtils.loadTexture('../assets/textures/' + planet.name.toLowerCase() + '.jpg'),
                            bumpMap     : THREE.ImageUtils.loadTexture('../assets/textures/' + planet.name.toLowerCase() + '_topo.jpg'),
                            bumpScale   : 1.4,
                            // specular    : new THREE.Color('grey'),
                        });
                    }

                    thisPlanet = new THREE.Mesh(
                                new THREE.SphereGeometry(
                                        planet.radius,
                                        200,
                                        120
                                    ),
                                    planetMaterial
                                 );

                    if (planet.name === 'Earth') {
                        var earthClouds  = PlanetFactory.buildEarthClouds(planet);

                        var cloudCentroid = new THREE.Object3D();

                        cloudCentroid.add(earthClouds);

                        thisPlanet.cloudCentroid = cloudCentroid;

                        thisPlanet.add(cloudCentroid);
                    }

                    Scene.planets.push(thisPlanet);

                    planet.threeId = thisPlanet.id;

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
                    // thisPlanet.rotation.x = planet.axialTilt;
                    thisPlanet.rotation.x = Math.PI / 2;
                    thisPlanet.name       = planet.name;

                    PlanetFactory.buildCore(thisPlanet);

                    if (planet.name === 'Earth') {
                        var earthClouds  = PlanetFactory.buildEarthClouds(planet);

                        var cloudCentroid = new THREE.Object3D();

                        cloudCentroid.add(earthClouds);

                        thisPlanet.cloudCentroid = cloudCentroid;

                        thisPlanet.add(cloudCentroid);
                    }

                    $.when(PlanetFactory.addMoons(planet, thisPlanet)).done(function() {
                        $.when(RingFactory.buildRings(thisPlanet, planet)).done(function(response) {
                            var posX = OrbitFactory.getOrbitAmplitute(planet.distanceFromParent);

                            thisPlanet.position.set(
                                posX, // x
                                0,    // y
                                0     // z
                            );

                            PlanetFactory.addPlanet(thisPlanet, orbitCentroid);

                            var endTime = new Date().getTime();

                            var builderStatement = 'Planet Factory done building ' + thisPlanet.name + ' in ' + TimerUtil.getElapsedTime(startTime, endTime, 'ms') + ' milliseconds';

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
