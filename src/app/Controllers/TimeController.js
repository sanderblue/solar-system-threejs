define(
[

],
function() {
  'use strict';

  var today = new Date();
  var year = today.getFullYear(today);
  var dayOfYear = Math.floor(today.getDOYwithTimeAsDecimal());

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

    start: function() {
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
          TimeCtrl._day = TimeCtrl._day + (1 / TimeCtrl._segmentsInDay);
        }
      }, interval);
    },

    getDayOfYear: function() {
      return TimeCtrl._day;
    },

    getTotalElapsedDays: function() {
      return TimeCtrl._totalElapsedDays;
    },

    init: function() {
      // document.addEventListener('startTime', () => {
      //   TimeCtrl.start();
      // }, false);
    }
  };

  // TimeCtrl.init();

  return TimeCtrl;
});
