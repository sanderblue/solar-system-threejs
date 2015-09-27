define(
[
  'Environment/Constants'
],
function(Constants) {
    'use strict';

    const COORDINATE_PRECISION = 4;

    class OrbitController {
        constructor(planet) {
            this._planet = planet;
            this._threePlanet = planet.threeObject;
            this._distanceFromParent = planet.threeDistanceFromParent;
        }

        positionObject(fakeTime) {
            var doy = 0; // new Date().getDOYwithTimeAsDecimal(3); // Maybe try not calling this every time
            var theta = doy * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;
            var x = this._distanceFromParent * Math.sin(theta);
            var y = this._distanceFromParent * Math.cos(theta);

            x = Number.parseFloat(x.toFixed(COORDINATE_PRECISION));
            y = Number.parseFloat(y.toFixed(COORDINATE_PRECISION));

            console.debug('Test - X: ', x);
            console.debug('Test - Y: ', y);

            x = 0;
            y = 0;

            this._threePlanet.position.set(x, y, 0);
        };
    }

    return OrbitController;
});
