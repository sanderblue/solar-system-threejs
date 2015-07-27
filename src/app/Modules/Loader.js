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

        var iterationDurations = [];

        var start = new Date().getTime();

        for (var i = 0; i < 5000; i++) {
            var a = new Date().getTime();

            var earth = new Planet(planets[2]);

            var b = new Date().getTime();

            iterationDurations.push(getElapsedTimeMs(a, b));

            // if (i == 1000) {
            //     console.log('Elapsed Time at 1000:', getAverageElapsedTime(iterationDurations));
            // }

            // if (i == 3000) {
            //     console.log('Elapsed Time 3000:', getAverageElapsedTime(iterationDurations));
            // }
        }

        var end = new Date().getTime();

        console.log('THREE diameter:', earth.threeDiameter);
        console.log('\n');
        console.log('\n');
        console.log('Total Elapsed Time :', getElapsedTimeSec(start, end));
        console.log('Total Elapsed Time Average:', getAvgElapsedTime(start, end, 5000));
        console.log('\n');

        // console.log('Scene', Scene);
        Scene.scene.add(earth.threeObject);


        // for (var i = 0; i < planets.length; i++) {
        //     var planet = new Planet(planets[i]);

        //     if (i === 2) {

        //     }

        //     // console.log('Planet:', planet);
        // }
    })
    // .then(function() {
    //     console.log('\n');
    //     console.log('And then?', App.camera);

    //     function render() {
    //         // console.log('poop');
    //         requestAnimationFrame(render);
    //         Scene.renderEngine.render(App.scene, App.camera);
    //     }
    //     render();
    // });
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
