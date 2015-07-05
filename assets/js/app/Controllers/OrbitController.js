define(
    [
        'TimeController',
        'PlanetFactory',
        'Constants'
    ],
    function(TimeController, PlanetFactory, Constants) {

        /**
         * OrbitController
         *
         * @param {[type]} object3d [description]
         * @param {[type]} object   [description]
         * @param {[type]} parent   [description]
         * @param {[type]} options  [description]
         */
        var OrbitController = function(object3d, object, parent, options, distanceFromParent) {
            for (var i = 0; i <= arguments.length - 2; i++) {
                var optionalArg = arguments[3];

                if (!arguments[i] && !optionalArg) {
                    throw new MissingArgumentException(i + 1, method);

                    return;
                }
            }

            this.object3d = object3d;
            this.object   = object;
            this.parent   = parent;
            this.dfp      = distanceFromParent || null;
            this.options  = options || { interval: TimeController.interval };
        };

        OrbitController.prototype.positionObject = function() {
            var self  = this,
                dfp = this.dfp ? this.dfp : this.object.distanceFromParent,
                amplitude = this.parent.radius + dfp,
                count = new Date().getDOYwithTimeAsDecimal() + TimeController.getTime()
            ;

            var posX = amplitude * Math.sin(
                            count
                            * (360 / this.object.orbitDuration)
                            * 0.0174532925
                        );

            var posY = amplitude
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
