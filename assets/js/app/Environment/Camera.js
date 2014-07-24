define(function() {

    var Camera = {
        zoom: 8, // integer value to adjust the camera's zoom (usually the y-axis)
        radius: 0.1, // doesn't really mean anything
        diameter: 0.2, // doesn't really mean anything
        distanceFromParent: 2000,
        position: new THREE.Vector3(0, 0, 0),
        defaultPosition: new THREE.Vector3(0, -40000, 3000),
        defaultFocalPoint: new THREE.Vector3(0, 0, 0), // universe center
        orbitDuration: 360, // equivalent to 360 degrees
        dayOfOrbit: 1,
        perspective: {
            near: 1,
            far: 5000000000
        },
        parent: {
            name: 'Sun',
            radius: 700,
            diameter: 1400,
            texture: null,
            orbitDuration: 364.25,
            position: {
                x: 0,
                y: 0
            }
        }
    };

    return Camera;

});
