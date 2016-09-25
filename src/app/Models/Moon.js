define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Models/Orbit'
],
function(Constants, CelestialObject, Orbit) {
  'use strict';

  class Moon extends CelestialObject {
    constructor(data, threeParent, parentData, orbitColor) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._id = data.id || null;
      this._name = data.name || null;
      this._distanceFromParent = data.distanceFromParent || null;
      this._orbitalPeriod = data.orbitalPeriod || null;
      this._orbitalInclination = data.orbitalInclination || null; // to the equatorial plane of the parent object
      this._mass = data.mass || null;
      this._orbitColorDefault = '#424242';
      this._orbitColor = this._orbitColorDefault; // || orbitColor

      // THREE properties
      this._threeDiameter = this.createThreeDiameter();
      this._threeRadius = this.createThreeRadius();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo);
      this._threeObject = this.createGeometry(this._surface);
      this._threeDistanceFromParent = this.createThreeDistanceFromParent();
      this._threeParent = threeParent || null;
      // this._threeObject.rotation.x = 90 * Constants.degreesToRadiansRatio;
      this._parentData = parentData || null;
      this._orbitCentroid = this.createOrbitCentroid();
      this._highlight = this.createHighlight();

      this.buildFullObject3D();
    }


    /**
     * Moon Data
     */
    get id() {
      return this._id;
    }

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

    get mass() {
      return this._mass;
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

    get orbitLine() {
      return this._orbitLine;
    }

    get orbitCentroid() {
      return this._orbitCentroid;
    }

    get orbitColor() {
      return this._orbitColor;
    }

    get orbitColorDefault() {
      return this._orbitColorDefault;
    }

    get parentData() {
      return this._parentData;
    }

    get highlight() {
      return this._highlight;
    }

    set highlight(amplitude) {
      this._highlight = this.createHighlight(amplitude);
    }

    createHighlight(amplitude) {
      var resolution = 2880; // segments in the line
      var length = 360 / resolution;
      var highlightDiameter = this._threeDiameter > 4 ? this._threeDiameter * 45 : this._threeDiameter * 75;
      var orbitAmplitude = amplitude || highlightDiameter;
      var orbitLine = new THREE.Geometry();
      var material = new THREE.MeshBasicMaterial({
        color: '#3beaf7',
        transparent: true,
        opacity: 0,
        depthTest: false
      });

      for (var i = 0; i <= resolution; i++) {
        var segment = (i * length) * Math.PI / 180;

        orbitLine.vertices.push(
          new THREE.Vector3(
            Math.cos(segment) * orbitAmplitude,
            Math.sin(segment) * orbitAmplitude,
            0
          )
        );
      }

      var line = new THREE.Line(orbitLine, material);

      line.rotation.y += 90 * Constants.degreesToRadiansRatio;
      line.position.set(0, 0, 0);

      this._core.add(line);

      return line;
    }

    createOrbitCentroid() {
      return new THREE.Object3D();
    }

    buildFullObject3D() {
      this._orbitLine = new Orbit(this, this._orbitColorDefault);

      this._orbitCentroid.add(
        this._threeObject,
        this._core,
        this._orbitLine.orbit
      );
    }

    createThreeDiameter() {
      if (this._diameter < 300) {
        return this._diameter * 0.0007;
      }

      return this._diameter * Constants.celestialScale;
    }

    createThreeRadius() {
      if (this._diameter < 300) {
        return this._diameter * 0.0007 / 2;
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
        // this._textureLoader = new THREE.TextureLoader();
        var texture = new THREE.TextureLoader().load(src);

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        if (filter) {
          texture.filter = filter;
        }2

        return texture;
      }
    }

    createGeometry(surface, atmosphere) {
      var segmentsOffset = Number.parseInt(this._threeDiameter + 1 * 35);
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

      // if (topo) {
      //   var bumpMap = this.getTexture(topo);

      //   bumpMap.minFilter = THREE.NearestFilter;
      // }

      return new THREE.MeshLambertMaterial({
        map: map
        // bumpMap: bumpMap || null,
        // bumpScale: bumpMap ? 0.012 : null,
      });
    }
  }

  return Moon;
});
