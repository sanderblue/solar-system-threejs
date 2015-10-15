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

      this.initListeners();
    }

    initListeners() {
      var frame = 0;

      document.addEventListener('day', (e) => {

        console.debug('Day event:', e.detail);


        // frame++;

        // this.positionObject(fakeTime);

        // if (frame % 60 === 0) {
        //   console.debug('Day Passed:', fakeTime);
        //   console.debug('TimeController Time:', TimeController);

        //   fakeTime++;

          this.positionObject(e.detail.day);
        // }
      }, false);
    }

    positionObject(fakeTime) {

      console.debug('Fake Time: ', fakeTime);

      var doy = fakeTime || 1; // new Date().getDOYwithTimeAsDecimal(3); // Maybe try not calling this every time
      var theta = doy * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
      var x = (this._planet.threeParent.threeRadius + this._distanceFromParent) * Math.cos(theta);
      var y = (this._planet.threeParent.threeRadius + this._distanceFromParent) * Math.sin(theta);

      x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
      y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

      // console.debug('Test - X: ', x);
      // console.debug('Test - Y: ', y);

      // x = 0;
      // y = 0;

      this._threePlanet.position.set(x, y, 0);
    };
  }

  return OrbitController;
});
