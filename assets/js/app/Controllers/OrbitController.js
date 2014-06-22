define(function() {

    function OrbitController(options) {
        this.options = options;
    };

    OrbitController.prototype.positionObject = function(object, parent) {
        this.method = 'OrbitController::positionObject()';

        for (var i = 0; i <= arguments.length; i++) {
            console.log(arguments[i]);
            if (!arguments[i]) {
                throw new MissingArgumentException(i, this.method);

                return;
            }

            return;
        }
    };

    return OrbitController;
});