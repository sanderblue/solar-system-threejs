define(
    [
        'jquery',
        'App',
        'Scene',
        'Initializer',
        'PlanetFactory',
        'OrbitFactory',
        'SolarSystem',
        'TimeController',
        'OrbitController',
        'Modules',
        'tweenjs'
    ],
    function(
        $,
        App,
        Scene,
        Initializer,
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

                if (!TimeController.isPaused) {
                    MainController.animatePlanetRotations();
                }
                // Scene.stats.update();

                // if (window.focalPointObject) {
                //     Scene.setCameraFocalPoint(window.focalPointObject.position);
                // } else {
                //     Scene.setCameraFocalPoint(window.focalPoint);
                // }
            },

            animatePlanetRotations: function() {
                for (var i = 0; i < Scene.planets.length; i++) {
                    Scene.planets[i].rotation.y += 0.0006;
                    Scene.planets[i].core.rotation.y -= 0.00009;
                }

                MainController.positionPlanets();
            },

            positionPlanets: function() {
                var degreesToRadianRatio = 0.0174532925,
                    planets = Scene.planets,
                    count = new Date().getDOYwithTimeAsDecimal() + TimeController.getTime()
                ;

                for (var i = 0; i < planets.length; i++) {
                    var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, SolarSystem.planets[i].distanceFromParent)
                                * Math.cos(
                                    parseFloat(Number(count + SolarSystem.planets[i].orbitPositionOffset).toFixed(5))
                                    * OrbitFactory.getOrbitRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, SolarSystem.planets[i].distanceFromParent)
                                * Math.sin(
                                    parseFloat(Number(count + SolarSystem.planets[i].orbitPositionOffset).toFixed(5))
                                    * OrbitFactory.getOrbitRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    Scene.planets[i].core.position.set(
                        parseFloat(Number(posX).toFixed(4)),
                        parseFloat(Number(posY).toFixed(4)),
                        0
                    );

                    Scene.planets[i].position.set(
                        parseFloat(Number(posX).toFixed(4)),
                        parseFloat(Number(posY).toFixed(4)),
                        0
                    );
                }

                // if (window.focalPointObject) {
                //     Scene.setCameraFocalPoint(window.focalPointObject.position);
                // } else {
                //     Scene.setCameraFocalPoint(window.focalPoint);
                // }
            },

            positionMoons: function() {
                var degreesToRadianRatio = 0.0174532925,
                    moons = Scene.moons
                ;

                for (var i = 0; i < moons.length; i++) {
                    var moon = moons[i];

                    var OrbitCtrl = new OrbitController(moon, moon.objectliteral, moon.parentliteral, { interval: 10 });

                    OrbitCtrl.positionObject();
                    OrbitCtrl.animateOrbit();
                }
            },

            render: function() {
                if (App.config.build.SunFactoryEnabled) {
                    Scene.Sun.rotation.y += 0.00029;
                }

                TWEEN.update();

                Scene.renderer.render(Scene.scene, Scene.camera);
            },

            renderSolarSystem: function() {
                MainController.positionPlanets();
                MainController.positionMoons();
                MainController.animate();
            },

            init: function() {
                Initializer.init(MainController);
            }
        };

        MainController.init();
    }
);
