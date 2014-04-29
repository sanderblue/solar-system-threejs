define([], function() {

    var RingBuilder = {
        buildRing: function(amplitude) {
            return $.Deferred(function(promise) {
                var resolution = 400, // segments in the line
                    size       = 360 / resolution;

                var material = new THREE.LineBasicMaterial({
                                    color: 0xe6e6e6,
                                    opacity: 0.1
                                  });

                var ringLine = new THREE.Geometry();

                for (var i = 0; i <= resolution; i++) {
                    var segment = (i * size) * Math.PI / 180;

                    ringLine.vertices.push(
                        new THREE.Vector3(
                            Math.cos(segment) * amplitude,
                            0,
                            Math.sin(segment) * amplitude
                        )
                    );
                }

                var ringLine = new THREE.Line(ringLine, material);

                var responseObject = {
                    line: ringLine
                };

                promise.resolve(responseObject);
            });
        }
    };

    return RingBuilder;
});