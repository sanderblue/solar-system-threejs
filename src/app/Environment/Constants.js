define(function() {
    'use strict';

    /**
     * Constants
     *
     * This object contains a number of mathematical and physical constants.
     */
    const UNIVERSE_SCALE = Math.pow(10, -4.2); // 4.2
    const CELESTIAL_SCALE = Math.pow(10, -3.8); // 3.9
    const ORBIT_SCALE = UNIVERSE_SCALE;
    const DEGREES_TO_RADIANS_RATIO = 0.0174532925;
    const RADIANS_TO_DEGREES_RATIO = 57.2957795;

    // console.debug('Distance to Kuiper Belt', UNIVERSE_SCALE * 14959787070);

    class Constants {
        get degreesToRadiansRatio() {
            return DEGREES_TO_RADIANS_RATIO;
        }

        get radiansToDegreesRatio() {
            return RADIANS_TO_DEGREES_RATIO;
        }

        get universeScale() {
            return UNIVERSE_SCALE;
        }

        get celestialScale() {
            return CELESTIAL_SCALE;
        }

        get orbitScale() {
            return ORBIT_SCALE;
        }
    }

    return new Constants();

});
