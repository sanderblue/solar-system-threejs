define(
[
  'Environment/GridHelper',
  'Modules/Scene',
  'Factory/StarFactory',
  'Factory/AsteroidBeltFactory',
  'Models/Sun',
  'Models/Planet',
  'Models/Moon',
  'Controllers/RenderController',
  'Controllers/OrbitController',
  'Controllers/TravelController',
  'Controllers/MenuController',
  'Controllers/EffectsController',
  'Modules/RandomColorGenerator',
  'Listeners/FactoryListener'
],
function(
  GridHelper,
  Scene,
  StarFactory,
  AsteroidBeltFactory,
  Sun,
  Planet,
  Moon,
  RenderController,
  OrbitController,
  TravelController,
  MenuController,
  EffectsController,
  RandomColorGenerator
) {
  'use strict';

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
      this.scene.add(sun.threeObject)

      this.updateProgress(25);

      var map = {
        '1': {
          buildGroup: this.buildPlanets.bind(this, data.planets, sun),
          timeout: 500
        }
        // ,
        // '2': {
        //   buildGroup: this.buildAsteroidBelt.bind(this, data),
        //   timeout: 500
        // }
        // ,
        // '3': {
        //   buildGroup: this.buildStars.bind(this),
        //   timeout: 300
        // }
      };

      var percentage = 25;
      var i = 0;

      function run() {
        i++;

        var groupStartTime = new Date().getTime();

        if (map.hasOwnProperty(i)) {
          setTimeout(()=> {
            map[i].buildGroup.call().then((response)=> {
              var groupEndTime = new Date().getTime();
              var elapsedTime = (groupEndTime - groupStartTime) * 0.001;

              console.debug('Promise done.', i, response);
              console.debug('Elapsed time:', elapsedTime);
              console.debug('');

              percentage = percentage + 25;
              this.updateProgress(percentage);

              groupStartTime = groupEndTime;

              run.call(this);
            });
          }, 1000);

        } else {
          this.renderScene(startTime);

          /**********************************************/
          /* TESTING AREA */
            // Mars orbitOffset = 71 (dont forget to put this back to 71 in the json)

            // var testPlanet = this.solarSystemObjects.planets[3];

            // alert(testPlanet.theta);

            // var time = (clock.getElapsedTime() / 60) + (testPlanet.orbitPositionOffset);
            // var theta = time * (360 / testPlanet.orbitalPeriod) * 0.0174532925;

            // testPlanet.threeObject.add(new THREE.AxisHelper(500));

            // console.debug('Coordinates:\n',
            //   'x:' + Number.parseInt(testPlanet.threeObject.position.x), '\n',
            //   'y:' + Number.parseInt(testPlanet.threeObject.position.y)
            // );
            // console.debug('Orbit Radius:', Number.parseInt(testPlanet.threeDistanceFromParent));
            // console.debug('Theta in radians:', theta);
            // console.debug('Theta in degrees:', theta * 57.2958);
            // // console.debug('Clock:', window.clock);
            // //
            // var r1 = Number.parseInt(testPlanet.threeDistanceFromParent + 100);
            // var x1 = r1 * Math.cos(theta);
            // var y1 = r1 * Math.sin(theta);

            // var newPoint = new THREE.Object3D();
            // newPoint.position.x = x1;
            // newPoint.position.y = y1;
            // newPoint.position.z = 0;

            // newPoint.add(new THREE.AxisHelper(400));
            // this.scene.add(newPoint);


            // var gridHelper = new GridHelper(400000);
            // gridHelper.rotation.x = 90 * 0.0174532925;

            // this.scene.add(gridHelper);

            // this.scene.camera.position.set(
            //   0,
            //   0,
            //   40000
            // );

          /* END TESTING AREA */
          /***********************************************/
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
      12000,
      0,  // -27888,
      500
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
  };

  SolarSystemFactory.prototype.updateProgress = function(percentage, elapsedTime) {
    var meter = $('.progress-meter');

    // console.debug('Update Progress', meter[0].style.transitionDuration);

    // meter.css({
    //   'transitionDuration': elapsedTime +'ms'
    // });

    meter.width(percentage+ '%');
  };

  return SolarSystemFactory;
});


// function zoomModel(isZoomOut, scale) {
//   if (!isZoomOut) {
//       this.scene.orbitControls.dollyIn(scale);
//   }else{
//       this.scene.orbitControls.dollyOut(scale);
//   }

//   this.scene.orbitControls.update();
// }

// $('#zoom-in').on('click', ()=> {
//   console.debug('ZOoooooom...');

//   zoomModel.call(this, false, 1.1);
// });
