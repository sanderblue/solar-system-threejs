define(function() {
    'use strict';

    /**
     * TimeController
     *
     * Creates the universal time for the application. The current time is held in the
     * clock property.
     *
     * 1 Earth Day = 24 seconds
     */
    class TimeController {
      constructor() {
        this._offset = null;
        this._clock = 1;
        this._interval = null;
        this._delay = 1000;
        this._isPaused = true;
        this._earthDay = 24000;
      }

      start() {
        this._isPaused = false;

        if (!TimeController.interval) {
          this._offset = Date.now();

          this._interval = setInterval(() => {
            this._clock += this.getDelta(this._offset);
          }, this._delay);
        }
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

      getTime() {
        return this._clock;
      };
    }

    return new TimeController();
});
