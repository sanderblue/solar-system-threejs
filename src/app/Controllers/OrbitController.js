define(function() {
    'use strict';

    class OrbitController {
        constructor(planet) {
            this._planet = planet;
            this._threePlanet = planet.threeObject;
            this._distanceFromParent = planet.threeObject.position.x;
        }

        positionObject(fakeTime) {
            var count = fakeTime;

            var posX = (this._distanceFromParent)
                        * Math.sin(
                            count
                            * (360 / this._planet.orbitalPeriod)
                            * 0.0174532925
                        );

            var posY = (this._distanceFromParent)
                        * Math.cos(
                            count
                            * (360 / this._planet.orbitalPeriod)
                            * 0.0174532925
                        );

            this._threePlanet.position.set(
                parseFloat(posX),
                0,
                parseFloat(posY)
            );

            // if (this.object.celestialType) {
            //     this.object3d.position.set(
            //         parseFloat(posX),
            //         parseFloat(posY),
            //         0
            //     );
            // } else {
            //     // Axis is flipped in this case
            //     this.object3d.position.set(
            //         parseFloat(posX),
            //         0,
            //         parseFloat(posY)
            //     );
            // }
        };

        animateOrbit() {
            var fakeTime = 0;

            setInterval(() => {
                fakeTime = fakeTime + 1;

                this.positionObject(fakeTime);
            }, 10);
        };
    }

    return OrbitController;
});
