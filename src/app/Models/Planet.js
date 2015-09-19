define(
[
  'Environment/Constants',
  'Models/CelestialObject'
],
function(Constants, CelestialObject, Sun) {
  'use strict';

  const CELESTIAL_SCALE = Constants.universeScale;

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
      this._threeRadius = this.createThreeRadius();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo, data._3d.textures.specular);
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

    get threeRadius() {
      return this._threeRadius;
    }

    get threeObject() {
      return this._threeObject;
    }

    get threeDistanceFromParent() {
      return this._threeDistanceFromParent;
    }

    createThreeDiameter() {
      return this._diameter * CELESTIAL_SCALE;
    }

    createThreeRadius() {
      return (this._diameter * CELESTIAL_SCALE) / 2;
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

    createGeometry(surface) {
      var segmentsOffset = parseInt(this._threeDiameter * 8);

      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
                this._threeRadius,
                segmentsOffset,
                segmentsOffset
            ),
            surface
        )
      ;

      mesh.rotation.x = 90 * Constants.degreesToRadiansRatio; // degrees to radians

      return mesh;
    }

    createSurface(base, topo, specular) {
      if (!base) {
        return;
      }

      var map = this.getTexture(base);

      map.minFilter = THREE.NearestFilter;

      if (topo) {
        var bumpMap = this.getTexture(topo);

        bumpMap.minFilter = THREE.NearestFilter;
      }

      if (specular) {
        var specularMap = this.getTexture(specular);

        specularMap.minFilter = THREE.NearestFilter;
      }

      return new THREE.MeshPhongMaterial({
        map: map,
        bumpMap: bumpMap || null,
        bumpScale: bumpMap ? 0.015 : null,
        specularMap: specularMap || null,
        specular: specularMap ? new THREE.Color(0x0a0a0a) : null
      });
    }
  }

  // export Planet;

  return Planet;
});
