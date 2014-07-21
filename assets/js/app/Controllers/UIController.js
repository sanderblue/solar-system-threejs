define(
    [
        'jquery',
        'Accordian',
        'Scene',
        'Camera'
    ],
    function($, Accordian, Scene, Camera) {

        var UIController = {
            initEventListeners: function() {
                $('.planet').on('click', function() {
                    var id = $(this).data('id'),
                        matchedPlanet = UIController.findPlanet(id)
                    ;

                    // for (var i = 0; i < Scene.planetCores.length; i++) {
                    //     if (Scene.planetCores[i].name  === matchedPlanet.name) {
                    //         var core = Scene.planetCores[i];
                    //         break;
                    //     }
                    // }

                    Scene.setCameraPosition(matchedPlanet, matchedPlanet, matchedPlanet.position, true);
                    Scene.setCameraFocalPoint(matchedPlanet.position);
                });

                $('#mercury .planet-header').on('click', function() {
                    console.log(this);
                    $(this).parent().find('.mercury-content').slideToggle();
                }); 

                UIController.initResetView();
            },

            initResetView: function() {
                var resetButton = $('#reset-camera');

                resetButton.on('click', function() {
                    Scene.setCameraPosition(null, null, Camera.defaultPosition, true);
                    Scene.setCameraFocalPoint(Camera.defaultFocalPoint);
                });
            },

            buildPlanetList: function() {
                return $.Deferred(function(promise) {
                    // var listElement = $('#planets');

                    // listElement.children().remove();

                    // console.log(Scene.planets )

                    // for (var i = 0; i < Scene.planets.length; i++) {
                    //     var id = Scene.planets[i].id;

                    //     listElement.append('<li id="planet-'+ id +'" class="planet" data-id="'+ id +'">'+ Scene.planets[i].name +'</li>');
                    // }

                    promise.resolve();
                });
            },

            findPlanet: function(id) {
                var planets = Scene.planets;

                for (var i = 0; i < planets.length; i++) {
                    if (planets[i].id == id) {
                        return planets[i];
                    }
                }
            },

            init: function() {
                $.when(UIController.buildPlanetList()).done(function() {
                    UIController.initEventListeners();
                });

                var accordian = new Accordian();
            }
        };

        return UIController;
    }
);
