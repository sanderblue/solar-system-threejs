define(
[
  'jquery',
  'Modules/Scene',
  'Models/Sun',
  'Models/Planet',
  'Controllers/RenderController',
  'Controllers/OrbitController'
],
function($, Scene, Sun, Planet, RenderController, OrbitController) {
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

    // console.debug('Sun Diameter:', sun.threeDiameter);

    var distance = 0;

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      // var posX = parseInt(sun.threeRadius + planet.threeDistanceFromParent / 2000); // testing purposes

      if (!i) {
        var posX = 0;
      } else {
        var posX = parseInt(planet.threeDiameter * 2.5);
      }

      distance = distance + posX;

      planet.threeObject.position.x = distance;

      console.debug('Planet pos X:', planet.threeObject.position.x);

      if (planets[i].id === 3) {
          viewPlanet = planet;

          var orbitCtrl = new OrbitController(planet);
          orbitCtrl.animateOrbit();
      }

      var axisHelperPlanet = new THREE.AxisHelper(3);

      planet.threeObject.add(axisHelperPlanet);

      threePlanets.push(planet.threeObject);

      scene.add(planet.threeObject);
    }

    var end = new Date().getTime();

    console.log('\n');
    console.debug('Solar System Build Time:', getElapsedTimeSec(start, end) + ' seconds');
    console.log('\n');

    var axisHelperScene = new THREE.AxisHelper(1000);

    var size = 2200;
    var step = 5;
    var gridHelperScene = new THREE.GridHelper(size, step);

    // gridHelperScene.rotation.x = 90 * 0.0174532925;

    if (viewPlanet instanceof Planet) {
        scene.camera.position.set(
            0, // viewPlanet.threeObject.position.x + 3.8,
            0,
            40
        );

        scene.camera.up.set(0, 0, 1);
        // Scene.camera.position.z = viewPlanet.threeDiameter + 10;

        // scene.camera.lookAt(viewPlanet.threeObject.position);
    }

    scene.camera.lookAt(new THREE.Vector3(0,0,0));

    scene.add(
        axisHelperScene,
        gridHelperScene
        // ,
        // sun.threeObject
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
