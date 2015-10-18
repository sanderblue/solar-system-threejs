define(
[
  'jquery',
  'Environment/Constants',
  'Environment/GridHelper',
  'Modules/Scene',
  'Models/Sun',
  'Models/Planet',
  'Models/Orbit',
  'Controllers/RenderController',
  'Controllers/OrbitController'
],
function($, Constants, GridHelper, Scene, Sun, Planet, Orbit, RenderController, OrbitController) {
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

  function logTimeElapsed(start, end) {
    console.log('\n');
    console.debug('Solar System Build Time:', getElapsedTimeSec(start, end) + ' seconds');
    console.log('\n');
  }

  var getSolarSystemData = $.ajax({
    url: 'http://www.solarsystem.lcl/src/data/solarsystem.json',
    dataType: 'json'
  });

  getSolarSystemData.done(function(data) {
    var planets = data.planets;
    var threePlanets = [];
    var axisHelper = new THREE.AxisHelper(1000);
    var gridHelper = new GridHelper(); // planets[7].distanceFromParent * Constants.celestialScale
    var start = new Date().getTime();
    var scene = new Scene();
    var sun = new Sun(data.parent);
    var startEvent = new CustomEvent('startTime', {});

    document.dispatchEvent(startEvent);

    var planet = new Planet(planets[2], sun);
    var orbitCtrl = new OrbitController(planet);

    var pluto = new Planet(planets[8], sun);

    console.debug('Earth Distance: ', planet.threeDistanceFromParent);
    console.debug('Pluto Distance: ', pluto.threeDistanceFromParent);

    orbitCtrl.positionObject();

    var axisHelperPlanet = new THREE.AxisHelper(planet.threeDiameter);

    planet.threeObject.add(axisHelperPlanet);

    threePlanets.push(planet.threeObject);

    var orbitLine = new Orbit(planet);

    scene.add(orbitLine.orbit);
    scene.add(planet.threeObject);
    scene.add(planet.core);

    var cameraHeight = sun.threeDiameter * 2;
    var cameraTarget = new THREE.Vector3(0, 0, 0); // planet.threeObject.position;

    // ADD CAMERA TO PLANET INSTEAD FOR NOW
    planet.core.add(scene.camera);

    scene.camera.up.set(0, 0, 1);

    scene.camera.position.set(
      50, // 350
      0, // 0
      10 // cameraHeight // 0
    );

    scene.camera.lookAt(cameraTarget);

    scene.add(
        axisHelper,
        // gridHelper,
        sun.threeObject
    );

    var renderController = new RenderController(scene, threePlanets);

    var end = new Date().getTime();

    logTimeElapsed(start, end);
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
