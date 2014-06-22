define(function() {

    var defaults = {
        offset: null,
        clock: 1,
        interval: null,
        delay: 1
    };

    var getDelta = function(module, offset) {
        var now = Date.now(),
            os  = offset ? offset : 1,
            d   = now - os;

        module.options.offset = now;

        return d;
    };

    var TimeController = function(options) {
        this.options = options || defaults;
    };

    TimeController.prototype.start = function() {
        var self = this;

        if (!self.options.interval) {
            self.options.offset = Date.now();
            self.options.interval = setInterval(function() {
                self.options.clock += getDelta(self, self.options.offset);
            }, self.options.delay);
        }
    }

    TimeController.prototype.stop = function() {
        if (this.options.interval) {
            clearInterval(this.options.interval);
            this.options.interval = null;
        }
    };

    TimeController.prototype.reset = function() {
        this.options.clock = 0;
    };

    TimeController.prototype.getStopWatchValue = function() {
        return this.options.clock / 1000;
    };

    return TimeController;
});