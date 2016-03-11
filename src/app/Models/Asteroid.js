define(
[
  'Models/CelestialObject'
],
function(CelestialObject) {

  class Asteroid extends CelestialObject {
    constructor() {
      super();

      this._threeObject = new THREE.Object3D();
      this._threeObject.add(new THREE.AxisHelper(400));

      // if (!texture) {
      //   throw new Error('Missing argument 1 "texture" for Asteroid object constructor.');
      // }

      // this._texture = texture || new THREE.TextureLoader().load('/textures/crust_tiny.jpg');
      // this._id = index || String(Math.random()).slice(1, 3);
      // this._threeDiameter = 0.5;
      // this._surface = this.createSurface();
      // this._threeObject = this.createGeometry(this._surface);
    }

    get threeObject() {
      return this._threeObject;
    }
  }

  return Asteroid;
});
