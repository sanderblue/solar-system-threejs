define(['Time', 'PlanetFactory'], function(TimeController, PlanetFactory) {

    var OrbitController = function(options) {
        this.options = options;
    };

    OrbitController.prototype.positionObject = function(Object3D, object, parent) {
        var method = 'OrbitController::positionObject()';

        for (var i = 0; i <= arguments.length - 1; i++) {
            if (!arguments[i]) {
                throw new MissingArgumentException(i, method);

                return;
            }
        }

        var TimeCtrl = new TimeController();

        var self = this,
            degreesToRadianRatio = 0.0174532925,
            count = 1
        ;

        setInterval(function() {
            var dayOnEarth = new Date().getDOYwithTimeAsDecimal() + TimeCtrl.getStopWatchValue();

            count = dayOnEarth;

            var posX = (parent.radius + object.distanceFromParent)
                        * Math.sin(
                            count
                            * (360 / object.orbitDuration)
                            * degreesToRadianRatio
                        );

            var posY = (parent.radius + object.distanceFromParent)
                        * Math.cos(
                            count
                            * (360 / object.orbitDuration)
                            * degreesToRadianRatio
                        );

            // threeObject.rotation.y += 0.008;

            Object3D.position.set(
                parseFloat(posX),
                0,
                parseFloat(posY)
            );

        }, self.options.interval);
    };

    return OrbitController;

});