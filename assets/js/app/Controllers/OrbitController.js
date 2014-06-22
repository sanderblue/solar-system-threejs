define(function() {

    function OrbitController(options) {
        this.options = options;
    };

    OrbitController.prototype.positionObject = function(object, parent) {
        var method = 'OrbitController::positionObject()';

        for (var i = 0; i <= arguments.length; i++) {
            if (!arguments[i]) {
                throw new MissingArgumentException(i, method);

                return;
            }

            return;
        }
    };

    return OrbitController;
});