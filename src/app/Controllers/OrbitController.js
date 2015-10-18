define(
[
  'Environment/Constants',
  'Controllers/TimeController'
],
function(Constants, TimeController) {
  'use strict';

  const COORDINATE_PRECISION = 2;

  var time = TimeController._day;
  var fakeTime = time;

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

      setInterval(() => {
        tic++;

        console.debug('Tic: ', tic);
      }, 1000);

      document.addEventListener('frame', (e)=> {
        this.positionObject();
        this.rotateObject();
      }, false);
    }

    positionObject(day) {
      var doy = day || 0.0067; // || day
      var theta = doy * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
      var x = this._orbitAmplitude * Math.cos(theta);
      var y = this._orbitAmplitude * Math.sin(theta);

      x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
      y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

      this._threePlanet.position.set(x, y, 0);
    };

    rotateObject() {
      this._threePlanet.rotation.y += this._degreesToRotate * Math.PI / 180; // 1 degree per frame

    }
  }

  return OrbitController;
});
