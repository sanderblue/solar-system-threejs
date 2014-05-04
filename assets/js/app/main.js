define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'SolarSystemFactory',
        'SunFactory',
        'PlanetFactory',
        'AstroidBeltFactory',
        'RingFactory',
        'Time'
    ],
    function($, Scene, SolarSystem, SolarSystemFactory, SunFactory, PlanetFactory, AstroidBeltFactory, RingFactory, TimeController) {

        var MainController = {
            animate: function() {
                requestAnimationFrame(MainController.animate);

                MainController.render();
                // Scene.stats.update();
            },

            positionPlanets: function() {
                var degreesToRadianRatio = 0.0174532925,
                    planets = Scene.planets,
                    count = 1
                ;

                for (var i = 0; i < planets.length; i++) {
                    var ms1 = new Date().getMilliseconds(),
                        dayOnEarth = TimeController.dayWithTimeAsDecimal
                    ;

                    // Mercury
                    if (i === 0) {
                        count = dayOnEarth + 48;
                    }

                    // Venus
                    if (i === 1) {
                        count = dayOnEarth + 155;
                    }

                    // Earth
                    if (i === 2) {
                        count = dayOnEarth;
                    }

                    // Mars
                    if (i === 3) {
                        count = dayOnEarth + 71;
                    }

                    // Jupiter
                    if (i === 4) {
                        count = dayOnEarth + 2692;
                    }

                    // Saturn
                    if (i === 5) {
                        count = dayOnEarth + 13753;
                    }

                    // Uranus
                    if (i === 6) {
                        count = dayOnEarth + 29654;
                    }

                    // Neptune
                    if (i === 7) {
                        count = dayOnEarth + 62885;
                    }

                    var posX = PlanetFactory.OrbitBuilder.getOrbitAmplitute(SolarSystem.planets[i].meanDistanceFromSun)
                                * Math.cos(
                                    count
                                    * PlanetFactory.OrbitBuilder.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    var posY = PlanetFactory.OrbitBuilder.getOrbitAmplitute(SolarSystem.planets[i].meanDistanceFromSun)
                                * Math.sin(
                                    count
                                    * PlanetFactory.OrbitBuilder.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    Scene.planets[i].rotation.y += 0.00041;

                    Scene.planets[i].position.set(
                        parseFloat(posX),
                        0,
                        parseFloat(posY)
                    );
                }

                Scene.Sun.rotation.y += 0.0003;
            },

            render: function() {
                Scene.camera.focalPoint = Scene.Sun.position;

                MainController.positionPlanets();
                Scene.renderer.render(Scene.scene, Scene.camera);
                Scene.setCameraPosition(Scene.camera.focalPoint);
            }
        };

        var Initializer = {
            checkBrowserCompatibility: function() {
                if (!Detector.webgl) {
                    Detector.addGetWebGLMessage();
                }
            },

            onWindowResize: function() {
                Scene.camera.aspect = window.innerWidth / window.innerHeight;
                Scene.camera.updateProjectionMatrix();

                Scene.renderer.setSize(window.innerWidth, window.innerHeight);
            },

            init: function() {
                this.checkBrowserCompatibility();

                $.when(Scene.init()).done(function() {
                    SolarSystemFactory.build();
                    // TimeController.startTime();

                    MainController.animate();
                });

                window.addEventListener('resize', this.onWindowResize, false);
            }
        };

        Initializer.init();
    }
);