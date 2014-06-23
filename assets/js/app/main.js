define(
    [
        'jquery',
        'App',
        'Scene',
        'Initializer',
        'PlanetFactory',
        'SolarSystem',
        'Time',
        'Modules'
    ],
    function($, App, Scene, Initializer, PlanetFactory, SolarSystem, TimeController) {

        var TimeCtrl = new TimeController();

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
                    var dayOnEarth = new Date().getDOYwithTimeAsDecimal() + TimeCtrl.getStopWatchValue();

                    // console.log(dayOnEarth);

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

                    var posY = PlanetFactory.OrbitBuilder.getOrbitAmplitute(SolarSystem.planets[i].distanceFromParent)
                                * Math.cos(
                                    count
                                    * PlanetFactory.OrbitBuilder.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    var posX = PlanetFactory.OrbitBuilder.getOrbitAmplitute(SolarSystem.planets[i].distanceFromParent)
                                * Math.sin(
                                    count
                                    * PlanetFactory.OrbitBuilder.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    // Scene.planets[i].rotation.y += 0.008;

                    Scene.planets[i].position.set(
                        parseFloat(posX),
                        parseFloat(posY),
                        0
                    );
                }

                Scene.Sun.rotation.z += 0.0003;
            },

            render: function() {
                MainController.positionPlanets();
                // MainController.setCamera();

                Scene.renderer.render(Scene.scene, Scene.camera);
            },

            setCamera: function() {
                Scene.setCameraPosition(Scene.camera.focalPoint);
            },

            init: function() {
                if (App.config.buildEnabled) {
                    $.when(Initializer.init()).done(function() {
                        MainController.animate();
                        MainController.setCamera();
                    });
                }
            }
        };

        MainController.init();
    }
);