define(
    [
        'jquery',
        'Accordian',
        'Scene',
        'Camera',
        'SolarSystem',
        'OrbitFactory',
        'TimeController'
    ],
    function($, Accordian, Scene, Camera, SolarSystem, OrbitFactory, TimeController) {

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

                    var radius = matchedPlanet ? matchedPlanet.planet3d.geometry.radius : Scene.camera.position.x - Scene.Sun.position.x;

                    cameraZoomControl.val(matchedPlanet.planet.distanceFromParent);

                    Scene.setCameraPosition(matchedPlanet.planet3d.core, matchedPlanet.planet3d, matchedPlanet.planet3d.position, false, false);
                    Scene.setCameraFocalPoint(matchedPlanet.planet3d.position);

                    UIController.resetCameraControls();

                    cameraZoomControl
                        .attr('min', - parseInt(matchedPlanet.planet3d.geometry.radius * 2.7))
                        .attr('max', parseInt(matchedPlanet.planet3d.geometry.radius * 2.7))
                        .attr('value', 0)
                    ;

                    UIController.initCameraZoomEventListener(UIController.selectedPlanet);
                });

                $(document).on('click', '.camera-reset', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    Scene.setCameraPosition(null, null, Camera.defaultPosition, true);
                    Scene.setCameraFocalPoint(Camera.defaultFocalPoint);
                    UIController.resetCameraControls();
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

                var distanceFromParent = UIController.selectedPlanet ? UIController.selectedPlanet.radius * 4.5 : Camera.defaultPosition.y;
                var parent = UIController.selectedPlanet ? UIController.selectedPlanet : Scene.Sun.geometry;

                var posX = OrbitFactory.getOrbitAmplitute(parent, Math.abs(distanceFromParent))
                            * Math.cos(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(Camera)
                                * degreesToRadianRatio
                            );

                var posY = OrbitFactory.getOrbitAmplitute(parent, Math.abs(distanceFromParent))
                            * Math.sin(
                                window.testposition
                                * OrbitFactory.getOrbitRadian(Camera)
                                * degreesToRadianRatio
                            );

                if (UIController.selectedPlanet) {
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

                } else {
                    Scene.setCameraPosition(
                        null,
                        null,
                        new THREE.Vector3(
                            parseFloat(posY),
                            parseFloat(posX),
                            Camera.defaultPosition.z
                        ),
                        null,
                        true
                    );
                }

                cropper.css({ '-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate });

                $('body').on('mouseup', function(e){
                    $('body').unbind('mousemove');
                });
            },

            convertThetaToCssDegs: function(theta) {
                var cssDegs = 90 - theta;

                return cssDegs;
            },

            resetCameraControls: function() {
                $('#marker').css({
                    '-webkit-transform': 'rotate(0deg)',
                    '-moz-transform': 'rotate(0deg)',
                    'transform': 'rotate(0deg)'
                });

                $('#camera-zoom-control').val(0);
            },

            initCameraOrbitControlListener: function() {
                $(document).ready(function() {
                    var circleParent = $('#innerCircle').parent(),
                        marker = $('#marker')
                    ;

                    marker.on('mousedown', function() {
                        TimeController.stop();

                        $('body').on('mousemove', function(e) {
                            UIController.adjustCameraOrbitPosition(circleParent, e.pageX,e.pageY, marker);

                            marker.on('mouseup', function() {
                                TimeController.start();
                            });
                        });
                    });

                    marker.on('mouseup', function() {
                        TimeController.start();
                    });
                });
            },

            initCameraZoomEventListener: function(selectedPlanet) {
                var value = selectedPlanet ? Scene.camera.position.x : Camera.defaultPosition.y;

                $('#camera-zoom-control').val(value);

                $('#camera-zoom-control').on('change', function() {
                    if (parseFloat(this.value) > parseFloat(value)) {
                        Camera.position.x = parseFloat(Scene.camera.position.x) + (parseFloat(this.value));
                        Camera.position.z = parseFloat(Scene.camera.position.z) + (parseFloat(this.value));
                    }

                    if (parseFloat(this.value) < parseFloat(value)) {
                        Camera.position.x = parseFloat(Scene.camera.position.x) - Math.abs((parseFloat(this.value) - parseFloat(value)));
                        Camera.position.z = parseFloat(Scene.camera.position.z) - Math.abs((parseFloat(this.value) - parseFloat(value)));
                    }

                    value = this.value;

                    var posX = Camera.position.x,
                        posY = Camera.position.y,
                        posZ = Camera.position.z
                    ;

                    if (!UIController.selectedPlanet) {
                        posX = Camera.position.y;
                        posY = Camera.position.x;
                        posZ = Camera.defaultPosition.z;
                    }

                    Scene.camera.position.x = posX;
                    Scene.camera.position.y = posY;
                    Scene.camera.position.z = posZ;
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

                // $('body').append('<div id ="my_music"> <embed src="http://www.example.com/yourmusicfile.mp3" width="70" height="18" autostart="false" loop="true"> </div>')

                var accordian = new Accordian();
            }
        };

        return UIController;
    }
);
