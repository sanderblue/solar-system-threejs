var ConsoleController = {
    toggleElement: $('#toggle-logger'),
    setting: 0,
    interval: null,

    initEventListeners: function() {
        ConsoleController.toggleElement.on('click', function() {
            var setting = parseInt($(this).data('setting'));

            console.log('setting', setting)
            ConsoleController.toggleLogger(setting);
        });
    },

    toggleLogger: function(setting) {
        if (setting === 0) {
            ConsoleController.turnOnConsole();
            ConsoleController.setDataAttribute(setting);
            return;
        }

        ConsoleController.turnOffConsole();
        ConsoleController.setDataAttribute(setting);
    },

    turnOnConsole: function() {
        if (typeof console !== 'undefined') {
            ConsoleController.interval = setInterval(function() {
                console.log('test') //Scene.planets[2].position);
            }, 100);
        }
    },

    turnOffConsole: function() {
        clearInterval(ConsoleController.interval);
    },

    setDataAttribute: function(setting) {
        if (setting === 0) {
            ConsoleController.toggleElement.data('setting', 1);

            return;
        }

        ConsoleController.toggleElement.data('setting', 0);
    },

    showPlanetPosition: function(planet) {

    },

    /*
     * @arg columnated (boolean)
     *
     * If columnated = true, return each item with line break per item.
     */
    report: function(columnated) {
        if (typeof columnated === 'boolean') {
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
            return;
        }

        console.log('\n', arguments);
    }
};

ConsoleController.initEventListeners();