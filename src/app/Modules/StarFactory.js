define(
[
  'Environment/Constants',
  'Modules/Scene',
  'Modules/RandomNumberGenorator'
],
function(Constants, Scene, RandomNumberGenorator) {
  'use strict';

  class StarFactory {
    constructor(scene) {
      this._starsCentriod = new THREE.Object3D();
      this._starsCount = 1000;
      // this._minDiameter = 0.75;
      // this._maxDiameter = 2
      this._threeDistanceFromParent = 6753036100 * Math.pow(10, -5.1); // Constants.orbitScale;
      this._randomNumberGenorator = new RandomNumberGenorator();
      this._starlight = new THREE.PointLight(0xffffff, 1, this._threeDistanceFromParent * 1.5, 0.1);
      this._starlight = new THREE.AmbientLight(0xffffff, 0.5);

      // this._surface = new THREE.MeshLambertMaterial({ shininess: 10 });
      this._surface = new THREE.MeshPhongMaterial({
        opacity: 0.8,
        lightMap: 0xffffff,
        shading: THREE.SmoothShading
      });
      this._scene = scene;
    }

    getPosition(i) {
      var x = 0;
      var y = 0;
      var z = 0;

      return this._randomNumberGenorator.getRandomPointInSphere(this._threeDistanceFromParent, x, y, z);
    }

    buildStar(i) {
      var radius = 20;
      var geometry = new THREE.SphereGeometry(radius, 6, 6);
      var star = new THREE.Mesh(geometry, this._surface);
      var randomizedPosition = this.getPosition(i);

      star.position.set(
          randomizedPosition.x,
          randomizedPosition.y,
          randomizedPosition.z
      );

      return star;
    }

    build() {
      var stars = [];

      for (var i = 0; i < this._starsCount; i++) {
        var star = this.buildStar(i);

        star.add(this._starlight);

        this._starsCentriod.add(star);
      }

      this._scene.add(this._starsCentriod);

      console.debug('Done... Stars', stars);
    }
  }

  return StarFactory;
});
