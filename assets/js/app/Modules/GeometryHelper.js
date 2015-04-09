define(['Constants'], function(Constants) {
    return {
        getRadians: function(degree) {
            if (typeof degree != 'number' || degree > 360) {
                throw new InvalidArgumentException(arguments[0], 'GeometryHelper.getPointOnCircle');
            }

            return degree * Math.PI / 180;
        },

        getPointOnCircle: function(originX, originY, radius, angle) {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] != 'number') {
                    throw new InvalidArgumentException(arguments[i], 'GeometryHelper.getPointOnCircle');
                }

                if (parseInt(arguments[i]) !== 0 && !arguments[i]) {
                    throw new MissingArgumentException(arguments[i], 'GeometryHelper.getPointOnCircle');
                }
            }

            return {
                x: originX + radius * Math.cos(angle),
                y: originY + radius * Math.sin(angle)
            };
        }
    };
});
