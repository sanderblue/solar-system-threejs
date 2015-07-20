define(function() {
  'use strict';

  var celestialScale = Math.pow(10, -3);

  class Planet {
    constructor(data) {
      // super();

      for (var prop in data) {
        if (prop != '_3d') {
          this['_' + prop] = data[prop];
        }
      }

      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeDiameter = this._diameter * celestialScale;
      this._threeObject = this.createGeometry(this._surface);
    }

    /**
     * Planet Data
     */
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



    /**
     * 3D Model Data
     */

    get threeDiameter() {
      return this._threeDiameter;
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

      // if (topo) {
      //   return new THREE.MeshPhongMaterial({
      //     map: this.getTexture(base)
      //   });
      // }

      var texture = this.getTexture(base);

      texture.minFilter = THREE.NearestFilter;

      return new THREE.MeshPhongMaterial({ map: texture });
    }

    createGeometry(surface) {
      return new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeDiameter,
                48,
                24
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
