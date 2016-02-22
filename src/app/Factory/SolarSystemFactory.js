define(
[
  'Environment/GridHelper',
  'Modules/Scene',
  'Modules/StarFactory',
  'Models/Sun',
  'Models/Planet',
  'Models/Moon',
  'Controllers/RenderController',
  'Controllers/OrbitController',
  'Controllers/TravelController',
  'vendor/THREEOrbitControls/umd/index'
],
function(
  GridHelper,
  Scene,
  StarFactory,
  Sun,
  Planet,
  Moon,
  RenderController,
  OrbitController,
  TravelController,
  OrbitControls
) {
  'use strict';

  class SolarSystemFactory {
    contructor() {

    }

    build(data) {
      var scene = new Scene();
      var planets = data.planets;
      var threePlanets = [];
      var axisHelper = new THREE.AxisHelper(1000);
      var gridHelper = new GridHelper();
      var start = new Date().getTime();
      var sun = new Sun(data.parent);
      var startEvent = new CustomEvent('startTime', {});
      var orbitControls = new OrbitControls(scene.camera);
      var starFactory = new StarFactory(scene);

      window.SOLAR_SYSTEM_OBJECTS = [];

      starFactory.build();

      var travelTo = null;

      document.dispatchEvent(startEvent);

      for (var i = 0; i < planets.length; i++) {
        var planet = new Planet(planets[i], sun);
        var orbitCtrl = new OrbitController(planet);

        scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

        if (planet.id === 3) {
          travelTo = planet;

          var moon = new Moon(planets[i].satellites[0], planet);

          console.debug('Moon', moon);

          var orbitCtrlMoon = new OrbitController(moon);

          planet.core.add(moon.threeObject);
        }

        if (planet.id === 8) {
          // var axisHelperPlanet = new THREE.AxisHelper(planet.threeDiameter);

          // planet.threeObject.add(axisHelperPlanet);
          planet.core.add(scene.camera);

          scene.camera.up.set(0, 0, 1);

          scene.camera.position.set(
            planet.threeDiameter * 3, // pluto.threeObject.position.x, // 350
            0, // 0
            0 // cameraHeight // 0
          );

          scene.camera.lookAt(new THREE.Vector3());
        }

        threePlanets.push(planet.threeObject);
        SOLAR_SYSTEM_OBJECTS.push(planet.threeObject);
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

      var endEvent = new CustomEvent('endEvent', {
        detail: SOLAR_SYSTEM_OBJECTS
      });

      setTimeout(()=> {
        var cameraParentPosition = scene.camera.parent.position;

        travelController.travelToPoint(cameraParentPosition, travelTo);
      }, 2000);
    };
  };

  return SolarSystemFactory;
});
