define(function() {
  'use strict';

  class Planet {
    constructor(data) {
      // super();

      for (var prop in data) {
        if (prop != '_3d') {
          this['_' + prop] = data[prop];
        }
      }

      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
    }

    get name() {
      return this._name;
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

    get rotationPeriod() {
      return this._rotationPeriod;
    }

    get distanceFromParent() {
      return this._distanceFromParent;
    }

    get orbitalPeriod() {
      return this._orbitalPeriod;
    }

    get orbitalVelocity() {
      return this._orbitalVelocity;
    }

    get orbitalInclination() {
      return this._orbitalInclination;
    }

    get axialTilt() {
      return this._axialTilt;
    }

    get meanTemperature() {
      return this._meanTemperature;
    }

    get threeObject() {
      return this._threeObject;
    }

    getTexture(src) {
      if (src) {
        return THREE.ImageUtils.loadTexture(src);
      }
    }

    createSurface(base, topo) {
      if (!base) {
        return;
      }

      if (topo) {
        return new THREE.MeshPhongMaterial({
          map: this.getTexture(base),
          bumpMap: this.getTexture(topo),
          bumpScale: 1.4
        });
      }

      return new THREE.MeshPhongMaterial({ map: this.getTexture(base) });
    }

    createGeometry(surface) {
      return new THREE.Mesh(
        new THREE.SphereGeometry(
                this._diameter / 2,
                200,
                110
            ),
            surface
        );
    }

    // static something() {
    //   return 'something';
    // }
  }

  return Planet;
});

/*

  {
      "id": 1,
      "name": "Mercury",
      "diameter": 4879, // km
      "mass": 0.330, // 10^24 kg
      "gravity": 3.7, // m/s
      "density": 5427, // kg/m^3
      "rotationPeriod": 1407.6, // hrs
      "lengthOfDay": 4222.6, // hrs
      "distanceFromParent": 57900000, // km
      "orbitalPeriod": 88, // earth days
      "orbitalVelocity": 47.4, // km/s
      "orbitalInclination": 3.4, // degrees
      "axialTilt": 0.01, // degrees
      "meanTemperature": 167, // Celsius
      "3d": {
          "textures": {
              "base": "/src/assets/textures/mercury.jpg",
              "topo": "/src/assets/textures/mercury_topo.jpg"
          }
      }
  }

*/
