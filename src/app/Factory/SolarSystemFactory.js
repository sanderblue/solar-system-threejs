define(
[
  'Environment/GridHelper',
  'Modules/Scene',
  'Factory/StarFactory',
  'Models/Sun',
  'Models/Planet',
  'Models/Moon',
  'Controllers/RenderController',
  'Controllers/OrbitController',
  'Controllers/TravelController',
  'Controllers/MenuController',
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
  MenuController,
  OrbitControls
) {
  'use strict';

  function SolarSystemFactory(data) {
    this.scene = new Scene();
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];
    this.solarSystemObjects = [];
  }

  SolarSystemFactory.prototype.buildMoons = function(planetData, planet) {
    for (var i = 0; i < planetData.satellites.length; i++) {
      var moon = new Moon(planetData.satellites[i], planet, planetData);
      var orbitCtrlMoon = new OrbitController(moon);

      planet.core.add(moon.orbitCentroid);
    }
  };

  SolarSystemFactory.prototype.buildPlanets = function(planets, sun) {
    var threePlanets = [];

    for (var i = 0; i < planets.length; i++) {
      var planet = new Planet(planets[i], sun);
      var orbitCtrl = new OrbitController(planet);

      this.scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (planets[i].satellites.length) {
        this.buildMoons(planets[i], planet);
      }

      if (planet.id === 6) {
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
      this.solarSystemObjects.push(planet);
    }

    return threePlanets;
  };

  SolarSystemFactory.prototype.buildSun = function(parentData, scene) {
    var sun = new Sun(parentData);

    this.scene.add(sun.threeObject);

    return sun;
  };

  SolarSystemFactory.prototype.build = function(data) {
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
    var endTime = new Date().getTime();
    var endEvent = new CustomEvent('build.solarsystem.end', {
      detail: {
        timestamp: endTime,
        elapsedTime: (endTime - startTime) * 0.001
      }
    });

    document.dispatchEvent(endEvent);

    var accordion = new Foundation.Accordion($('#menu').find('.accordion'), {
      allowAllClosed: true
    });

    var menuController = new MenuController({
      el: '#menu',
      scene: this.scene,
      data: this.data,
      sceneObjects: this.solarSystemObjects
    });
  };

  SolarSystemFactory.prototype.buildStars = function(scene) {
    var starFactory = new StarFactory(this.scene);

    starFactory.buildStarField();
  };

  return SolarSystemFactory;
});
