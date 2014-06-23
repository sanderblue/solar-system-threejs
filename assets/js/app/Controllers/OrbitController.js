define(['Time', 'PlanetFactory'], function(TimeController, PlanetFactory) {

    var OrbitController = function(object3d, object, parent, options) {
        this.object3d = object3d;
        this.object   = object;
        this.parent   = parent;
        this.options  = options;
    };

    OrbitController.prototype.positionObject = function() {
        var method = 'OrbitController::positionObject()';

        console.log('OrbitController', this)

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

            var posX = (self.parent.radius + self.object.distanceFromParent)
                        * Math.sin(
                            count
                            * (360 / self.object.orbitDuration)
                            * degreesToRadianRatio
                        );

            var posY = (self.parent.radius + self.object.distanceFromParent)
                        * Math.cos(
                            count
                            * (360 / self.object.orbitDuration)
                            * degreesToRadianRatio
                        );

            // threeObject.rotation.y += 0.008;

            self.object3d.position.set(
                parseFloat(posX),
                0,
                parseFloat(posY)
            );

        }, self.options.interval);
    };

    return OrbitController;

});