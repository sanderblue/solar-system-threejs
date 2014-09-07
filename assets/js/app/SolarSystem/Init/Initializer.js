define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'SolarSystemFactory',
        'SunFactory',
        'TimeController',
        'UIController'

    ],
    function($, Scene, SolarSystem, SolarSystemFactory, SunFactory, TimeController, UIController) {

        /**
         * Initializer
         *
         * This object is reponsible for initialization of the entire scene. Once the scene is intialized,
         * the SolarSystemFactory object builds the Solar System. Once that is done, time begins and the UI elements
         * are accessible to the user.
         */
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
                TimeController.start();

                return $.when(Scene.init()).done(function() {
                    $(document).ready(function() {
                        $.when(
                            SolarSystemFactory.build()
                        )
                        .done(function() {
                            UIController.init();
                        });
                    });
                });
            }
        };

        return Initializer;
    }
);
