define(
    [
        'jquery',
        'App',
        'Scene',
        'Initializer',
        'UIController',
        'PlanetFactory',
        'OrbitFactory',
        'SolarSystem',
        'TimeController',
        'Modules'
    ],
    function($, App, Scene, Initializer, UIController, PlanetFactory, OrbitFactory, SolarSystem, TimeController) {

        var TimeCtrl = new TimeController();

        var MainController = {
            animate: function() {
                requestAnimationFrame(MainController.animate);

                MainController.render();
                // Scene.stats.update();
            },

            positionPlanets: function() {
                var degreesToRadianRatio = 0.0174532925,
                    planets = Scene.planets,
                    count = 1
                ;

                for (var i = 0; i < planets.length; i++) {
                    var dayOnEarth = new Date().getDOYwithTimeAsDecimal() + TimeCtrl.getStopWatchValue();

                    // Mercury
                    if (i === 0) {
                        count = dayOnEarth + 48;
                    }

                    // Venus
                    if (i === 1) {
                        count = dayOnEarth + 155;
                    }

                    // Earth
                    if (i === 2) {
                        count = dayOnEarth;

                        Scene.planets[i].cloudCentroid.rotation.y += 0.00015;
                    }

                    // Mars
                    if (i === 3) {
                        count = dayOnEarth + 71;
                    }

                    // Jupiter
                    if (i === 4) {
                        count = dayOnEarth + 2692;
                    }

                    // Saturn
                    if (i === 5) {
                        count = dayOnEarth + 13753;
                    }

                    // Uranus
                    if (i === 6) {
                        count = dayOnEarth + 29654;
                    }

                    // Neptune
                    if (i === 7) {
                        count = dayOnEarth + 62885;
                    }

                    var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.planets[i].distanceFromParent)
                                * Math.cos(
                                    count
                                    * OrbitFactory.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.planets[i].distanceFromParent)
                                * Math.sin(
                                    count
                                    * OrbitFactory.getPlanetRadian(SolarSystem.planets[i])
                                    * degreesToRadianRatio
                                );

                    Scene.setCameraFocalPoint(window.focalPoint);

                    Scene.planets[i].rotation.y += 0.0006;

                    Scene.planetCores[i].position.set(
                        parseFloat(posX),
                        parseFloat(posY),
                        0
                    );

                    Scene.planets[i].position.set(
                        parseFloat(posX),
                        parseFloat(posY),
                        0
                    );
                }

                Scene.Sun.rotation.y += 0.00025;
            },

            render: function() {
                MainController.positionPlanets();

                Scene.renderer.render(Scene.scene, Scene.camera);
            },

            init: function() {
                UIController.init();

                window.testposition = 0;

                function rotateAnnotationCropper(offsetSelector, xCoordinate, yCoordinate, cropper){
                    var x       = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;
                    var y       = -1*(yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
                    var theta   = Math.atan2(y,x)*(180/Math.PI);
                    var cssDegs = convertThetaToCssDegs(theta);
                    var rotate  = 'rotate(' + cssDegs + 'deg)';

                    window.testposition = cssDegs;

                    if (Math.ceil(cssDegs) < 0) {
                        window.testposition = 270 - Math.abs(cssDegs) + 90;
                    }

                    var degreesToRadianRatio = 0.0174532925;

                    var posX = OrbitFactory.getOrbitAmplitute(70)
                                * Math.cos(
                                    window.testposition
                                    * OrbitFactory.getPlanetRadian(SolarSystem.planets[2].moons[0])
                                    * degreesToRadianRatio
                                );

                    var posY = OrbitFactory.getOrbitAmplitute(70)
                                * Math.sin(
                                    window.testposition
                                    * OrbitFactory.getPlanetRadian(SolarSystem.planets[2].moons[0])
                                    * degreesToRadianRatio
                                );

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

                    cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate});
                    $('body').on('mouseup', function(event){ $('body').unbind('mousemove')});

                }

                function convertThetaToCssDegs(theta){
                    var cssDegs = 90 - theta;
                    return cssDegs;
                }

                $(document).ready(function(){
                    $('#marker').on('mousedown', function(){
                        $('body').on('mousemove', function(event){
                            rotateAnnotationCropper($('#innerCircle').parent(), event.pageX,event.pageY, $('#marker'));
                        });
                    });
                });

                if (App.config.buildEnabled) {
                    $.when(Initializer.init()).done(function() {
                        MainController.animate();
                    });
                }
            }
        };

        MainController.init();
    }
);
