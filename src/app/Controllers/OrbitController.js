define(
[
  'Environment/Constants',
  'Controllers/TimeController',
  'Modules/Clock'
],
function(Constants, TimeController, Clock) {
  'use strict';

  var clock = new Clock();

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
      var tic = 0;
      var min = 0;
      var count = 0;
      var offset = 0.1 / 1440;

      // setInterval(() => {
      //   tic++;

      //   if (tic % 60 === 0) {
      //     min++;

      //     var theta = tic * (360 / this._planet.orbitalPeriod);
      //   }
      // }, 1000);

      document.addEventListener('frame', (e)=> {
        count = count + offset;

        if (count === 3600) {
          count = 0;
        }

        this.positionObject(count);
        this.rotateObject();
      }, false);
    }

    positionObject(time) {
      var time = clock.getElapsedTime() / 60;

      var doy = time || 0.001; // || day
      var theta = time * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
      var x = this._orbitAmplitude * Math.cos(theta);
      var y = this._orbitAmplitude * Math.sin(theta);

      x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
      y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

      this._threePlanet.position.set(x, y, 0);
      this._planet.core.position.set(x, y, 0);

      if (timeParsedInteger > 0 && timeParsedInteger % 60 === 0) {
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
