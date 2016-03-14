define(function() {
    'use strict';

    function logStart() {

    }

    function logEnd(event) {
      console.log('Build took', event.detail);
    }

    var i = 0;

    function logObjectComplete(event) {
      // var object =  event.detail;

      // console.debug('Done building ', event.detail);
      // console.debug('Build took', detail.elapsedTime);
    }

    document.addEventListener('solarsystem.build.start', logStart);
    document.addEventListener('solarsystem.build.end', logEnd);
    document.addEventListener('solarsystem.build.object.complete', logObjectComplete);
});
