
// import myModule from "my-module.js";

define(
[
    'jquery',
    'Modules/Scene',
    'Models/Sun',
    'Models/Planet'
],
function($, Scene, Sun, Planet) {
    'use strict';

    function getElapsedTimeMs(start, end) {
        return (end - start);
    }

    function getElapsedTimeSec(start, end) {
        return (end - start) * 0.001;
    }

    function getAvgElapsedTime(start, end, interations) {
        return getElapsedTimeMs(start, end) / interations;
    }

    var getSolarSystemData = $.ajax({
        url: 'http://www.solarsystem.lcl/src/data/solarsystem.json',
        dataType: 'json'
    });

    getSolarSystemData.done(function(data) {
        var planets = data.planets;
        var viewPlanet;

        var start = new Date().getTime();

        var sun = new Sun(data.parent);

        console.debug('Sun Diameter:', sun.threeDiameter);

        for (var i = 0; i < planets.length; i++) {
            var planet = new Planet(planets[i], sun);

            var posX = sun.threeRadius + planet.threeDistanceFromParent;

            console.debug('Planet pos X:', posX);

            planet.threeObject.position.x = posX;

            if (planets[i].id === 3) {
                viewPlanet = planet;
            }

            var axisHelperPlanet = new THREE.AxisHelper(planet.threeObject.radius + 10);

            planet.threeObject.add(axisHelperPlanet);

            Scene.scene.add(planet.threeObject);
        }

        var end = new Date().getTime();

        console.log('\n');
        console.log('Total Elapsed Time :', getElapsedTimeSec(start, end));
        console.log('\n');

        var axisHelper = new THREE.AxisHelper(1000);

        Scene.scene.add(axisHelper);

        var size = 100000;
        var step = 500;

        var gridHelper = new THREE.GridHelper(size, step);
        gridHelper.rotation.x = 90 * 0.0174532925;

        if (viewPlanet instanceof Planet) {
            Scene.camera.position.set(
                viewPlanet.threeObject.position.x + 0.5,
                viewPlanet.threeObject.position.y + 3.5,
                0
            );

            Scene.camera.up.set(0, 0, 1);
            // Scene.camera.position.z = viewPlanet.threeDiameter + 10;

            Scene.camera.lookAt(viewPlanet.threeObject.position);
        }

        // viewPlanet.threeObject.position.set(0,0,0);

        Scene.scene.add(axisHelper, gridHelper, sun.threeObject);
    });
});








// $.ajax({
//     url: 'http://star-api.herokuapp.com/api/v1/stars/Sun',
//     dataType: 'text/html'
// })
// .done(function(data) {
//     console.log('Data:', data);

//     var planets = data.planets;

//     // console.log('planets.length',planets.length);

//     // var mercury = new Planet(planets[0]);

//     // console.log('Mercury:', mercury);

//     for (var i = 0; i <  of planets) {
//         console.log('Planet', planet)
//     }
// });








// $.ajax({
//     url: 'http://star-api.herokuapp.com/api/v1/stars/Sun',
//     dataType: 'text/html'
// })
// .done(function(data) {
//     console.log('Data:', data);

//     var planets = data.planets;

//     // console.log('planets.length',planets.length);

//     // var mercury = new Planet(planets[0]);

//     // console.log('Mercury:', mercury);

//     for (var i = 0; i <  of planets) {
//         console.log('Planet', planet)
//     }
// });
