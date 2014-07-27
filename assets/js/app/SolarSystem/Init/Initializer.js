define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'SolarSystemFactory',
        'SunFactory',
        'TimeController',
        'UIController'

    ], function($, Scene, SolarSystem, SolarSystemFactory, SunFactory, TimeController, UIController) {

        var Initializer = {
            isBrowserCompatible: function() {
                if (!Detector.webgl) {
                    Detector.addGetWebGLMessage();

                    return false;
                }
            },

            onWindowResize: function() {
                Scene.camera.aspect = window.innerWidth / window.innerHeight;
                Scene.camera.updateProjectionMatrix();

                Scene.renderer.setSize(window.innerWidth, window.innerHeight);
            },

            init: function() {
                window.addEventListener('resize', Initializer.onWindowResize, false);

                // if (!Initializer.isBrowserCompatible()) {
                //     return;
                // }

                return $.when(Scene.init()).done(function() {
                    $.when(
                        SolarSystemFactory.build()
                    )
                    .done(function() {
                        TimeController.start();
                        UIController.init();
                    });
                });
            }
        };

        return Initializer;
    }
);
