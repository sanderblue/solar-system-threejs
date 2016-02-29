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
      this._starsCount = 3000;
      this._threeDistanceFromParent = 14959787070 * 2.5 * Constants.orbitScale;
      this._randomNumberGenorator = new RandomNumberGenorator();
      this._scene = scene;
    }

    getPosition(i) {
      var x = 0;
      var y = 0;
      var z = 0;

      return this._randomNumberGenorator.getRandomPointInSphere(this._threeDistanceFromParent, x, y, z);
    }

    buildStarField() {
      var geometry = new THREE.SphereGeometry(24, 16, 8);
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (var i = 0; i < this._starsCount; i++) {
        var star = new THREE.Mesh(geometry, material);
        var randomizedPosition = this.getPosition(i);

        star.position.set(
            randomizedPosition.x,
            randomizedPosition.y,
            randomizedPosition.z
        );

        var scale = Math.random() + 6;

        // Scale it up a bit
        star.scale.x = scale;
        star.scale.y = scale;
        star.scale.z = scale;

        // Add the star to the scene
        this._scene.add(star);
      }
    }
  }

  return StarFactory;
});
