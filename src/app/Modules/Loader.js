define(
[
    'jquery',
    'Models/Planet',
    'Modules/Scene'
],
function($, Planet, Scene) {
    'use strict';

    var getSolarSystemData = $.ajax({
        url: 'http://www.solarsystem.lcl/src/data/solarsystem.json',
        dataType: 'json'
    });

    getSolarSystemData.done(function(data) {
        console.log('Solar System data? ', data);

        var planets = data.planets;

        for (var i = 0; i < planets.length; i++) {
            var planet = new Planet(planets[i]);

            if (i === 2) {
                console.log('THREE diameter:', planet.threeDiameter);
                console.log('Planet:', planet.threeObject.geometry);

                console.log(Scene);
                Scene.scene.add(planet.threeObject);
            }

            // console.log('Planet:', planet);
        }
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
