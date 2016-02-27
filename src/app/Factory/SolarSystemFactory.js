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
  'vendor/THREEOrbitControls/umd/index',
  'Listeners/FactoryListener'
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

  function logTimeElapsed(start, end) {
    var elapsed = (end - start) * 0.001;;

    console.debug('Build time: ', elapsed + 'seconds');
  }

  function SolarSystemFactory(data) {
    this.scene = new Scene();
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];
    this.solarSystemObjects = [];
  }

  SolarSystemFactory.prototype.buildPlanets = function(planets, sun) {
    var threePlanets = [];

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      var orbitCtrl = new OrbitController(planet);

      this.scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (planet.id === 3) {
        var moon = new Moon(planets[i].satellites[0], planet);
        var orbitCtrlMoon = new OrbitController(moon);

        planet.core.add(moon.threeObject);
      }

      if (planet.id === 3) {
        planet.core.add(this.scene.camera);

        this.scene.camera.up.set(0, 0, 1);
        this.scene.camera.position.set(
          planet.threeDiameter * 2.5,
          0,
          0
        );

        this.scene.camera.lookAt(new THREE.Vector3());
      }

      threePlanets.push(planet.threeObject);
    }

    return threePlanets;
  };

  SolarSystemFactory.prototype.buildSun = function(parentData, scene) {
    var sun = new Sun(parentData);

    this.scene.add(sun.threeObject);

    return sun;
  };

  SolarSystemFactory.prototype.renderScene = function(data) {
    var planets = data.planets;
    var orbitControls = new OrbitControls(this.scene.camera);
    var startTime = new Date().getTime();
    var startEvent = new CustomEvent('build.solarsystem.start', {
      detail: {
        timestamp: new Date().getTime()
      }
    });

    document.dispatchEvent(startEvent);

    this.buildStars(this.scene);
    var sun = this.buildSun(data.parent, this.scene);
    var threePlanets = this.buildPlanets(planets, sun);
    var renderController = new RenderController(this.scene, threePlanets);
    var travelController = new TravelController(this.scene);
    var endTime = new Date().getTime();
    var endEvent = new CustomEvent('build.solarsystem.end', {
      detail: {
        timestamp: endTime,
        elapsedTime: getElapsedTime(startTime, endTime)
      }
    });

    document.dispatchEvent(endEvent);
  };

  SolarSystemFactory.prototype.travelTo = function(scene, object) {
    var cameraParentPosition = this.scene.camera.parent.position;

    travelController.travelToPoint(cameraParentPosition, object);
  };

  SolarSystemFactory.prototype.buildStars = function(scene) {
    var starFactory = new StarFactory(this.scene);

    starFactory.build();
  };

  function getElapsedTime(start, end) {
    return (end - start) * 0.001;
  }

  return SolarSystemFactory;
});
