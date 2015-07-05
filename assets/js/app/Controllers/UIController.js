define(
    [
        'jquery',
        'Accordian',
        'Scene',
        'Camera',
        'SolarSystem',
        'OrbitFactory',
        'TimeController',
        'PlanetDataModule'
    ],
    function($, Accordian, Scene, Camera, SolarSystem, OrbitFactory, TimeController, PlanetDataModule) {

        var UIController = {
            selectedPlanet: null,
            currentCameraPosition: null,

            initEventListeners: function() {
                var planetSelector = '.accordian-subitem-label.planet',
                    planetDataModule = document.getElementById('planet-data-module'),
                    cameraZoomControl = document.getElementById('camera-zoom-control')
                ;

                $(document).on('click', planetSelector, function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    var isActive = $(this).hasClass('active');

                    if (isActive) {
                        return false;
                    }

                    var id = $(this).data('id'),
                        isMoon = $(this).text() == 'Europa'
                    ;

                    if (isMoon) {
                        matchedPlanet = UIController.findMoon(id);
                    } else {
                        matchedPlanet = UIController.findPlanet(id);
                    }

                    $(planetSelector).removeClass('active');
                    $(this).addClass('active');

                    UIController.selectedPlanet = matchedPlanet.planet;

                    Scene.setCameraPosition(
                        matchedPlanet.planet3d.core,
                        matchedPlanet.planet3d,
                        matchedPlanet.planet3d.position,
                        false,
                        false
                    );

                    UIController.resetCameraControls();

                    var radius = matchedPlanet ? matchedPlanet.planet3d.geometry.radius : Scene.camera.position.x - Scene.Sun.position.x,
                        distance = parseInt(radius * 6)
                    ;

                    cameraZoomControl.setAttribute('min', parseInt(radius));
                    cameraZoomControl.setAttribute('max', distance * 10);
                    cameraZoomControl.value = distance;

                    if (matchedPlanet.planet.uiData) {
                        var planetDataHTML = PlanetDataModule.getRenderedTemplate('planet', matchedPlanet.planet.uiData);

                        planetDataModule.innerHTML = planetDataHTML;

                        if (!$(planetDataModule).hasClass('triggered')) {
                            $(planetDataModule).fadeIn(200).addClass('triggered');
                        }

                        $(planetDataModule).find('.data-holder').removeClass('triggered');

                        setTimeout(function() {
                            $(planetDataModule).find('.data-holder').addClass('triggered');
                        }, 100);
                    }

                    UIController.initCameraZoomEventListener(cameraZoomControl.value);
                });

                $(document).on('click', '.camera-reset', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    $(planetDataModule).fadeOut(150, function() {
                        $(this).removeClass('triggered').children().remove();
                    });

                    $(planetSelector).removeClass('active');

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
                        });

                        $(document).one('mouseup', function() {
                            TimeController.start();
                        });
                    });
                });
            },

            initCameraZoomEventListener: function(val) {
                $('#camera-zoom-control').on('change input', function() {
                    Camera.position.x = this.value;
                    Camera.position.z = this.value;

                    var posX = Camera.position.x,
                        posY = Camera.position.y,
                        posZ = Camera.position.z
                    ;

                    if (!val) {
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
                    var planetListElement = $('#planets'),
                        dwarfPlanetListElement = $('#dwarf-planets'),
                        moonListElement = $('#major-moons')
                    ;

                    planetListElement.children().remove();

                    for (var i = 0; i < SolarSystem.planets.length; i++) {
                        if (i > 7) {
                            break;
                        }

                        var planetId = Scene.planets.length ? Scene.planets[i].id : SolarSystem.planets[i].id;

                        // planetListElement.append('<li id="planet-'+ planetId +'" class="planet" data-id="'+ iplanetNamed +'">'+  +'</li>');
                        var planetListItem =
                            '<div class="accordian-subitem planet-item">'
                            +    '<div id="'+ planetId +'" class="accordian-subitem-label planet" data-id="'+ planetId +'">'+ SolarSystem.planets[i].name +'</div>'
                            +'</div>'
                        ;

                        planetListElement.append(planetListItem);
                    }

                    dwarfPlanetListElement.children().remove();

                    for (var n = 8; n < SolarSystem.planets.length; n++) {
                        var planetId = Scene.planets.length ? Scene.planets[n].id : SolarSystem.planets[n].id;

                        var dawrfPlanetListItem =
                            '<div class="accordian-subitem planet-item">'
                            +    '<div id="'+ planetId +'" class="accordian-subitem-label planet" data-id="'+ planetId +'">'+ SolarSystem.planets[n].name +'</div>'
                            +'</div>'
                        ;


                        dwarfPlanetListElement.append(dawrfPlanetListItem);
                    }

                    console.log(
                            Scene.majorMoons
                            // Scene.majorMoons[i].name +': '+ Scene.majorMoons[i].id
                        );

                    for (var v = 0; v < Scene.majorMoons.length; v++) {
                        console.log(
                            Scene.majorMoons[v].name +': '+ Scene.majorMoons[v].id
                        );

                        var moonListItem =
                            '<div class="accordian-subitem planet-item">'
                            +    '<div id="'+ Scene.majorMoons[v].id +'" class="accordian-subitem-label planet" data-id="'+ Scene.majorMoons[v].id +'">'+ Scene.majorMoons[v].name +'</div>'
                            +'</div>'
                        ;


                        moonListElement.append(moonListItem);
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

            findMoon: function(id) {
                for (var i = 0; i < Scene.majorMoons.length; i++) {

                    return {
                        planet: SolarSystem.planets[4].moons[3],
                        planet3d: Scene.majorMoons[i]
                    }

                    // if (Scene.majorMoons[i].id == id) {
                    //     return {
                    //         planet: SolarSystem.planets[i],
                    //         planet3d: planets[i]
                    //     }
                    // }
                }
            },

            init: function() {
                $.when(UIController.buildPlanetList()).done(function() {
                    UIController.initEventListeners();
                    UIController.initCameraOrbitControlListener();
                    UIController.initCameraZoomEventListener();
                    UIController.initResetView();
                });

                $(document).on('travelStart', function() {
                    $(document).off('click', '.accordian-subitem-label.planet');
                });

                $(document).on('travelComplete', function() {
                    UIController.initEventListeners();
                    UIController.initCameraOrbitControlListener();
                    UIController.initCameraZoomEventListener();
                    UIController.initResetView();
                });

                var accordian = new Accordian();
            }
        };

        return UIController;
    }
);
