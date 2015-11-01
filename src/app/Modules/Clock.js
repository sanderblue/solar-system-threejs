define(function() {
    'use strict';

    class Clock extends THREE.Clock {
        constructor(autoStart) {
            super(autoStart);
        }
    }

    return Clock;
});
