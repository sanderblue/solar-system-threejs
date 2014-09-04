define(
    [
        'jquery',
        'App',
        'Scene',
        'Initializer',
        'UIController',
        'PlanetFactory',
        'OrbitFactory',
        'SolarSystem',
        'TimeController',
        'OrbitController',
        'Modules'
    ],
    function(
        $,
        App,
        Scene,
        Initializer,
        UIController,
        PlanetFactory,
        OrbitFactory,
        SolarSystem,
        TimeController,
        OrbitController
    )
    {
        /**
         * MainController
         *
         * This object is responsible for positioning the planets and animating the scene.
         */
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
                    var dayOnEarth = 1;

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

                        // Rotates the cloud layer independently from the Earth surface
                        Scene.planets[i].cloudCentroid.rotation.y += 0.00018;
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

                    var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, SolarSystem.planets[i].distanceFromParent)
                                * Math.cos(
                                    count
                                    * OrbitFactory.getOrbitRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, SolarSystem.planets[i].distanceFromParent)
                                * Math.sin(
                                    count
                                    * OrbitFactory.getOrbitRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    // Scene.planets[i].rotation.y += 0.0006;

                    Scene.planetCores[i].position.set(
                        parseFloat(posX),
                        parseFloat(posY),
                        0
                    );

                    Scene.planets[i].position.set(
                        parseFloat(posX),
                        parseFloat(posY),
                        0
                    );

                    if (i === 2) {
                        Scene.setCameraFocalPoint(Scene.planets[i].position);
                    }
                }

                // Scene.Sun.rotation.y += 0.00025;
            },

            positionMoons: function() {
                var degreesToRadianRatio = 0.0174532925,
                    moons = Scene.moons
                ;

                for (var i = 0; i < moons.length; i++) {
                    var moon = moons[i];

                    var OrbitCtrl = new OrbitController(moon, moon.objectliteral, moon.parentliteral, { interval: 100 });

                    OrbitCtrl.positionObject();
                }
            },

            render: function() {
                Scene.renderer.render(Scene.scene, Scene.camera);
            },

            init: function() {
                UIController.init();

                $.when(Initializer.init()).done(function() {
                    if (Scene.planets.length) {
                        MainController.positionPlanets();
                    }

                    if (Scene.moons.length) {
                        MainController.positionMoons();
                    }

                    MainController.animate();
                });
            }
        };

        MainController.init();
    }
);
