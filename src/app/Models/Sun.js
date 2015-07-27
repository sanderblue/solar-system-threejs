define(
[
  'Models/CelestialObject'
],
function(CelestialObject) {
  'use strict';

  class Sun extends CelestialObject {
    constructor(data) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._threeDiameter = this.createThreeDiameter();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
    };

    getTexture(src) {
      if (src) {
        return THREE.ImageUtils.loadTexture(src);
      }
    };

    createThreeDiameter() {
      return this._diameter * celestialScale;
    };

    createGeometry(surface) {
      return new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeDiameter,
                48,
                24
            ),
            surface
        )
      ;
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
