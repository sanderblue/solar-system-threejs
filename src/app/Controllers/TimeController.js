define(function() {
    'use strict';

    /**
     * TimeController
     *
     * Creates the universal time for the application. The current time is held in the
     * clock property. In Three.js, rotation units are measured in radians.
     *
     *  Examples:
     *    mesh.rotation.x += 1;                  // 1 degree per frame
     *    mesh.rotation.x += 45 * Math.PI / 180  // Rotates  45 degrees per frame
     *
     *
     * 1 Earth Day = 24 seconds
     */
    class TimeController {
      constructor() {
        this._offset = null;
        this._clock = 1;
        this._interval = null;
        this._delay = 100;
        this._isPaused = true;
        this._earthDay = 24000;
        this._threeClock = new THREE.Clock();
      }

      start() {
        this._isPaused = false;

        if (!this._interval) {
          this._offset = Date.now();

          this._interval = setInterval(() => {

            // console.debug('Time:', this._clock);

            this._clock += this.getDelta(this._offset);
          }, this._delay);
        }
      };

      get time() {
        return this._clock;
      };

      get threeClock() {
        return this._threeClock;
      };

      stop() {
        this._isPaused = true;
        this._interval = null;

        clearInterval(this._interval);
      };

      reset() {
        this._clock = 0;
      };

      getDelta(offset) {
        var now = Date.now(),
            os  = offset ? offset : 1,
            d   = now - os
        ;

        this._offset = now;

        return d;
      };
    }

    return new TimeController();
});
