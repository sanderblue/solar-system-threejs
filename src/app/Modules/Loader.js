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

        console.log('\n');

        var start = new Date().getTime();

        var earth = new Planet(planets[2]);

        var end = new Date().getTime();

        console.log('THREE diameter:', earth.threeDiameter);
        console.log('\n');
        console.log('\n');
        console.log('Total Elapsed Time :', getElapsedTimeSec(start, end));
        console.log('\n');

        // Scene.scene.add(earth.threeObject);

        var axisHelper = new THREE.AxisHelper(5);

        Scene.scene.add(axisHelper);

        var size = 15;
        var step = 1;

        var gridHelper = new THREE.GridHelper(size, step);

        Scene.scene.add(gridHelper, earth.threeObject);
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
