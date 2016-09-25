define(
[
  'Environment/Constants'
],
function(Constants) {
  'use strict';

  class Orbit {
    constructor(object, color) {
      this._object = object;
      this._color = color || new THREE.Color('#404040');
      this._orbit = this.createOrbit();
      this.setOrbitInclination();
    }

    get orbit() {
      return this._orbit;
    }

    get color() {
      return this._color;
    }

    set color(color) {
      this._color = color;
    }

    createOrbit() {
      var resolution = this._object.threeDistanceFromParent + 15 * 50; // segments in the line
      var length = 360 / resolution;
      var orbitLine = new THREE.Geometry();
      var material = new THREE.LineBasicMaterial({
        color: this._color,
        linewidth: 1,
        fog: true
      });

      // Build the orbit line
      for (var i = 0; i <= resolution; i++) {
        var segment = (i * length) * Math.PI / 180;
        var orbitAmplitude = this._object.threeParent.threeRadius + this._object.threeDistanceFromParent;

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
      this._object.orbitCentroid.rotation.x = this._object.orbitalInclination * Constants.degreesToRadiansRatio;
    }
  }

  return Orbit;
});
