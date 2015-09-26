define(
[
  'Environment/Constants'
],
function(Constants) {
    'use strict';

    class OrbitController {
        constructor(planet) {
            this._planet = planet;
            this._threePlanet = planet.threeObject;
            this._distanceFromParent = planet.threeDistanceFromParent;
        }

        positionObject(fakeTime) {
            var doy = new Date().getDOYwithTimeAsDecimal(3); // Maybe try not calling this every time
            var theta = doy * (360 / this._planet.orbitalPeriod) * Constants.degreesToRadiansRatio;

            console.debug('theta', theta);
            console.debug('_distanceFromParent', this._distanceFromParent);

            var posX = this._distanceFromParent * Math.sin(theta);
            var posY = this._distanceFromParent * Math.cos(theta);

            console.debug('X: ', posX);
            console.debug('Y: ', posY);

            this._threePlanet.position.set(
                parseFloat(posX),
                0,
                parseFloat(posY)
            );
        };
    }

    return OrbitController;
});
