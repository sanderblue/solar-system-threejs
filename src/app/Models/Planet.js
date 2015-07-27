define(
[
  'Models/CelestialObject'
],
function(CelestialObject) {
  'use strict';

  var celestialScale = Math.pow(10, -3);

  class Planet extends CelestialObject {
    constructor(data) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._id = data.id || null;
      this._name = data.name || null;
      this._rotationPeriod = data.rotationPeriod || null;
      this._lengthOfDay = data.lengthOfDay || null;
      this._distanceFromParent = data.distanceFromParent || null;
      this._orbitalPeriod = data.orbitalPeriod || null;
      this._orbitalVelocity = data.orbitalVelocity || null;
      this._orbitalInclination = data.orbitalInclination || null;
      this._axialTilt = data.axialTilt || null;
      this._meanTemperature = data.meanTemperature || null;

      this._threeDiameter = this.createThreeDiameter();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
    }

    /**
     * Planet Data
     */
    get name() {
      return this._name;
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

    createThreeDiameter() {
      return this._diameter * celestialScale;
    }

    createGeometry(surface) {
      var segmentsOffset = parseInt(this._threeDiameter * 3);

      return new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeDiameter,
                segmentsOffset,
                segmentsOffset
            ),
            surface
        )
      ;
    }

    createSurface(base, topo) {
      if (!base) {
        return;
      }

      var texture = this.getTexture(base);

      texture.minFilter = THREE.NearestFilter;

      return new THREE.MeshPhongMaterial({ map: texture });
    }
  }

  return Planet;
});
