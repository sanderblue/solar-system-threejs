define(function() {
    'use strict';

    function logStart() {

    }

    function logEnd(event) {
        console.log('Build took', event.detail);
    }

    function logObjectComplete(event) {
        var object =  event.detail;

        console.log('Done building ', object.name);
    }

    document.addEventListener('solarsystem.build.start', logStart);
    document.addEventListener('solarsystem.build.end', logEnd);
    document.addEventListener('solarsystem.build.object.complete', logObjectComplete);
});
