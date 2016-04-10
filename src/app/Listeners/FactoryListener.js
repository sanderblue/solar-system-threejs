define(function() {
    'use strict';

    document.addEventListener('solarsystem.build.start', logStart);
    document.addEventListener('solarsystem.build.end', logEnd);
    document.addEventListener('solarsystem.build.object.complete', logObjectComplete);

    function logStart() {

    }

    function logEnd(event) {
      // console.log('Build took', event.detail);
    }

    function logObjectComplete(event) {
      // var object =  event.detail;
      // console.debug('Done building ', event.detail);
      // console.debug('Build took', detail.elapsedTime);
    }
});
