define(function() {
  'use strict';

  class Orbit {
    constructor(planet) {
      this._planet = planet;
      this._orbit = this.createOrbit();
    }

    get orbit() {
      return this._orbit;
    }

    createOrbit() {
        var resolution = 1080, // segments in the line
          length = 360 / resolution,
          material = new THREE.LineBasicMaterial({ color: 0x3f3f3f, linewidth: 0.1 }),
          orbitLine = new THREE.Geometry()
        ;

        // console.debug('\n Orbit: ', this._planet);

        // Build the orbit line
        for (var i = 0; i <= resolution; i++) {
          var segment = (i * length) * Math.PI / 180,
            orbitAmplitude = this._planet.threeParent.threeRadius + this._planet.threeDistanceFromParent
          ;

          orbitLine.vertices.push(
            new THREE.Vector3(
              Math.cos(segment) * orbitAmplitude,
              Math.sin(segment) * orbitAmplitude,
              0
            )
          );
        }

        var line = new THREE.Line(orbitLine, material);

        line.position.set(0, 0, 0);

        return line;
    };
  }

  return Orbit;
});
