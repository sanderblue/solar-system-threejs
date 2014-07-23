define(
    [
        'jquery',
        'Accordian',
        'Scene',
        'Camera',
        'SolarSystem',
        'OrbitFactory'
    ],
    function($, Accordian, Scene, Camera, SolarSystem, OrbitFactory) {

        var UIController = {
            initEventListeners: function() {
                $(document).on('click', '.camera-trigger', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    var id = $(this).data('id'),
                        matchedPlanet = UIController.findPlanet(id)
                    ;

                    console.log('planet', id);

                    // for (var i = 0; i < Scene.planetCores.length; i++) {
                    //     if (Scene.planetCores[i].name  === matchedPlanet.name) {
                    //         var core = Scene.planetCores[i];
                    //         break;
                    //     }
                    // }

                    Scene.setCameraPosition(matchedPlanet, matchedPlanet, matchedPlanet.position, true);
                    Scene.setCameraFocalPoint(matchedPlanet.position);
                });
            },

            rotateAnnotationCropper: function(offsetSelector, xCoordinate, yCoordinate, cropper) {
                var x       = xCoordinate - offsetSelector.offset().left - offsetSelector.width() / 2;
                var y       = -1 * (yCoordinate - offsetSelector.offset().top - offsetSelector.height() / 2);
                var theta   = Math.atan2(y, x) * (180 / Math.PI);
                var cssDegs = UIController.convertThetaToCssDegs(theta);
                var rotate  = 'rotate(' + cssDegs + 'deg)';

                window.testposition = cssDegs;

                if (Math.ceil(cssDegs) < 0) {
                    window.testposition = 270 - Math.abs(cssDegs) + 90;
                }

                var degreesToRadianRatio = 0.0174532925;

                var object = {};
                var zoomOffset = 7;

                object.orbitDuration = 360;

                var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.planets[2], SolarSystem.planets[2].moons[0].distanceFromParent / zoomOffset)
                            * Math.cos(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(object)
                                * degreesToRadianRatio
                            );

                var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.planets[2], SolarSystem.planets[2].moons[0].distanceFromParent / zoomOffset)
                            * Math.sin(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(object)
                                * degreesToRadianRatio
                            );

                console.log(OrbitFactory.getOrbitRadian(SolarSystem.planets[2].distanceFromParent), parseInt(posX), parseInt(posY), parseInt(cssDegs));

                Scene.setCameraPosition(
                    null,
                    null,
                    new THREE.Vector3(
                        parseFloat(posX),
                        20,
                        parseFloat(posY)
                    ),
                    null
                );

                cropper.css({ '-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate });

                $('body').on('mouseup', function(event){
                    $('body').unbind('mousemove');
                });
            },

            convertThetaToCssDegs: function(theta) {
                var cssDegs = 90 - theta;

                return cssDegs;
            },

            initCameraOrbitControlListener: function() {
                $(document).ready(function(){
                    $('#marker').on('mousedown', function(){
                        $('body').on('mousemove', function(event){
                            UIController.rotateAnnotationCropper($('#innerCircle').parent(), event.pageX,event.pageY, $('#marker'));
                        });
                    });
                });
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

                    for (var i = 0; i < SolarSystem.planets.length; i++) {
                        var planetId = Scene.planets.length ? Scene.planets[i].id : SolarSystem.planets[i].id;

                        var id            = planetId,
                            name          = SolarSystem.planets[i].name,
                            radius        = SolarSystem.planets[i].radius,
                            orbitRadius   = SolarSystem.planets[i].distanceFromParent,
                            orbitDuration = SolarSystem.planets[i].orbitDuration,
                            axialTilt     = SolarSystem.planets[i].axialTilt
                        ;

                        // listElement.append('<li id="planet-'+ planetId +'" class="planet" data-id="'+ iplanetNamed +'">'+  +'</li>');
                        var planetListItem = '<div class="accordian-item subitem">'
                                            +    '<span id="'+ id +'" class="accordian-item-label planet">'+ name +'</span>'
                                            +    '<span class="camera-trigger" data-id="'+ id +'">&nbsp;◊&nbsp;</span>'
                                            +    '<div class="accordian-submenu">'
                                            +        '<div class="accordian-submenu-item">'
                                            +            '<div class="data-container">'
                                            +                '<div class="left-side">Radius</div>'
                                            +                '<div class="right-side">'+ Number(radius).toFixed(4) +'</div>'
                                            +                '<div class="left-side">Mean Orbit Radius</div>'
                                            +                '<div class="right-side">'+ Number(orbitRadius).toFixed(4) +'</div>'
                                            +                '<div class="left-side">Orbit Duration</div>'
                                            +                '<div class="right-side">'+ Number(orbitDuration).toFixed(4) +'</div>'
                                            +                '<div class="left-side">Axial Tilt</div>'
                                            +                '<div class="right-side">'+ Number(axialTilt).toFixed(4) +'</div>'
                                            +            '</div>'
                                            +        '</div>'
                                            // +        '<div class="accordian-submenu-item">'
                                            // +            '<div class="accordian-item-label">Moons</div>'
                                            // +            '<div class="accordian-submenu">'
                                            // +                '<div class="accordian-submenu-item">'
                                            // +                    'Terra Nova'
                                            // +                '</div>'
                                            // +                '<div class="accordian-submenu-item">'
                                            // +                    'Charon'
                                            // +                '</div>'
                                            // +            '</div>'
                                            // +        '</div>'
                                            +    '</div>'
                                            +'</div>';

                        listElement.append(planetListItem);
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
                    UIController.initCameraOrbitControlListener();
                    UIController.initResetView();
                });

                var accordian = new Accordian();
            }
        };

        return UIController;
    }
);
