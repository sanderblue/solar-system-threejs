define(
[
  'Models/CelestialObject',
  'Environment/Constants'
],
function(CelestialObject, Constants) {
  'use strict';

  const CELESTIAL_SCALE = Constants.celestialScale;

  class Sun extends CelestialObject {
    constructor(data) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._id = data.id || null;
      this._name = data.name || null;
      this._rotationPeriod = data.rotationPeriod || null;
      this._lengthOfDay = data.lengthOfDay || null;
      this._distanceFromParent = data.distanceFromParent || null;
      this._axialTilt = data.axialTilt || null;
      this._meanTemperature = data.meanTemperature || null;

      this._threeDiameter = this.createThreeDiameter();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
    };


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
        var texture = THREE.ImageUtils.loadTexture(src);

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        return texture
      }
    };

    createThreeDiameter() {
      return this._diameter * CELESTIAL_SCALE;
    };

    createGeometry(surface) {
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeDiameter,
                60,
                60
            ),
            surface
        )
      ;

      mesh.rotation.x = 90 * 0.0174532925; // degrees to radians

      return mesh;
    };

    createSurface(base, topo) {
      if (!base) {
        return;
      }

      var texture = this.getTexture(base);

      texture.minFilter = THREE.NearestFilter;

      return new THREE.MeshPhongMaterial({ map: texture });
    };
  }

  return Sun;
});
