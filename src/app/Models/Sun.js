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
      this._threeRadius = this.createThreeRadius();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
    };


    /**
     * 3D Model Data
     */

    get threeDiameter() {
      return this._threeDiameter;
    };

    get threeRadius() {
      return this._threeRadius;
    };

    get threeObject() {
      return this._threeObject;
    };

    getTexture(src) {
      if (src) {
        var texture = THREE.ImageUtils.loadTexture(src);

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        return texture;
      }
    };

    createThreeDiameter() {
      return this._diameter * CELESTIAL_SCALE;
    };

    createThreeRadius() {
      return (this._diameter * CELESTIAL_SCALE) / 2;
    };

    createGeometry(surface) {
      var geometry = new THREE.SphereGeometry(
          this._threeRadius,
          60,
          60
      );

      var mesh = new THREE.Mesh(geometry, surface),
          sunLight = new THREE.PointLight(0xffffff, 1.1, 4495100000 * CELESTIAL_SCALE)
      ;

      mesh.rotation.x = 90 * Constants.degreesToRadiansRatio; // degrees to radians

      mesh.add(sunLight);

      return mesh;
    };

    createSurface(base, topo) {
      if (!base) {
        return;
      }

      var texture = this.getTexture(base);

      texture.minFilter = THREE.NearestFilter;

      return new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });

      return new THREE.MeshPhongMaterial({ map: texture });
    };
  }

  return Sun;
});
