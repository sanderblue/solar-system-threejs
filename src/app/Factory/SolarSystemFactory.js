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
  'Controllers/EffectsController',
  'vendor/THREEOrbitControls/umd/index',
  'Modules/RandomColorGenerator',
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
  EffectsController,
  OrbitControls,
  RandomColorGenerator
) {
  'use strict';

  function SolarSystemFactory(data) {
    this.scene = new Scene();
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];
    this.solarSystemObjects = {
      planets: [],
      moons: []
    };

    this._randomColorGenerator = new RandomColorGenerator();
  }

  SolarSystemFactory.prototype.buildMoons = function(planetData, planet) {
    for (var i = 0; i < planetData.satellites.length; i++) {
      var orbitColor = this._randomColorGenerator.getRandomColor({
        luminosity: 'light',
        format: 'hex',
        hue: 'blue'
      });

      var moon = new Moon(planetData.satellites[i], planet, planetData, orbitColor);
      var orbitCtrlMoon = new OrbitController(moon);

      this.solarSystemObjects.moons.push(moon);

      planet._moons.push(moon);
      planet.core.add(moon.orbitCentroid);

      var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
        detail: moon
      });

      document.dispatchEvent(buildEvent);
    }
  };

  SolarSystemFactory.prototype.buildPlanets = function(planets, sun) {
    var threePlanets = [];

    for (var i = 0; i < planets.length; i++) {
      var startTime = new Date().getTime();
      var planet = new Planet(planets[i], sun);
      var orbitCtrl = new OrbitController(planet);

      this.scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (planets[i].satellites.length) {
        this.buildMoons(planets[i], planet);
      }

      threePlanets.push(planet.threeObject);
      this.solarSystemObjects.planets.push(planet);

      var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
        detail: planet
      });

      document.dispatchEvent(buildEvent);
    }

    return threePlanets;
  };

  SolarSystemFactory.prototype.buildSun = function(parentData, scene) {
    var sun = new Sun(parentData);

    this.scene.add(sun.threeObject);

    var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
      detail: sun
    });

    document.dispatchEvent(buildEvent);

    return sun;
  };

  SolarSystemFactory.prototype.build = function(data) {
    return new Promise((resolve, reject)=> {
      try {
        var planets = data.planets;
        var orbitControls = new OrbitControls(this.scene.camera);
        var startTime = new Date().getTime();
        var startEvent = new CustomEvent('solarsystem.start', {
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
        var endEvent = new CustomEvent('solarsystem.build.end', {
          detail: {
            timestamp: endTime,
            elapsedTime: (endTime - startTime) * 0.001
          }
        });

        // Add camera to a planet to start off
        this.solarSystemObjects.planets[2].core.add(this.scene.camera);
        this.scene.camera.up.set(0, 0, 1);
        this.scene.camera.position.set(
          5,
          -3,
          0.5
        );

        this.scene.camera.lookAt(new THREE.Vector3());

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

        var effectsController = new EffectsController({
          el: '#toggle-effects',
          sceneObjects: this.solarSystemObjects.planets
        });

        resolve();
      } catch(e) {
        reject(e);

        throw new Error(e);
      }
    });
  };

  SolarSystemFactory.prototype.buildStars = function(scene) {
    var starFactory = new StarFactory(this.scene);

    starFactory.buildStarField();
  };

  return SolarSystemFactory;
});
