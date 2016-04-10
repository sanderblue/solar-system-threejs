define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Modules/RandomNumberGenerator'
],
function(Constants, CelestialObject, RandomNumberGenerator) {
  'use strict';

  class Asteroid extends CelestialObject {
    constructor(index, texture) {
      super();

      this._randomNumberGenerator = new RandomNumberGenerator();
      this._texture = texture;
      this._id = index || String(Math.random()).slice(1, 4);
      this._threeObject = this.createGeometry();
      this._orbitInclination = this.createHypotheticalOrbitInclination(index);// (Math.random() * this._randomNumberGenerator.getRandomNumberWithinRange(1, 15) / 90);
      this._orbitCentroid = new THREE.Object3D();
      this._orbitCentroid.rotation.x = this._orbitInclination;
      this._orbitCentroid.add(this._threeObject);

      // this._threeObject.add(new THREE.AxisHelper(100));
    }

    get threeObject() {
      return this._threeObject;
    }

    get orbitCentroid() {
      return this._orbitCentroid;
    }

    createHypotheticalOrbitInclination(index) {
      var isOdd = index % 2;
      var degrees = this._randomNumberGenerator.getRandomNumberWithinRange(1, 3) + Math.random();

      if (isOdd) {
        degrees = degrees * -1;
      }

      return degrees * Constants.degreesToRadiansRatio;
    }

    createGeometry() {
      var materials = [
        new THREE.MeshPhongMaterial({ map: this._texture }),
        new THREE.MeshLambertMaterial({ emissive: 0xffffff, transparent: true, opacity: 0.2, wireframe: true })
      ];

      return new THREE.SceneUtils.createMultiMaterialObject(new THREE.TetrahedronGeometry(7), materials);
    }
  }

  return Asteroid;
});
