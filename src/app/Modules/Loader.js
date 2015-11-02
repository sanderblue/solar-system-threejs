define(
[
  'jquery',
  'Environment/Constants',
  'Environment/GridHelper',
  'Modules/Scene',
  'Models/Sun',
  'Models/Planet',
  'Controllers/RenderController',
  'Controllers/OrbitController'
],
function($, Constants, GridHelper, Scene, Sun, Planet, RenderController, OrbitController) {
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
    var gridHelper = new GridHelper();
    var start = new Date().getTime();
    var scene = new Scene();
    var sun = new Sun(data.parent);
    var startEvent = new CustomEvent('startTime', {});

    document.dispatchEvent(startEvent);

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      var orbitCtrl = new OrbitController(planet);

      scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      // console.debug(planet.name + ' Diameter: ', planet.threeDiameter);
      // console.debug(planet.name + ' Distance: ', planet.threeDistanceFromParent);

      if (planet.id === 5) {
        var axisHelperPlanet = new THREE.AxisHelper(planet.threeDiameter);

        planet.threeObject.add(axisHelperPlanet);
        planet.core.add(scene.camera);

        scene.camera.up.set(0, 0, 1);

        scene.camera.position.set(
          planet.threeDiameter * 2.5, // pluto.threeObject.position.x, // 350
          0, // 0
          0.25 // cameraHeight // 0
        );

        scene.camera.lookAt(new THREE.Vector3(0, 0, 0));
      }

      threePlanets.push(planet.threeObject);

      orbitCtrl.positionObject();
    }

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
