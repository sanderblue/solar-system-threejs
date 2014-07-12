define(function() {

    var TimerUtil = {
        getElapsedTime: function(format, start, end) {
            if (format === 'ms') {
                return end - start;
            }
        }
    };

    return TimerUtil;
});