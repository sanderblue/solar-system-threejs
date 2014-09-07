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
            selectedPlanet: null,
            currentCameraPosition: null,

            initEventListeners: function() {
                var cameraZoomControl = $('#camera-zoom-control');

                $(document).on('click', '.camera-trigger', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    var id = $(this).data('id'),
                        matchedPlanet = UIController.findPlanet(id)
                    ;

                    UIController.selectedPlanet = matchedPlanet.planet;

                    cameraZoomControl
                        .attr('min', - matchedPlanet.planet3d.geometry.radius)
                        .attr('max', matchedPlanet.planet3d.geometry.radius)
                    ;

                    Scene.setCameraPosition(matchedPlanet.planet3d.core, matchedPlanet.planet3d, matchedPlanet.planet3d.position, false);
                    Scene.setCameraFocalPoint(matchedPlanet.planet3d.position);
                });

                $(document).on('click', '.camera-reset', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    Scene.setCameraPosition(null, null, Camera.defaultPosition, true);
                    Scene.setCameraFocalPoint(Camera.defaultFocalPoint);
                });
            },

            adjustCameraOrbitPosition: function(offsetSelector, xCoordinate, yCoordinate, cropper) {
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

                Camera.orbitDuration = 360;

                var posX = OrbitFactory.getOrbitAmplitute(UIController.selectedPlanet, UIController.selectedPlanet.radius * 2.8)
                            * Math.cos(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(Camera)
                                * degreesToRadianRatio
                            );

                var posY = OrbitFactory.getOrbitAmplitute(UIController.selectedPlanet, UIController.selectedPlanet.radius * 2.8)
                            * Math.sin(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(Camera)
                                * degreesToRadianRatio
                            );

                Scene.setCameraPosition(
                    null,
                    null,
                    new THREE.Vector3(
                        parseFloat(posX),
                        30,
                        parseFloat(posY)
                    ),
                    null
                );

                cropper.css({ '-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate });

                $('body').on('mouseup', function(e){
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
                        $('body').on('mousemove', function(e){
                            UIController.adjustCameraOrbitPosition($('#innerCircle').parent(), e.pageX,e.pageY, $('#marker'));
                        });
                    });
                });
            },

            initCameraZoomEventListener: function() {
                var value = 0;

                $('#camera-zoom-control').on('change', function() {
                    // console.log('Zoom: ', parseFloat(this.value), parseFloat(value));

                    if (parseFloat(this.value) > parseFloat(value) && parseFloat(this.value) > 0) {
                        Camera.position.x = parseFloat(Scene.camera.position.x) - (parseFloat(this.value) - parseFloat(value));
                        Camera.position.z = parseFloat(Scene.camera.position.z) - (parseFloat(this.value) - parseFloat(value));
                    }

                    if (parseFloat(this.value) > parseFloat(value) && parseFloat(this.value) > 0) {
                        Camera.position.x = parseFloat(Scene.camera.position.x) + parseFloat(this.value);
                        Camera.position.z = parseFloat(Scene.camera.position.z) + parseFloat(this.value);
                    }

                    if (parseFloat(this.value) < parseFloat(value) && parseFloat(this.value) < 0) {
                        Camera.position.x = parseFloat(Scene.camera.position.x) + parseFloat(this.value);
                        Camera.position.z = parseFloat(Scene.camera.position.z) + parseFloat(this.value);
                    }

                    value = this.value;

                    positionX = Camera.position.x;
                    positionZ = Camera.position.z;

                    Scene.camera.position.x = Camera.position.x;
                    Scene.camera.position.z = Camera.position.z;

                    console.log('Position: ', Scene.camera.position);
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
                            orbitDuration = SolarSystem.planets[i].orbitDuration,
                            axialTilt     = SolarSystem.planets[i].axialTilt,
                            precision     = 1
                        ;

                        // listElement.append('<li id="planet-'+ planetId +'" class="planet" data-id="'+ iplanetNamed +'">'+  +'</li>');
                        var planetListItem =
                            '<div class="accordian-subitem planet-item">'
                            +    '<div id="'+ id +'" class="accordian-item-label planet">'+ name +'</div>'
                            +    '<span class="icon-target camera-trigger" data-id="'+ id +'"></span>'
                            +    '<span class="camera-trigger" data-id="'+ id +'"></span>'
                            +    '<div class="accordian-submenu">'
                            +        '<div class="accordian-submenu-item">'
                            +            '<div class="data-container">'
                            +               '<div class="data-container-row">'
                            +                   '<div class="left-side">Radius</div>'
                            +                   '<div class="right-side">'+ SolarSystem.planets[i].radiusString +'</div>'
                            +                '</div>'
                            +                '<div class="data-container-row">'
                            +                   '<div class="left-side">Semi-major Axis</div>'
                            +                   '<div class="right-side">'+ SolarSystem.planets[i].distanceFromParentString +'</div>'
                            +                '</div>'
                            +                '<div class="data-container-row">'
                            +                   '<div class="left-side">Orbit Duration</div>'
                            +                   '<div class="right-side">'+ Number(orbitDuration).toFixed(precision) +' Earth days</div>'
                            +                '</div>'
                            +                '<div class="data-container-row">'
                            +                   '<div class="left-side">Axial Tilt</div>'
                            +                   '<div class="right-side">'+ Number(SolarSystem.planets[i].axialTiltDegrees).toFixed(precision) +'˚</div>'
                            +                '</div>'
                            +            '</div>'
                            +        '</div>'
                            +    '</div>'
                            +'</div>'
                        ;

                        listElement.append(planetListItem);
                    }

                    var camaraReset = '<div class="camera-reset">Reset Camera</div>'

                    $('#planets').append(camaraReset);
                    $('#camera-zoom-control').after(camaraReset);

                    promise.resolve();
                });
            },

            findPlanet: function(id) {
                var planets = Scene.planets;

                for (var i = 0; i < planets.length; i++) {
                    if (planets[i].id == id) {
                        return  {
                            planet: SolarSystem.planets[i],
                            planet3d: planets[i]
                        }
                    }
                }
            },

            init: function() {
                $.when(UIController.buildPlanetList()).done(function() {
                    UIController.initEventListeners();
                    UIController.initCameraOrbitControlListener();
                    UIController.initCameraZoomEventListener();
                    UIController.initResetView();
                });

                $('body').append('<div id ="my_music"> <embed src="http://www.example.com/yourmusicfile.mp3" width="70" height="18" autostart="false" loop="true"> </div>')

                var accordian = new Accordian();
            }
        };

        return UIController;
    }
);
