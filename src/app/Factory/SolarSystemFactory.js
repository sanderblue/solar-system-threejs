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
  OrbitControls
) {
  'use strict';

  function SolarSystemFactory(data) {
    this.scene = new Scene();
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];
    this.solarSystemObjects = [];

    document.addEventListener('solarsystem.build.planet.end', (e)=> {
      console.debug('solarsystem.build.planet.end', e.detail);

      setTimeout(()=> {
        $('#render-scene').append('<div style="font-size: 16px;">'+ e.detail.planet.name + ' in '+ e.detail.elapsedTime + ' ms' +'</div>');
      }, 500);
    });
  }

  SolarSystemFactory.prototype.buildMoons = function(planetData, planet) {
    for (var i = 0; i < planetData.satellites.length; i++) {
      var moon = new Moon(planetData.satellites[i], planet, planetData, i + 1);
      var orbitCtrlMoon = new OrbitController(moon);

      planet._moons.push(moon);
      planet.core.add(moon.orbitCentroid);
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
      this.solarSystemObjects.push(planet);

      var endTime = new Date().getTime();
      var endEvent = new CustomEvent('solarsystem.build.planet.end', {
        detail: {
          planet: planet,
          timestamp: endTime,
          elapsedTime: endTime - startTime
        }
      });

      document.dispatchEvent(endEvent);
    }

    return threePlanets;
  };

  SolarSystemFactory.prototype.buildSun = function(parentData, scene) {
    var sun = new Sun(parentData);

    this.scene.add(sun.threeObject);

    return sun;
  };

  SolarSystemFactory.prototype.build = function(data) {
    return new Promise((resolve, reject)=> {
      try {
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

        sun.threeObject.add(this.scene.camera);

        this.scene.camera.up.set(1, 0, 0);
        this.scene.camera.position.set(
          sun.threeDiameter + 400,
          0,
          0
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
          sceneObjects: this.solarSystemObjects
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
