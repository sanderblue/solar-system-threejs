define(function() {
  'use strict';

  class Planet {
    constructor(data) {
      // super();

      for (var prop in data) {
        this['_' + prop] = data[prop];
      }

      this._textureBase = this.getTexture(data._3d.textures.base);
      this._textureTopo = data._3d.textures.topo ? this.getTexture(data._3d.textures.topo) : null;
    }

    set name(name) {
      this._name = name;
    }

    get name() {
      return this._name;
    }

    set diameter(km) {
      this._diameter = km;
    }

    get diameter() {
      return this._diameter;
    }

    set mass(kg) {
      this._mass = kg;
    }

    get mass() {
      return this._mass;
    }

    set gravity(mps) {
      this._gravity = mps;
    }

    get gravity() {
      return this._gravity;
    }

    set density(kgpm3) {
      this._density = kgpm3;
    }

    get density() {
      return this._density;
    }

    set rotationPeriod(hrs) {
      this._rotationPeriod = hrs;
    }

    get rotationPeriod() {
      return this._rotationPeriod;
    }

    set distanceFromParent(km) {
      this._distanceFromParent = km;
    }

    get distanceFromParent() {
      return this._distanceFromParent;
    }

    set orbitalPeriod(days) {
      this._orbitalPeriod = days;
    }

    get orbitalPeriod() {
      return this._orbitalPeriod;
    }

    set orbitalVelocity(kps) {
      this._orbitalVelocity = kps;
    }

    get orbitalVelocity() {
      return this._orbitalVelocity;
    }

    set orbitalInclination(degrees) {
      this._orbitalInclination = degrees;
    }

    get orbitalInclination() {
      return this._orbitalInclination;
    }

    set axialTilt(degrees) {
      this._axialTilt = degrees;
    }

    get axialTilt() {
      return this._axialTilt;
    }

    set meanTemperature(temp) {
      this._meanTemperature = temp;
    }

    get meanTemperature() {
      return this._meanTemperature;
    }

    getTexture(src) {
      if (src) {
        return THREE.ImageUtils.loadTexture(src);
      }
    }

    // get texture() {
    //   return this.texture;
    // }

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
