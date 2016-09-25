define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Models/Orbit',
  'vendor/three-text2d/dist/three-text2d',
  'Extensions/RadialRingGeometry'
],
function(
  Constants,
  CelestialObject,
  Orbit,
  ThreeText,
  RadialRingGeometry
) {
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
      this._orbitalInclination = data.orbitalInclination || null; // to the ecliptic plane
      this._axialTilt = data.axialTilt || null;
      this._meanTemperature = data.meanTemperature || null;
      this._orbitPositionOffset = data.orbitPositionOffset;
      this._orbitHighlightColor = data.orbitHighlightColor || "#2d2d2d";
      this._textureLoader = new THREE.TextureLoader();
      this._threeDiameter = this.createThreeDiameter();
      this._threeRadius = this.createThreeRadius();
      this._surface = this.createSurface(data._3d.textures.base, data._3d.textures.topo, data._3d.textures.specular);
      this._atmosphere = this.createAtmosphere(data._3d.textures.clouds);
      this._threeObject = this.createGeometry(this._surface, this._atmosphere);
      this._threeDistanceFromParent = this.createThreeDistanceFromParent();
      this._threeParent = threeParent || null;
      this._moons = [];
      this._theta = 0;
      this._orbitCentroid = this.createOrbitCentroid();
      this._highlight = this.createHighlight();

      if (data.rings) {
        this.createRingGeometry(data);
      }

      // console.debug(this._name + ' Diameter: '+ this._threeDiameter);

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

    get orbitPositionOffset() {
      return this._orbitPositionOffset;
    }

    get theta() {
      return this._theta;
    }

    set theta(theta) {
      this._theta = theta;
    }

    get highlight() {
      return this._highlight;
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

    get orbitHighlightColor() {
      return this._orbitHighlightColor;
    }

    set highlight(amplitude) {
      this._highlight = this.createHighlight(amplitude);
    }

    createOrbitCentroid() {
      return new THREE.Object3D();
    }

    createLabelSprite() {
      var sprite = new ThreeText.SpriteText2D(this._name, {
        align: ThreeText.textAlign.center,
        font: '400px Arial',
        fillStyle: '#ffffff',
        antialias: false
      });

      this._core.add(sprite);
    }

    setAxes() {
      this._threeObject.rotation.y = this._axialTilt * Constants.degreesToRadiansRatio;
      this._core.rotation.y = this._axialTilt * Constants.degreesToRadiansRatio;
      // this._objectCentroid.rotation.y = this._axialTilt * Constants.degreesToRadiansRatio;
    }

    buildFullObject3D() {
      this.setAxes();
      // this.createLabelSprite();

      this._orbitLine = new Orbit(this);
      this._orbitCentroid.add(
        this._threeObject,
        this._core,
        this._orbitLine.orbit,
        this._objectCentroid
      );

      // Axis Helper (x = red, y = green, z = blue)
      // this._threeObject.add(new THREE.AxisHelper(this._threeDiameter * 2 + 1));
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
        var texture = this._textureLoader.load(src);

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

      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            this._threeRadius - 0.1,
            segmentsOffset,
            segmentsOffset
          )
        )
      ;

      mesh.add(surface);

      if (atmosphere) {
        mesh.add(atmosphere);
      }

      return mesh;
    }

    createSurface(base, topo, specular) {
      if (!base) {
        return;
      }

      var hiRes = false;
      var segmentsOffset = Number.parseInt(this._threeDiameter + 1.1 * 60);

      if (hiRes) {
        segmentsOffset = Number.parseInt(this._threeDiameter + 1.5 * 120);
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

      var surface = new THREE.MeshPhongMaterial({
        map: map,
        bumpMap: bumpMap || null,
        bumpScale: bumpMap ? 0.015 : null,
        specularMap: null, // specularMap || null,
        // specular: specularMap ? new THREE.Color(0x0a0a0a) : null
      });

      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            this._threeRadius,
            segmentsOffset,
            segmentsOffset
          ),
          surface
        )
      ;

      mesh.rotation.x = 90 * Constants.degreesToRadiansRatio;

      return mesh;
    }

    createAtmosphere(clouds, haze) {
      if (clouds) {
        var segmentsOffset = this.getSphereGeometrySegmentOffset();
        var map = this.getTexture(clouds);

        map.minFilter = THREE.LinearFilter;

        var mesh = new THREE.Mesh(
          new THREE.SphereGeometry(this._threeRadius * 1.01, segmentsOffset, segmentsOffset),
          new THREE.MeshPhongMaterial({
            map: map,
            transparent: true,
            opacity: 0.9
          })
        );

        mesh.rotation.x = 90 * Constants.degreesToRadiansRatio;

        return mesh;
      }

      return null;
    }

    createRingGeometry(data) {
      var innerRadius = data.rings.innerRadius * Constants.celestialScale;
      var outerRadius = data.rings.outerRadius * Constants.celestialScale;
      var thetaSegments = 180;
      var phiSegments = 80;
      var geometry = new RadialRingGeometry(
        innerRadius,
        outerRadius,
        thetaSegments
      );

      var map = this._textureLoader.load(data.rings.textures.base); // THREE.ImageUtils.loadTexture(data.rings.textures.base);
      map.minFilter = THREE.NearestFilter;

      var colorMap = this._textureLoader.load(data.rings.textures.colorMap); // THREE.ImageUtils.loadTexture(data.rings.textures.colorMap);
      colorMap.minFilter = THREE.NearestFilter;

      var material = new THREE.MeshLambertMaterial({
        map: colorMap,
        alphaMap: map,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide
      });

      var ring = new THREE.Mesh(geometry, material);
      ring.position.set(0, 0, 0);

      this._threeObject.add(ring);
    }

    createHighlight(amplitude) {
      var resolution = 2880; // segments in the line
      var length = 360 / resolution;
      var highlightDiameter = this._threeDiameter > 4 ? this._threeDiameter * 45 : this._threeDiameter * 75;
      var orbitAmplitude = amplitude || highlightDiameter;
      var orbitLine = new THREE.Geometry();
      var material = new THREE.MeshBasicMaterial({
        color: '#ffbd00', // '#00ffff',
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

    getSphereGeometrySegmentOffset() {
      return Number.parseInt(this._threeDiameter + 1 * 60);
    }
  }

  return Planet;
});
