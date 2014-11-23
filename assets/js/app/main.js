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
        'Constants',
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
        OrbitController,
        Constants
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

                if (!TimeController.isPaused) {
                    MainController.animatePlanetRotations();
                }

                MainController.render();
                Scene.setCameraFocalPoint(window.focalPoint);
            },

            animatePlanetRotations: function() {
                MainController.positionPlanets();
            },

            positionPlanets: function() {
                var planets = Scene.planetObjects,
                    count = new Date().getDOYwithTimeAsDecimal() + TimeController.getTime()
                ;

                if (App.config.build.SunFactoryEnabled) {
                    Scene.Sun.rotation.y += 0.00029;
                }

                if (App.config.build.AsteroidBeltFactoryEnabled) {
                    Scene.asteroidBelt.rotation.z += -0.00008
                }

                for (var i = 0; i < planets.length; i++) {
                    Scene.planets[i].rotation.y += 0.0007;
                    Scene.planets[i].core.rotation.y += -0.00014;

                    var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, planets[i].distanceFromParent)
                                * Math.cos(
                                    parseFloat(Number(count + planets[i].orbitPositionOffset).toFixed(5))
                                    * OrbitFactory.getOrbitRadian(planets[i])
                                    * Constants.degreesToRadiansRatio
                                );

                    var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, planets[i].distanceFromParent)
                                * Math.sin(
                                    parseFloat(Number(count + planets[i].orbitPositionOffset).toFixed(5))
                                    * OrbitFactory.getOrbitRadian(planets[i])
                                    * Constants.degreesToRadiansRatio
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
                for (var i = 0; i < Scene.moons.length; i++) {
                    var OrbitCtrl = new OrbitController(
                        Scene.moons[i],
                        Scene.moons[i].objectliteral,
                        Scene.moons[i].parentliteral,
                        { interval: 10 }
                    );

                    OrbitCtrl.positionObject();
                    OrbitCtrl.animateOrbit();
                }
            },

            render: function() {
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
