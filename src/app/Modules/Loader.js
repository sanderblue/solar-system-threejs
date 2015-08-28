
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

        var start = new Date().getTime();

        var sun = new Sun(data.parent);

        console.debug('Sun Diameter:', sun.threeDiameter);

        for (var i = 0; i < planets.length; i++) {
            var planet = new Planet(planets[i], sun);

            var posX = sun.threeDiameter + 150 + (i * 70);

            console.debug('Pos X:', posX);

            planet.threeObject.position.x = posX;

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

        // Scene.camera.position.set(
        //     earth.threeObject.position.x,
        //     earth.threeObject.position.y,
        //     earth.threeObject.position.z
        // );

        // Scene.camera.position.z = earth.threeDiameter + 10;

        // Scene.camera.lookAt(earth.threeObject.position);

        // earth.threeObject.position.set(0,0,0);

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
