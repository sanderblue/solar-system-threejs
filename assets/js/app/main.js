define(
    [
        'jquery',
        'threejs',
        'Scene',
        'SolarSystem',
        'SunFactory',
        'PlanetFactory',
        'AstroidBeltFactory',
        'RingFactory'
    ],
    function($, THREE, Scene, SolarSystem, SunFactory, PlanetFactory, AstroidBeltFactory, RingFactory) {

    /**** Initialize all the Solar System magic here!! ****/

    console.log('jquery: ', $);
    console.log('threejs: ', THREE);
    console.log('Scene: ', Scene);
    console.log('SolarSystem: ', SunFactory);
    console.log('SolarSystem: ', SolarSystem);
    console.log('PlanetFactory: ', PlanetFactory);
    console.log('AstroidBeltFactory: ', AstroidBeltFactory);
    console.log('RingFactory: ', RingFactory);


    var MainController = {
        animate: function() {
            requestAnimationFrame(animate);

            render();
            // Scene.stats.update();
        },

        positionPlanets: function() {
            var degreesToRadianRatio = 0.0174532925,
                planets = Scene.planets,
                dayOnEarth = TimeController.dayWithTimeAsDecimal,
                count = 1
            ;

            for (var i = 0; i < planets.length; i++) {
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

                var posX = getOrbitAmplitute(SolarSystem.Planets[i].meanDistanceFromSun)
                            * Math.cos(
                                count
                                * getPlanetRadian(SolarSystem.Planets[i])
                                * degreesToRadianRatio
                            );

                var posY = getOrbitAmplitute(SolarSystem.Planets[i].meanDistanceFromSun)
                            * Math.sin(
                                count
                                * getPlanetRadian(SolarSystem.Planets[i])
                                * degreesToRadianRatio
                            );

                Scene.planets[i].rotation.y += 0.00041;

                Scene.planets[i].position.set(
                    parseFloat(posX),
                    0,
                    parseFloat(posY)
                );
            }

            Scene.Sun.rotation.y += 0.0003;
        },

        render: function() {
            positionPlanets();
            Scene.renderer.render(Scene.scene, Scene.camera);
            Scene.setCameraPosition(Scene.camera.focalPoint);
        }
    };

    var Initializer = {
        checkBrowserCompatibility: function() {
            if (!Detector.webgl) {
                Detector.addGetWebGLMessage();
            }
        },

        // Gets a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
        // This ratio helps create an accurate representation of each planet's location along its orbit circumference.
        getPlanetRadian: function(planet) {
            return 360 / planet.earthDaysToOrbitSun;
        },

        onWindowResize: function() {
            Scene.camera.aspect = window.innerWidth / window.innerHeight;
            Scene.camera.updateProjectionMatrix();

            Scene.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        init: function() {
            $.when(Scene.init()).done(function() {

            });
        }
    };

    // Scene.camera.focalPoint = Scene.Sun.position;

    // var startFor = new Date().getTime();
    // var planets = SolarSystem.Planets;

    // $.when(SolarSystemBuilder.buildPlanets()).done(function() {
    //     $.when(SolarSystemBuilder.buildAstroidBelt()).done(function() {
    //         TimeController.createTime();
    //     });
    // });

    // var endFor = new Date().getTime();

    // console.log('Builder Done: ', endFor - startFor + ' milliseconds');


    // $.when(init()).done(function(scene) {
    //     $('#zoom').val(Zoom);
    //     $('#tilt').val(Tilt);

    //     Scene.camera.focalPoint = Scene.Sun.position;
    //     animate();
    // });
});