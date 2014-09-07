define(['threejs'], function() {

    var RandomNumber = {
        /**
         * Gets a random point of a sphere, evenly distributed over the sphere.
         * The sphere is centered at (x0,y0,z0) with the passed in radius.
         * The returned point is returned as a three element array [x,y,z].
         *
         * @return Vector3 [THREE object]
         */
        getRandomPointInSphere: function(radius, x0, y0, z0){
            if (!x0) { x0 = 0 }
            if (!y0) { y0 = 0 }
            if (!z0) { z0 = 0 }

            var u = Math.random();
            var v = Math.random();

            var theta = 2 * Math.PI * u;
            var phi = Math.acos(2 * v - 1);

            var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
            var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
            var z = z0 + (radius * Math.cos(phi));

            return new THREE.Vector3(x, y, z);
        },

        /**
         * Gets a random number based off arbitrary timestamps and randomizing with other operations.
         * This method facilitates randomizing the position of the astroids.
         *
         * @return integer
         */
        getRandomNumber: function() {
            var randomNumA = new Date().getMilliseconds() - (new Date().getMilliseconds() / 2.1),
                randomNumB = Math.random() * randomNumA;

            if (randomNumB > 250) {
                return parseFloat(randomNumB - 100 * Math.PI / 2);
            }

            return randomNumB;
        }
    };

    return RandomNumber;
});
