define(
    [
        'jquery',
        'Scene',
        'SolarSystem',
        'SolarSystemFactory',
        'SunFactory',
        'TimeController',
        'UIController',
        'LoadingPromptController'

    ],
    function(
        $,
        Scene,
        SolarSystem,
        SolarSystemFactory,
        SunFactory,
        TimeController,
        UIController,
        LoadingPromptController
    )
    {

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

                return true;
            },

            onWindowResize: function() {
                Scene.camera.aspect = window.innerWidth / window.innerHeight;
                Scene.camera.updateProjectionMatrix();

                Scene.renderer.setSize(window.innerWidth, window.innerHeight);
            },

            buildSolarSystem: function(buildStatusPrompt) {
                return $.when(
                    SolarSystemFactory.build(buildStatusPrompt)
                )
                .done(function() {
                    UIController.init();
                });
            },

            initTimeCreationListener: function() {
                $(document).on('time', function() {
                    TimeController.start();
                });
            },

            init: function(MainController) {
                window.addEventListener('resize', Initializer.onWindowResize, false);

                if (!Initializer.isBrowserCompatible()) {
                    return;
                }

                if (App.config.build.UIonly) {
                    $.when(
                        UIController.buildPlanetList()
                    )
                    .done(function() {
                        UIController.init();
                    });

                    return;
                }

                return $.when(Scene.init()).done(function() {
                    Initializer.initTimeCreationListener();
                    LoadingPromptController.init(Initializer, MainController);
                });
            }
        };

        return Initializer;
    }
);
