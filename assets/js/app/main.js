define(['jquery', 'threejs', 'SolarSystem', 'Date', 'Time', 'UI'], function($) {

    /**** Initialize all the Solar System magic here!! ****/

    Initializer = {
        getOrbitAmplitute: function(distanceFromSun) {
            return SolarSystem.Parent.radius + distanceFromSun;
        };

        // Gets a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
        // This ratio helps create an accurate representation of each planet's location along its orbit circumference.
        getPlanetRadian: function(planet) {
            return 360 / planet.earthDaysToOrbitSun;
        }

        getAstroidRadian: function() {
            return 360 / SolarSystem.AstroidBelt.primary[0].earthDaysToOrbitSun; // Using Ceres just as a reference point
        }

        onWindowResize: function() {
            Scene.camera.aspect = window.innerWidth / window.innerHeight;
            Scene.camera.updateProjectionMatrix();

            Scene.renderer.setSize(window.innerWidth, window.innerHeight);
        }

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

});