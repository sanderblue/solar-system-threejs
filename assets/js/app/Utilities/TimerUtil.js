define(function() {

    var TimerUtil = {
        /**
         * Get the elapsed time of whatever process you want to test.
         *
         * @param start    [timestamp]
         * @param end      [timestamp]
         * @param format   [mixed]
         * @return integer
         */
        getElapsedTime: function(start, end, format) {
            if (!start) {
                console.error('Missing argument 1 for method getElapsedTime');

                return;
            }

            if (!end) {
                console.error('Missing argument 2 for method getElapsedTime');

                return;
            }

            return end - start;
        }
    };

    return TimerUtil;
});
