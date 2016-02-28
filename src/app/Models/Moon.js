define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Models/Orbit'
],
function(Constants, CelestialObject, Orbit) {
  'use strict';

  class Moon extends CelestialObject {
    constructor(data, threeParent, parentData) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._name = data.name || null;
      this._distanceFromParent = data.distanceFromParent || null;
      this._orbitalPeriod = data.orbitalPeriod || null;
      this._orbitalInclination = data.orbitalInclination || null;
      this._threeDiameter = this.createThreeDiameter();
      this._threeRadius = this.createThreeRadius();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
      this._threeDistanceFromParent = this.createThreeDistanceFromParent();
      this._threeParent = threeParent || null;
      this._threeObject.rotation.x = 90 * Constants.degreesToRadiansRatio;
      this._parentData = parentData || null;
      this._orbitCentroid = this.createOrbitCentroid();

      if (data.rings) {
        this.createRingGeometry(data);
      }

      this.buildFullObject3D();
    }


    /**
     * Moon Data
     */
    get name() {
      return this._name;
    }

    get distanceFromParent() {
      return this._distanceFromParent;
    }

    get orbitalPeriod() {
      return this._orbitalPeriod;
    }

    get orbitalInclination() {
      return this._orbitalInclination;
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

    get threeParent() {
      return this._threeParent;
    }

    get threeDistanceFromParent() {
      return this._threeDistanceFromParent;
    }

    get orbitCentroid() {
      return this._orbitCentroid;
    }

    get parentData() {
      return this._parentData;
    }

    createOrbitCentroid() {
      return new THREE.Object3D();
    }

    buildFullObject3D() {
      // var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      var randomColor = '#333333';

      this._orbitLine = new Orbit(this, randomColor);

      this._orbitCentroid.rotation.x = 90 - this._parentData.axialTilt - this._orbitalInclination * Constants.degreesToRadiansRatio;

      this._orbitCentroid.add(
        this._threeObject,
        this._core,
        this._orbitLine.orbit
      );
    }

    createThreeDiameter() {
      if (this._diameter < 200) {
        return this._diameter * 0.0008;
      }

      return this._diameter * Constants.celestialScale;
    }

    createThreeRadius() {
      if (this._diameter < 200) {
        return this._diameter * 0.0008 / 2;
      }

      return (this._diameter * Constants.celestialScale) / 2;
    }

    createThreeDistanceFromParent() {
      return this._distanceFromParent * Constants.orbitScale;
    }

    getTexture(src, filter) {
      if (!src) {
        throw new MissingArgumentException(arguments[i]);
      }

      if (src) {
        var texture = THREE.ImageUtils.loadTexture(src);

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        if (filter) {
          texture.filter = filter;
        }2

        return texture;
      }
    }

    createGeometry(surface, atmosphere) {
      var segmentsOffset = Number.parseInt(this._threeDiameter + 1 * 60);
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            this._threeRadius,
            segmentsOffset,
            segmentsOffset
          ),
          surface
        )
      ;

      if (atmosphere) {
        mesh.add(atmosphere);
      }

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

        specularMap.minFilter = THREE.LinearFilter;
      }

      return new THREE.MeshPhongMaterial({
        map: map,
        // bumpMap: bumpMap || null,
        // bumpScale: bumpMap ? 0.012 : null,
        // specularMap: specularMap || null,
        specular: specularMap ? new THREE.Color(0x0a0a0a) : null
      });
    }
  }

  return Moon;
});
