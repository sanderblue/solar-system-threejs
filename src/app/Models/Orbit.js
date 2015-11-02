define(
[
  'Environment/Constants'
],
function(Constants) {
  'use strict';

  class Orbit {
    constructor(planet) {
      this._planet = planet;
      this._orbit = this.createOrbit();
      this.setOrbitInclination();
    }

    get orbit() {
      return this._orbit;
    }

    createOrbit() {
      var resolution = 365, // segments in the line
        length = 360 / resolution,
        material = new THREE.LineBasicMaterial({ color: 0x2b2b2b, linewidth: 1 }),
        orbitLine = new THREE.Geometry()
      ;

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

    setOrbitInclination() {
      this._planet.orbitCentroid.rotation.y = this._planet.orbitalInclination * Constants.degreesToRadiansRatio;
    }
  }

  return Orbit;
});
