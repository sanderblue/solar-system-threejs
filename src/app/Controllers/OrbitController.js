define(
[
  'Environment/Constants',
  'Controllers/TimeController',
  'Modules/Clock'
],
function(Constants, TimeController, Clock) {
  'use strict';

  var clock = new Clock();
  var prevTime = 0;

  clock.start();

  const COORDINATE_PRECISION = 2;

  class OrbitController {
    constructor(planet) {
      this._planet = planet;
      this._threePlanet = planet.threeObject;
      this._distanceFromParent = planet.threeDistanceFromParent;
      this._segmentsInDay = 1;
      this._currentDay = 1;
      this._orbitAmplitude = this._planet.threeParent.threeRadius + this._distanceFromParent;
      this._degreesToRotate = 0.1; // 1 min = 1 day

      this.initListeners();
    }

    initListeners() {
      document.addEventListener('frame', (e)=> {
        this.positionObject();
        this.rotateObject();
      }, false);
    }

    positionObject() {
      var time = clock.getElapsedTime() / 60;

      var doy = time || 0.001; // || day
      var theta = time * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
      var x = this._orbitAmplitude * Math.cos(theta);
      var y = this._orbitAmplitude * Math.sin(theta);

      x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
      y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

      this._threePlanet.position.set(x, y, 0);
      this._planet.core.position.set(x, y, 0);

      var timeParsed = Number.parseInt(time);

      if (timeParsed > prevTime) {
        prevTime = timeParsed;

        console.debug(
          '\n',
          'Clock: ', clock.getElapsedTime(),
          '\n'
        );
      }

      if (timeParsed > 0 && timeParsed % 60 === 0) {
        console.debug(
          '\n',
          'Clock: ', clock.getElapsedTime(),
          '\n'
        );

        clock = new Clock(true);
      }
    };

    rotateObject() {
      this._threePlanet.rotation.y += this._degreesToRotate * Math.PI / 180; // 1 degree per frame

    }
  }

  return OrbitController;
});
