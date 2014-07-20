define(['threejs'], function() {

    var RandomNumber = {
        /**
         * Returns a random point of a sphere, evenly distributed over the sphere.
         * The sphere is centered at (x0,y0,z0) with the passed in radius.
         * The returned point is returned as a three element array [x,y,z].
         */
        getRandomPointInSphere: function(radius, x0, y0, z0){
            if (!x0) { x0 = 0 }
            if (!y0) { x0 = 0 }
            if (!z0) { x0 = 0 }

            var u = Math.random();
            var v = Math.random();

            var theta = 2 * Math.PI * u;
            var phi = Math.acos(2 * v - 1);

            var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
            var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
            var z = z0 + (radius * Math.cos(phi));

            return new THREE.Vector3(x, y, z);
        }
    };

    return RandomNumber;
});
