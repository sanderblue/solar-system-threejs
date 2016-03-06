define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Models/Orbit'
],
function(Constants, CelestialObject, Orbit) {
  'use strict';

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
      this._atmosphere = this.createAtmosphere(data._3d.textures.clouds);
      this._threeObject = this.createGeometry(this._surface, this._atmosphere);
      this._threeDistanceFromParent = this.createThreeDistanceFromParent();
      this._threeParent = threeParent || null;
      this._moons = [];

      this._threeObject.rotation.x = (90 + this._axialTilt) * Constants.degreesToRadiansRatio;

      this._orbitCentroid = this.createOrbitCentroid();

      if (data.rings) {
        this.createRingGeometry(data);
      }

      this.buildFullObject3D();
    }

    /**
     * Planet Data
     */
    get id() {
      return this._id;
    }

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

    get moons() {
      return this._moons;
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

    get orbitLine() {
      return this._orbitLine;
    }

    createOrbitCentroid() {
      return new THREE.Object3D();
    }

    buildFullObject3D() {
      this._orbitLine = new Orbit(this);
      this._orbitCentroid.rotation.x = 90 + this._orbitalInclination * Constants.degreesToRadiansRatio;
      this._orbitCentroid.add(
        this._threeObject,
        this._core,
        this._orbitLine.orbit
      );
    }

    createThreeDiameter() {
      return this._diameter * Constants.celestialScale;
    }

    createThreeRadius() {
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
        }

        return texture;
      }
    }

    createGeometry(surface, atmosphere) {
      var hiRes = false;
      var segmentsOffset = Number.parseInt(this._threeDiameter + 1.1 * 60);

      if (hiRes) {
        segmentsOffset = Number.parseInt(this._threeDiameter + 1.5 * 120);
      }

      // console.debug(this.name + ' radius:', this._threeRadius, segmentsOffset);

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
        bumpMap: bumpMap || null,
        bumpScale: bumpMap ? 0.01 : null,
        specularMap: null, // specularMap || null,
        // specular: specularMap ? new THREE.Color(0x0a0a0a) : null
      });
    }

    createAtmosphere(clouds, haze) {
      if (clouds) {
        var segmentsOffset = this.getSphereGeometrySegmentOffset();
        var map = this.getTexture(clouds);

        map.minFilter = THREE.LinearFilter;

        return new THREE.Mesh(
          new THREE.SphereGeometry(this._threeRadius * 1.01, segmentsOffset, segmentsOffset),
          new THREE.MeshPhongMaterial({
            map: map,
            transparent: true,
            opacity: 0.9
          })
        );
      }

      return null;
    }

    createRingGeometry(data) {
      var innerRadius = data.rings.innerRadius * Constants.celestialScale;
      var outerRadius = data.rings.outerRadius * Constants.celestialScale;
      var thetaSegments = 180;
      var phiSegments = 180;
      var geometry = new THREE.RingGeometry(
        innerRadius,
        outerRadius,
        thetaSegments,
        phiSegments,
        0,
        Math.PI * 2
      );

      var map = this.getTexture('src/assets/textures/saturn_rings.png');
      map.minFilter = THREE.NearestFilter;

      var colorMap = this.getTexture('src/assets/textures/saturn_rings_color_map.png');
      colorMap.minFilter = THREE.NearestFilter;

      var material = new THREE.MeshPhongMaterial({
        map: colorMap,
        alphaMap: map,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide
      });

      var ring = new THREE.Mesh(geometry, material);
      ring.position.set(0, 0, 0);
      ring.rotation.x = 90 * Constants.degreesToRadiansRatio;

      this._threeObject.add(ring);
    }

    getSphereGeometrySegmentOffset() {
      return Number.parseInt(this._threeDiameter + 1 * 60);
    }
  }

  return Planet;
});
