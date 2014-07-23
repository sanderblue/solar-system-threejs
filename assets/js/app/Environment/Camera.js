define(function() {

    var Camera = {
        radius: 1, // doesn't really mean anything
        diameter: 2, // doesn't really mean anything
        distanceFromParent: 2000, //
        defaultPosition: new THREE.Vector3(0, -40000, 3000),
        defaultFocalPoint: new THREE.Vector3(0, 0, 0),
        orbitDuration: 364.25,
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
