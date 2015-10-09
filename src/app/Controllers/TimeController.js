define(function() {
  'use strict';

  var today = new Date();
  var year = today.getFullYear(today);
  var dayOfYear = today.getDayOfYear(today);

  console.debug('Year:', year);
  console.debug('Day Of Year:', dayOfYear);

  var TimeCtrl = {
    _year: year,
    _day: dayOfYear,
    _offset: null,
    _time: 1,
    _interval: null,
    _delay: 1000,
    _isPaused: true,
    _threeClock: new THREE.Clock(),

    start: function() {
      console.debug('START: ', TimeCtrl._delay);

      // setInterval(() => {

      //   console.debug('Day: ', TimeCtrl._day);

      //   if (TimeCtrl._day === 365) {
      //       TimeCtrl._day = 1;
      //       TimeCtrl._year++;
      //   }

      // }, TimeCtrl._delay);
    },

    getDayOfYear: function() {
      return TimeCtrl._day;
    },

    init: function() {
      document.addEventListener('startTime', () => {
        console.debug('Start...');

        TimeCtrl.start();
      }, false);
    }
  };

  TimeCtrl.init();

    // class TimeController {
    //   constructor() {
    //     this._offset = null;
    //     this._time = 1;
    //     this._interval = null;
    //     this._delay = 1000;
    //     this._isPaused = true;
    //     this._earthDay = 24 * 1000;
    //     this._threeClock = new THREE.Clock();
    //   }

    //   start() {
    //     var self = this;

    //     this._isPaused = false;

    //     if (!this._interval) {
    //       this._offset = Date.now();

    //       this._interval = setInterval(function() {
    //         self.time += self.getDelta(self._offset);
    //         window.time += self.getDelta(self._offset);
    //       }, this._delay);
    //     }
    //   };

    //   set time(time) {
    //     // console.debug('SET TIME', time);

    //     this._time = time;
    //   }

    //   get time() {
    //     return this._time
    //   };

    //   get threeClock() {
    //     return this._threeClock;
    //   };

    //   getTime() {
    //     return this.time;
    //   }

    //   stop() {
    //     this._isPaused = true;
    //     this._interval = null;

    //     clearInterval(this._interval);
    //   };

    //   reset() {
    //     this._time = 0;
    //   };

    //   getDelta(offset) {
    //     var now = Date.now(),
    //         os  = offset ? offset : 1,
    //         d   = now - os
    //     ;

    //     return d;
    //   };
    // }

    return TimeCtrl;
});
