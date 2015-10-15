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

      this.initListeners();
    }

    initListeners() {
      document.addEventListener('day', (e)=> {
        // console.debug('Day event:', e.detail);

        this.positionObject(e.detail.day, e.detail.segmentOfDay);
      }, false);
    }

    positionObject(day) {
      var doy = day || 1;
      var theta = doy * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
      var x = (this._planet.threeParent.threeRadius + this._distanceFromParent) * Math.cos(theta);
      var y = (this._planet.threeParent.threeRadius + this._distanceFromParent) * Math.sin(theta);

      x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
      y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

      this._threePlanet.position.set(x, y, 0);
    };
  }

  return OrbitController;
});
