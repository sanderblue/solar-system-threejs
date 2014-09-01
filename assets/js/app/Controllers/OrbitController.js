define(
    [
        'TimeController',
        'PlanetFactory',
        'Constants'
    ],
    function(TimeController, PlanetFactory, Constants) {

        var OrbitController = function(object3d, object, parent, options) {
            for (var i = 0; i <= arguments.length - 1; i++) {
                var optionalArg = arguments[3];

                if (!arguments[i] && !optionalArg) {
                    throw new MissingArgumentException(i + 1, method);

                    return;
                }
            }

            this.object3d = object3d;
            this.object   = object;
            this.parent   = parent;
            this.options  = options || { interval: TimeController.interval };
        };

        OrbitController.prototype.positionObject = function() {
            var self  = this,
                count = TimeController.getTime()
            ;

            var posX = (self.parent.radius + self.object.distanceFromParent)
                        * Math.sin(
                            count
                            * (360 / self.object.orbitDuration)
                            * 0.0174532925
                        );

            var posY = (self.parent.radius + self.object.distanceFromParent)
                        * Math.cos(
                            count
                            * (360 / self.object.orbitDuration)
                            * 0.0174532925
                        );

            self.object3d.position.set(
                parseFloat(posX),
                0,
                parseFloat(posY)
            );
        };

        return OrbitController;
    }
);
