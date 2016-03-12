define(
[
  'Environment/Constants',
  'Models/CelestialObject',
  'Modules/RandomNumberGenerator'
],
function(Constants, CelestialObject, RandomNumberGenerator) {

  class Asteroid extends CelestialObject {
    constructor(index, texture) {
      super();

      this._texture = texture;
      this._id = index || String(Math.random()).slice(1, 3);
      this._threeObject = this.createGeometry();
      this._randomNumberGenerator = new RandomNumberGenerator();
      this._orbitInclination = (Math.random() * this._randomNumberGenerator.getRandomNumberWithinRange(1, 7) / 90);
      this._orbitCentroid = new THREE.Object3D();
      this._orbitCentroid.rotation.x = this._orbitInclination;
      this._orbitCentroid.rotation.z = 360 / index;
      this._orbitCentroid.add(this._threeObject);

      this._threeObject.add(new THREE.AxisHelper(100));
    }

    get threeObject() {
      return this._threeObject;
    }

    get orbitCentroid() {
      return this._orbitCentroid;
    }

    createGeometry() {
      var materials = [
        new THREE.MeshPhongMaterial({ map: this._texture }),
        new THREE.MeshLambertMaterial({ emissive: 0xE6E6E6, transparent: true, opacity: 0.2, wireframe: true })
      ];

      return new THREE.SceneUtils.createMultiMaterialObject(new THREE.TetrahedronGeometry(8), materials);
    }
  }

  return Asteroid;
});
