define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'RingFactory',
        'MoonFactory',
        'OrbitFactory',
        'TimerUtil',
        'TimeController',
        'Constants',
        'System'
    ],
    function($, Scene, SolarSystem, RingFactory, MoonFactory, OrbitFactory, TimerUtil, TimeController, Constants, System) {

        var factory = MoonFactory;

        var PlanetFactory = {
            /**
             * Gets a planet's texture.
             *
             * @param planet [object]
             */
            getTexture: function(planet) {
                var texturePath = '/textures/' + planet.name.toLowerCase() + '.jpg';

                return new THREE.ImageUtils.loadTexture(texturePath);
            },

            /**
             * Gets a planet's core texture (just some crust-like texture for now).
             */
            getCoreTexture: function() {
                var texturePath = '/textures/moon.jpg';

                return new THREE.ImageUtils.loadTexture(texturePath);
            },

            /**
             * Builds the could layer for earth.
             *
             * @param planet [THREE object]
             */
            buildEarthClouds: function(planet) {
                var geometry = new THREE.SphereGeometry(planet.radius + 2, planet.radius, 50);

                var material = new THREE.MeshPhongMaterial({
                    map         : THREE.ImageUtils.loadTexture('/textures/earth_clouds_fair2.png'),
                    transparent : true,
                    opacity     : 0.78,
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
                        factory.buildMoon(planet, planet.moons[i], planetObj);
                    }

                    promise.resolve();
                });
            },

            /**
             * Builds a planet's core.
             *
             * @param planet [THREE object]
             */
            getPlanetCore: function(planet, material) {
                var core = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), material);

                // We need to flip the core's axis
                core.rotation.x = Math.PI / 2;

                // Scene.planetCores.push(core);

                Scene.scene.add(core);

                return core;
            },

            /**
             * Builds a representation of a planet as a Three.js mesh based on the planet's data.
             *
             * @param planet            [object]
             * @param buildStatusPrompt [jQuery element]
             */
            build: function(planet, buildStatusPrompt) {
                return $.Deferred(function(promise) {
                    var startTime            = new Date().getTime(),
                        degreesToRadianRatio = 0.0174532925
                    ;

                    Scene.planetObjects.push(planet);

                    // Create our orbit line geometry first
                    OrbitFactory.build(planet);

                    var texture     = PlanetFactory.getTexture(planet),
                        coreTexture = PlanetFactory.getCoreTexture()
                    ;

                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;

                    var planetMaterial = new THREE.MeshPhongMaterial({ map: texture }),
                        coreMaterial   = new THREE.MeshPhongMaterial({ map: coreTexture })
                    ;

                    if (planet.name === 'Mercury' || planet.name === 'Venus' || planet.name === 'Earth' || planet.name === 'Mars') {
                        planetMaterial = new THREE.MeshPhongMaterial({
                            map       : THREE.ImageUtils.loadTexture('/textures/' + planet.name.toLowerCase() + '.jpg'),
                            bumpMap   : THREE.ImageUtils.loadTexture('/textures/' + planet.name.toLowerCase() + '_topo.jpg'),
                            bumpScale : 1.4
                        });
                    }

                    var widthSegments = planet.radius < 200 ? planet.radius + 50 : 200;

                    var thisPlanet = new THREE.Mesh(
                                        new THREE.SphereGeometry(
                                                planet.radius,
                                                widthSegments,
                                                110
                                            ),
                                            planetMaterial
                                        );

                    if (planet.name === 'Earth') {
                        var earthClouds   = PlanetFactory.buildEarthClouds(planet),
                            cloudCentroid = new THREE.Object3D()
                        ;

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
                                    coreMaterial
                                );

                    if (App.config.OrbitInclinationsEnabled) {
                        orbitCentroid.rotation.y = planet.inclination;
                    }

                    // thisPlanet.rotation.x = planet.axialTilt;
                    thisPlanet.rotation.x = planet.axialTilt;
                    thisPlanet.name       = planet.name;

                    var core = PlanetFactory.getPlanetCore(thisPlanet, coreMaterial);

                    orbitCentroid.add(core);
                    thisPlanet.core = core;

                    if (planet.name === 'Earth') {
                        var earthClouds  = PlanetFactory.buildEarthClouds(planet),
                            cloudCentroid = new THREE.Object3D()
                        ;

                        thisPlanet.cloudCentroid = cloudCentroid;

                        cloudCentroid.add(earthClouds);
                        thisPlanet.add(cloudCentroid);
                    }

                    PlanetFactory.addMoons(planet, thisPlanet).done(function() {
                        RingFactory.buildRings(thisPlanet, planet).done(function() {
                            var count = new Date().getDOYwithTimeAsDecimal() + TimeController.getTime();

                            var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, planet.distanceFromParent)
                                        * Math.cos(
                                            count
                                            * OrbitFactory.getOrbitRadian(planet)
                                            * degreesToRadianRatio
                                        );

                            var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, planet.distanceFromParent)
                                        * Math.sin(
                                            count
                                            * OrbitFactory.getOrbitRadian(planet)
                                            * degreesToRadianRatio
                                        );

                            thisPlanet.position.set(
                                parseFloat(posX),
                                parseFloat(posY),
                                0
                            );

                            PlanetFactory.addPlanet(thisPlanet, orbitCentroid);

                            thisPlanet.parent3d      = thisPlanet;
                            thisPlanet.parentliteral = parent;
                            thisPlanet.objectliteral = planet;

                            var endTime = new Date().getTime();
                            var builderStatement = 'Planet Factory done building ' + thisPlanet.name + ' in ' + TimerUtil.getElapsedTime(startTime, endTime, 'ms') + ' milliseconds';

                            System.log(builderStatement);

                            buildStatusPrompt.append('<div class="status-message">'+ builderStatement + '</div>');

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
