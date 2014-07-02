define(['jquery', 'Scene'], function($, Scene) {

    var UIController = {
        initEventListeners: function() {
            // User Event Listeners
            $('#zoom').on('input', function(e) {
                Scene.zoom = e.target.value;
            });

            $('#tilt').on('input', function(e) {
                Scene.tilt = e.target.value;
            });

            $('.planet').on('click', function() {
                var id = $(this).data('id'),
                    matchedPlanet = UIController.findPlanet(id)
                ;

                for (var i = 0; i < Scene.planetCores.length; i++) {
                    if (Scene.planetCores[i].name  === matchedPlanet.name) {
                        var core = Scene.planetCores[i];
                        break;
                    }
                }

                Scene.setCameraPosition(core, matchedPlanet, matchedPlanet.position, true);
                Scene.setCameraFocalPoint(core.position);
            });

            UIController.initResetView();
        },

        initResetView: function() {
            var resetButton = $('#reset-camera');

            resetButton.on('click', function() {
                Scene.camera.focalPoint = Scene.Sun.position;
                Zoom = 3500;
                Tilt = 500;
            });
        },

        buildPlanetList: function() {
            return $.Deferred(function(promise) {
                var listElement = $('#planets');

                listElement.children().remove();

                for (var i = 0; i < Scene.planets.length; i++) {
                    var id = Scene.planets[i].id;

                    listElement.append('<li id="planet-'+ id +'" class="planet" data-id="'+ id +'">'+ Scene.planets[i].name +'</li>');
                }

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
        }
    };

    return UIController;
});
