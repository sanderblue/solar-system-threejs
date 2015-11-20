define(
[
  'Environment/Constants',
  'Environment/GridHelper',
  'Modules/Scene',
  'Modules/StarFactory',
  'Models/Sun',
  'Models/Planet',
  'Controllers/RenderController',
  'Controllers/OrbitController',
  'Controllers/TravelController',
  'vendor/THREEOrbitControls/umd/index',
  'vendor/httprequest/httprequest'
],
function(
  Constants,
  GridHelper,
  Scene,
  StarFactory,
  Sun,
  Planet,
  RenderController,
  OrbitController,
  TravelController,
  OrbitControls,
  HttpRequest
  ) {
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

  var scene = new Scene();
  var dataRequest = new HttpRequest(
    'GET',
    'http://www.solarsystem.lcl/src/data/solarsystem.json',
    true
  );

  dataRequest.send().then(function(data) {
    var planets = data.planets;
    var threePlanets = [];
    var axisHelper = new THREE.AxisHelper(1000);
    var gridHelper = new GridHelper();
    var start = new Date().getTime();
    var sun = new Sun(data.parent);
    var startEvent = new CustomEvent('startTime', {});
    var orbitControls = new OrbitControls(scene.camera);
    var starFactory = new StarFactory(scene);

    starFactory.build();

    var travelTo = null;

    document.dispatchEvent(startEvent);

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      var orbitCtrl = new OrbitController(planet);

      scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (planet.id === 2) {
        travelTo = planet;
      }

      if (planet.id === 8) {
        // var axisHelperPlanet = new THREE.AxisHelper(planet.threeDiameter);

        // planet.threeObject.add(axisHelperPlanet);
        planet.core.add(scene.camera);

        scene.camera.up.set(0, 0, 1);

        scene.camera.position.set(
          planet.threeDiameter * 2.5, // pluto.threeObject.position.x, // 350
          0, // 0
          0.3 // cameraHeight // 0
        );

        // console.debug(
        //   scene.camera.position.distanceTo(planet.threeObject.position)
        // );

        scene.camera.lookAt(new THREE.Vector3());
      }

      threePlanets.push(planet.threeObject);
    }

    scene.add(
        // scene.camera,
        // axisHelper,
        // gridHelper,
        sun.threeObject
    );

    var renderController = new RenderController(scene, threePlanets);
    var travelController = new TravelController(scene);

    var end = new Date().getTime();

    setTimeout(()=> {
      var travelToPlanet = threePlanets[4];

      console.debug('CAMERA', scene.camera);

      var cameraParentPosition = scene.camera.parent.position;

      travelController.travelToPoint(cameraParentPosition, travelTo);
    }, 10000);

    // logTimeElapsed(start, end);
  });
});
