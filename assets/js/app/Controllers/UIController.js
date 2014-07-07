define(
    [
        'jquery',
        'Scene',
        'Camera'
    ],
    function($, Scene, Camera) {

        var UIController = {
            initEventListeners: function() {
                var controlPanelItems = $('.control-item-name');

                controlPanelItems.on('click', function() {
                    var subMenus    = $('.control-panel-subitems'),
                        thisSubMenu = $(this).parent().find('.control-panel-subitems'),
                        isActive    = $(this).hasClass('active')
                    ;

                    if (isActive) {
                        thisSubMenu.slideUp();
                        return;
                    }

                    console.log(thisSubMenu)

                    $(subMenus).parent().removeClass('active');
                    $(controlPanelItems).removeClass('active');

                    $(this).parent().addClass('active');
                    $(thisSubMenu).addClass('active');

                    subMenus.slideUp();
                    thisSubMenu.slideDown();
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
    }
);
