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
                count = new Date().getDOYwithTimeAsDecimal() + TimeController.getTime()
            ;

            var posX = (this.parent.radius + this.object.distanceFromParent)
                        * Math.sin(
                            count
                            * (360 / this.object.orbitDuration)
                            * 0.0174532925
                        );

            var posY = (this.parent.radius + this.object.distanceFromParent)
                        * Math.cos(
                            count
                            * (360 / this.object.orbitDuration)
                            * 0.0174532925
                        );

            if (this.object.celestialType) {
                this.object3d.position.set(
                    parseFloat(posX),
                    parseFloat(posY),
                    0
                );
            } else {
                // Axis is flipped in this case
                this.object3d.position.set(
                    parseFloat(posX),
                    0,
                    parseFloat(posY)
                );
            }
        };

        OrbitController.prototype.animateOrbit = function() {
            var self = this;

            var interval = setInterval(function(controller) {
                controller.positionObject();
            }, this.options.interval, this);
        };

        return OrbitController;
    }
);
