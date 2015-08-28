define(
[
  'Environment/Constants',
  'Models/CelestialObject'
],
function(Constants, CelestialObject, Sun) {
  'use strict';

  const CELESTIAL_SCALE = Constants.celestialScale;

  class Planet extends CelestialObject {
    constructor(data, threeParent) {
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
      this._threeParent = threeParent || null
      this._threeDistanceFromParent = this.createThreeDistanceFromParent();
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

    get threeDistanceFromParent() {
      return this._threeDistanceFromParent;
    }

    createThreeDistanceFromParent() {
      return this._distanceFromParent * CELESTIAL_SCALE;
    }

    getTexture(src) {
      if (src) {
        var texture = THREE.ImageUtils.loadTexture(src);

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        return texture;
      }
    }

    createThreeDiameter() {
      return this._diameter * CELESTIAL_SCALE;
    }

    createGeometry(surface) {
      var segmentsOffset = parseInt(this._threeDiameter * 10);

      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeDiameter,
                segmentsOffset,
                segmentsOffset
            ),
            surface
        )
      ;

      mesh.rotation.x = 90 * 0.0174532925; // degrees to radians

      return mesh;
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

  // export Planet;

  return Planet;
});
