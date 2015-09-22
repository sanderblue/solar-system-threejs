define(
[
  'jquery',
  'Modules/Scene',
  'Models/Sun',
  'Models/Planet',
  'Controllers/RenderController'
],
function($, Scene, Sun, Planet, RenderController) {
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
    var threePlanets = [];
    var viewPlanet;

    var start = new Date().getTime();
    var scene = new Scene();
    var sun = new Sun(data.parent);

    console.debug('Sun Diameter:', sun.threeDiameter);

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      var posX = parseInt(sun.threeRadius + planet.threeDistanceFromParent / 100); // testing purposes

      console.debug('Planet pos X:', posX);

      if (planets[i].id === 3) {
          viewPlanet = planet;
      }

      var axisHelperPlanet = new THREE.AxisHelper(3);

      planet.threeObject.add(axisHelperPlanet);

      planet.threeObject.position.x = posX;

      threePlanets.push(planet.threeObject);

      scene.add(planet.threeObject);
    }

    var end = new Date().getTime();

    console.log('\n');
    console.log('Total Elapsed Time :', getElapsedTimeSec(start, end));
    console.log('\n');

    var axisHelperScene = new THREE.AxisHelper(1000);

    var size = 2200;
    var step = 5;
    var gridHelperScene = new THREE.GridHelper(size, step);

    // gridHelperScene.rotation.x = 90 * 0.0174532925;

    if (viewPlanet instanceof Planet) {
        scene.camera.position.set(
            viewPlanet.threeObject.position.x + 3.8,
            1,
            0.25
        );

        scene.camera.up.set(0, 0, 1);
        // Scene.camera.position.z = viewPlanet.threeDiameter + 10;

        scene.camera.lookAt(viewPlanet.threeObject.position);
    }

    scene.add(
        axisHelperScene,
        gridHelperScene,
        sun.threeObject
    );

    var renderController = new RenderController(scene, threePlanets);
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
