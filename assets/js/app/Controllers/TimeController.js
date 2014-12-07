define(function() {

    /**
     * TimeController
     *
     * Creates the universal time for the application. The current time is held in the
     * clock property. Currently one second equals one Earth day, meaning it takes
     * Earth approximately 6 minutes and 4 seconds to orbit the Sun.
     */
    var TimeController = {
        offset: null,
        clock: 1,
        interval: null,
        delay: 1,
        isPaused: true,
        speed: 0.04,

        start: function() {
            var TimeController = this;

            TimeController.isPaused = false;

            if (!TimeController.interval) {
                TimeController.offset = Date.now();

                TimeController.interval = setInterval(function() {
                    TimeController.clock += TimeController.getDelta(TimeController.offset) * TimeController.speed;
                }, TimeController.delay);
            }
        },

        stop: function() {
            TimeController.isPaused = true;

            if (TimeController.interval) {
                clearInterval(TimeController.interval);

                TimeController.interval = null;
            }
        },

        reset: function() {
            TimeController.clock = 0;
        },

        getDelta: function(offset) {
            var now = Date.now(),
                os  = offset ? offset : 1,
                d   = now - os
            ;

            TimeController.offset = now;

            return d;
        },

        getTime: function() {
            return TimeController.clock / 1000;
        }
    };

    return TimeController;
});
