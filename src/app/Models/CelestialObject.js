define(
[
  'Controllers/OrbitController'
],
function(OrbitController) {
  'use strict';

  class CelestialObject {
    constructor(diameter, mass, gravity, density) {
      this._diameter = diameter || 1;
      this._mass = mass || 1;
      this._gravity = gravity || 1;
      this._density = density || 1;
    }

    get diameter() {
      return this._diameter;
    }

    get mass() {
      return this._mass;
    }

    get gravity() {
      return this._gravity;
    }

    get density() {
      return this._density;
    }
  }

  return CelestialObject;
});
