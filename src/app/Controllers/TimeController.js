define(
[

],
function() {
  'use strict';

  var today = new Date();
  var year = today.getFullYear(today);
  var dayOfYear = Math.floor(today.getDOYwithTimeAsDecimal());

  console.debug('Year:', year);
  console.debug('Day Of Year:', dayOfYear);

  var TimeCtrl = {
    _year: year,
    _day: dayOfYear,
    _totalElapsedDays: dayOfYear,
    _offset: null,
    _time: 0,
    _interval: null,
    _delay: 24000, // 24 seconds = 24 hrs
    _vertexesPerDay: 3,
    _isPaused: true,
    _segmentsInDay: 24000 / 100,
    _segmentOfDay: 1,
    _framesPerYear: 3600, // 60 fps * 60 secs = simulated earth day (1 minute = 1 day)
    // _threeClock: new THREE.Clock(),

    start: function() {
      console.debug('START TIME... \n');

      var segmentOfDay = 1;
      var interval = 3600 / 24; // TimeCtrl._delay / TimeCtrl._segmentsInDay;

      setInterval(() => {

        if (TimeCtrl._segmentsInDay > 1) {
          if (segmentOfDay < TimeCtrl._segmentsInDay) {
            segmentOfDay++;
          } else {
            segmentOfDay = 1;
          }
        }

        if (TimeCtrl._day === 365) {
          TimeCtrl._day = 1;
          TimeCtrl._year++;
        } else {
          // TimeCtrl._day++;
          TimeCtrl._day = TimeCtrl._day + (1 / TimeCtrl._segmentsInDay);
        }

        // console.debug('Day: ', TimeCtrl._day);

        // var dayEvent = new CustomEvent('day', {
        //   'detail': {
        //     'day': TimeCtrl._day,
        //     'totalElapsedDays': TimeCtrl._totalElapsedDays,
        //     'segmentOfDay': segmentOfDay
        //   }
        // });

        // document.dispatchEvent(dayEvent);

      }, interval);

      console.debug('TimeCtrl._delay / TimeCtrl._segmentsInDay: ', interval);
    },

    getDayOfYear: function() {
      return TimeCtrl._day;
    },

    getTotalElapsedDays: function() {
      return TimeCtrl._totalElapsedDays;
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
