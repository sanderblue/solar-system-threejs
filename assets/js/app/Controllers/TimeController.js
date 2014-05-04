define(function() {

    // var TimeController = {
    //     // TODO: Make these accessible to the user to change and manipulate
    //     dayWithTimeAsDecimal: 1,
    //     dayIntervalObj: null,
    //     dayInterval: 2000,
    //     pseudoDayCount: 1,

    //     createTime: function() {
    //         TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal();
    //     },

    //     startTime: function() {
    //         TimeController.dayIntervalObj = setInterval(function() {
    //             TimeController.pseudoDayCount++;

    //             TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal() + TimeController.pseudoDayCount;

    //             // console.log('Day ', TimeController.dayWithTimeAsDecimal);

    //         }, TimeController.dayInterval);
    //     },

    //     stopTime: function() {
    //         clearInterval(TimeController.dayIntervalObj);
    //     }
    // };

    // return TimeController;

    var Stopwatch = {

        offset: null,
        clock: null,
        interval: null,
        delay: 1,

        // default options
        // options = options || {};
        // options.delay = options.delay || 1;

        // initialize
        // Stopwatch.reset();

        start: function() {
            if (!Stopwatch.interval) {
                Stopwatch.offset = Date.now();
                Stopwatch.interval = setInterval(Stopwatch.update, Stopwatch.delay);
            }
        },

        stop: function() {
            if (Stopwatch.interval) {
                clearInterval(Stopwatch.interval);
                Stopwatch.interval = null;
            }
        },

        reset: function() {
            Stopwatch.clock = 0;
        },

        update: function() {
          Stopwatch.clock += Stopwatch.delta();
        },

        getStopWatchValue: function() {
          return Stopwatch.clock / 1000;
        },

        delta: function() {
            var now = Date.now(),
                d   = now - Stopwatch.offset;

            Stopwatch.offset = now;

            return d;
        },

        // // public API
        // this.start  = start;
        // this.stop   = stop;
        // this.reset  = reset;
    };

    return Stopwatch;
});