define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'SolarSystemFactory',
        'SunFactory',
        'Time',
        'UI'

    ], function($, Scene, SolarSystem, SolarSystemFactory, SunFactory, TimeController, UIController) {

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
                window.addEventListener('resize', Initializer.onWindowResize, false);

                this.checkBrowserCompatibility();

                return $.when(Scene.init()).done(function() {
                    SolarSystemFactory.build();
                    UIController.init();
                    TimeController.start();

                    Scene.camera.focalPoint = Scene.Sun.position;
                });
            }
        };

        return Initializer;
    }
);