define(function() {

    /**
     * The Camera object contains the default camera data.
     */
    var Camera = {
        zoom: 5, // integer value to adjust the camera's zoom
        radius: 0.1, // arbitary and extraneous
        diameter: 0.2, // arbitary and extraneous
        distanceFromParent: 2000,
        position: new THREE.Vector3(0, 0, 0),
        defaultPosition: new THREE.Vector3(0, -190000, 9000),
        defaultFocalPoint: new THREE.Vector3(0, 0, 0), // universe center
        currentFocalPointObject: new THREE.Vector3(0, 0, 0),
        orbitDuration: 360, // equivalent to 360 degrees
        dayOfOrbit: 1,
        perspective: {
            near: 1,
            far: 5 * Math.pow(10, 12)
        }
    };

    return Camera;

});
