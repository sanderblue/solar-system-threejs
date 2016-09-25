define(
[
  'Environment/GridHelper',
  'Modules/Scene',
  'Factory/StarFactory',
  'Factory/AsteroidBeltFactory',
  'Factory/KuiperBeltFactory',
  'Models/Sun',
  'Models/Planet',
  'Models/Moon',
  'Controllers/RenderController',
  'Controllers/OrbitController',
  'Controllers/TravelController',
  'Controllers/MenuController',
  'Controllers/EffectsController',
  'Modules/RandomColorGenerator',
  'Environment/Constants',
  'vendor/three-text2d/dist/three-text2d',
  'Listeners/FactoryListener'
],
function(
  GridHelper,
  Scene,
  StarFactory,
  AsteroidBeltFactory,
  KuiperBeltFactory,
  Sun,
  Planet,
  Moon,
  RenderController,
  OrbitController,
  TravelController,
  MenuController,
  EffectsController,
  RandomColorGenerator,
  Constants,
  ThreeText
) {
  'use strict';

  /**
   * SolarSystemFactory
   *
   * @param {Object} data
   */
  function SolarSystemFactory(data) {
    this.scene = new Scene();
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];

    this.solarSystemObjects = {
      sun: null,
      planets: [],
      moons: []
    };

    this._randomColorGenerator = new RandomColorGenerator();
  }

  /**
   * Builds all objects in the scene.
   *
   * @param  {Object}  data
   * @return {Promise}
   */
  SolarSystemFactory.prototype.build = function(data) {
    return new Promise((resolve)=> {
      var startTime = new Date().getTime();
      var startEvent = new CustomEvent('solarsystem.build.start', {
        detail: {
          timestamp: startTime
        }
      });

      var sun = this.buildSun(data.parent);
      this.solarSystemObjects.sun = sun;
      this.scene.add(sun.threeObject);

      var map = {
        '1': {
          buildGroup: this.buildPlanets.bind(this, data.planets, sun),
          timeout: 500
        }
        ,
        '2': {
          buildGroup: this.buildAsteroidBelt.bind(this, data),
          timeout: 500
        }
        ,
        '3': {
          buildGroup: this.buildKuiperBelt.bind(this, data),
          timeout: 300
        }
        ,
        '4': {
          buildGroup: this.buildStars.bind(this),
          timeout: 300
        }
      };

      var buildGroupsCount = Object.keys(map).length;
      var i = 0;

      function run() {
        i++;

        var groupStartTime = new Date().getTime();

        if (map.hasOwnProperty(i)) {
          setTimeout(()=> {
            map[i].buildGroup.call().then((response)=> {
              var groupEndTime = new Date().getTime();
              var elapsedTime = (groupEndTime - groupStartTime) * 0.001;
              var percentage = (i / 4) * 100;

              this.updateProgress(percentage);

              groupStartTime = groupEndTime;

              run.call(this);
            });
          }, 1000);

        } else {
          this.renderScene(startTime);
          resolve();
        }
      }

      run.call(this);
    });
  };

  SolarSystemFactory.prototype.renderScene = function(startTime) {
    var renderController = new RenderController(this.scene);
    var focalpoint = this.scene;

    focalpoint.add(this.scene.camera);
    this.scene.camera.up.set(0, 0, 1);
    this.scene.camera.position.set(
      60000,
      0,
      15000
    );

    var focalPointChangeEvent = new CustomEvent('solarsystem.focalpoint.change', {
      detail: {
        object: focalpoint
      }
    });

    this.scene.camera.lookAt(new THREE.Vector3());
    document.dispatchEvent(focalPointChangeEvent);

    this.initializeUserInterface();

    var endTime = new Date().getTime();
    var endEvent = new CustomEvent('solarsystem.build.end', {
      detail: {
        elapsedTime: (endTime - startTime) * 0.001
      }
    });

    document.dispatchEvent(endEvent);
  };

  /**
   * Right now this basically just renders the prototype of the ISS. I'd like to get this to
   * work with man-made satellites and model those as well.
   */
  SolarSystemFactory.prototype.buildMechanicalSatellites = function(planet, satellitesData) {

    // console.debug('Build Mech Satellite', planet, satellitesData);

    if (!(satellitesData instanceof Array)) {
      throw new Error('Argument satellitesData must be an instanceof Array.');
    }

    var mesh = new THREE.Mesh(
      new THREE.SphereGeometry(
          0.002,
          16,
          16
        ),
        new THREE.MeshPhongMaterial()
      )
    ;

    var threeRadius = planet.threeDiameter / 2;
    var threeDistanceFromParent = threeRadius + 400 * Constants.universeScale;

    for (var i = 0; i < satellitesData.length; i++) {
      planet.threeObject.add(mesh);

      mesh.position.x = threeDistanceFromParent;
    }
  };

  SolarSystemFactory.prototype.buildMoons = function(planetData, planet) {
    for (var i = 0; i < planetData.satellites.length; i++) {
      var orbitColor = this._randomColorGenerator.getRandomColor({
        luminosity: 'light',
        format: 'hex',
        hue: 'blue'
      });

      var moon = new Moon(planetData.satellites[i], planet, planetData, orbitColor);
      var orbitCtrlMoon = new OrbitController(moon, false);

      this.solarSystemObjects.moons.push(moon);

      planet._moons.push(moon);
      // planet.threeObject.add(moon.orbitCentroid);
      // planet.objectCentroid.add(moon.orbitCentroid);

      planet.core.add(moon.orbitCentroid);

      var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
        detail: {
          object: moon
        }
      });

      document.dispatchEvent(buildEvent);
    }
  };

  SolarSystemFactory.prototype.buildPlanet = function(data, sun) {
    return new Promise((resolve)=> {
      var startTime = new Date().getTime();
      var planet = new Planet(data, sun);
      var orbitCtrl = new OrbitController(planet);

      this.scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (data.satellites.length) {
        this.buildMoons(data, planet);
      }

      if (data.satellites_mech && data.satellites_mech.length) {
        this.buildMechanicalSatellites(planet, data.satellites_mech);
      }

      this.solarSystemObjects.planets.push(planet);

      var endTime = new Date().getTime();

      resolve({
        planet: planet,
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildPlanets = function(planets, sun) {
    return new Promise((resolve)=> {
      var startTime = new Date().getTime();
      var promises = [];
      var endCount = planets.length - 1;
      var i;

      for (i = 0; i < planets.length; i++) {
        var startTime = new Date().getTime();

        promises.push(this.buildPlanet(planets[i], sun).then((response)=> {
          var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
            detail: {
              object: response.planet
            }
          });

          document.dispatchEvent(buildEvent);

          this.solarSystemObjects.planets.push(response.planet);
        }));
      }

      Promise.all(promises).then(()=> {
        var endTime = new Date().getTime();

        resolve({
          group: 'planets',
          elapsedTime: (endTime - startTime) * 0.001
        });
      });
    });
  };

  SolarSystemFactory.prototype.buildSun = function(parentData) {
    var sun = new Sun(parentData);

    this.solarSystemObjects.sun = sun;

    var buildEvent = new CustomEvent('solarsystem.build.object.complete', {
      detail: {
        object: sun
      }
    });

    document.dispatchEvent(buildEvent);

    return sun;
  };

  SolarSystemFactory.prototype.buildAsteroidBelt = function(data) {
    var startTime = new Date().getTime();
    var asteroidBeltFactory = new AsteroidBeltFactory(this.scene, data);

    return new Promise((resolve)=> {
      asteroidBeltFactory.build();

      var endTime = new Date().getTime();

      resolve({
        group: 'asteroids',
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildKuiperBelt = function(data) {
    var startTime = new Date().getTime();
    var kuiperBeltFactory = new KuiperBeltFactory(this.scene, data);

    return new Promise((resolve)=> {
      kuiperBeltFactory.build();

      var endTime = new Date().getTime();

      resolve({
        group: 'asteroids',
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildStars = function() {
    var startTime = new Date().getTime();
    var starFactory = new StarFactory(this.scene);

    return new Promise((resolve)=> {
      starFactory.buildStarField().then(()=> {
        var endTime = new Date().getTime();

        resolve({
          group: 'stars',
          elapsedTime: (endTime - startTime) * 0.001
        });
      });
    });
  };

  SolarSystemFactory.prototype.initializeUserInterface = function(currentTarget) {
    var menuController = new MenuController({
      el: '#menu',
      scene: this.scene,
      data: this.data,
      sceneObjects: this.solarSystemObjects,
      currentTarget: currentTarget
    });

    var effectsController = new EffectsController({
      el: '#toggle-effects',
      sceneObjects: this.solarSystemObjects.planets
    });

    $('#social-buttons-corner').addClass('visible');
  };

  SolarSystemFactory.prototype.updateProgress = function(percentage, elapsedTime) {
    var meter = $('.progress-meter');

    meter.css({
      'transitionDuration': elapsedTime +'ms'
    });

    meter.width(percentage+ '%');
  };

  return SolarSystemFactory;
});
