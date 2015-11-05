define(
[
    'Scene',
    'Environment/Constants',
    'Modules/RandomNumberGenorator'
],
function(Scene, Constants, RandomNumberGenorator) {

  class StarFactory {
    constructor() {
      this._starsCentriod = new THREE.Object3D();
      this._threeDistanceFromParent = 6753036100 * Constants.orbitScale;
      this._randomNumberGenorator = new RandomNumberGenorator();
    }

    getPosition() {
      var isSecond = i % 2 == 0,
        isThird = i % 3 == 0,
        isFourth = i % 4 == 0,
        x = 0,
        y = 0,
        z = 0
      ;

      return RandomNumber.getRandomPointInSphere(StarFactory.distanceFromCenter, x, y, z);
    }

    buildStar(i) {
      var material = new THREE.MeshLambertMaterial({
        ambient: 0xffffff,
        emissive: 0xffffff,
        shininess: 1000
      });

      var radius = RandomNumber.getRandomNumberWithinRange(SolarSystem.stars.sizeRange.min, SolarSystem.stars.sizeRange.max);
      var geometry = new THREE.SphereGeometry(radius, 5, 3),
      var star = new THREE.Mesh(geometry, material),
      var randomizedPosition = this.getPosition(i);

      star.position.set(
          randomizedPosition.x,
          randomizedPosition.y,
          randomizedPosition.z
      );

      this._starsCentriod.add(star);
    }

    build() {
      for (var i = 0; i < SolarSystem.stars.count; i++) {
         this.buildStar(i);
      }
    }

    addStars() {
        Scene.scene.add(StarFactory.starsCentriod);
    }
  }

  return StarFactory;
);
