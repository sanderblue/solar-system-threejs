define(function() {

    var System = {
        /**
         * Outputs provided arguments in the browsers javascript console.
         * If argument 2 is provided and is true, the output will display each item in args
         * on a separate line in the javascript console. If force = true, the provided arguments will
         * be logged in the javascript console regardless of the current App settings.
         *
         * @param args  [mixed]
         * @param split [boolean]
         * @param force [boolean]
         */
        log: function(args, split, force) {
            if (typeof console === 'undefined' || (!window.console && !window.console.log)) {
                window.console = {};
                window.console.log = function() {};
            }

            if (!App.config.logger.enabled && !force) {
                return;
            }

            if (split && typeof split !== 'boolean') {
                console.error('Argument 2 of method log() must be an instance of Boolean.');

                return;
            }

            if (args instanceof Array && split) {
                console.log('\n');

                for (var i = 0; args.length; i++) {
                    console.log(args[i]);
                }

                console.log('\n');

                return;
            }

            if (args instanceof Object && !(args instanceof Array) && split) {
                console.log('\n');

                for (key in args) {
                    console.log(key);
                }

                console.log('\n');

                return;
            }

            console.log(args);
        }
    };

    return System;
});
