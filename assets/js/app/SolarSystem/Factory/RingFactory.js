define(function() {

    var RingBuilder = {
        buildRing: function(amplitude) {
            return $.Deferred(function(promise) {
                var resolution = 400, // segments in the line
                    size       = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                    color: 0x585858,
                                    opacity: 0.1
                                  });

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * size) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * amplitude,
                            Math.sin(segment) * amplitude,
                            0
                        )
                    );
                }

                var ringLine = new THREE.Line(ringLine, material);

                // We need to flip the planet's ring axis so the text renders as a vertical canvas
                ringLine.rotation.x = Math.PI / 2;

                var responseObject = {
                    line: ringLine
                };

                promise.resolve(responseObject);
            });
        }
    };

    return RingBuilder;
});
