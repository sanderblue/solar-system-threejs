define(
[
  'Environment/Constants',
  'Modules/Scene',
  'Modules/RandomNumberGenerator'
],
function(Constants, Scene, RandomNumberGenerator) {
  'use strict';

  class StarFactory {
    constructor(scene) {
      this._starsCentriod = new THREE.Object3D();
      this._starsCount = 8000;
      this._threeDistanceFromParent = 14959787070 * 40000 * Constants.orbitScale;
      this._randomNumberGenorator = new RandomNumberGenerator();
      this._texture = new THREE.TextureLoader().load('src/assets/textures/star.jpg');
      this._scene = scene;
    }

    getPosition(i) {
      var x = 0;
      var y = 0;
      var z = 0;

      return this._randomNumberGenorator.getRandomPointInSphere(this._threeDistanceFromParent, x, y, z);
    }

    buildStarField() {
      return new Promise((resolve)=> {
        var particles = this._starsCount;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(particles * 3);
        var colors = new Float32Array(particles * 3);
        var color = new THREE.Color();
        var n = 1000;
        var n2 = n / 2; // particles spread in the cube

        for (var i = 0; i < positions.length; i += 3) {
          var pos = this.getPosition(i);
          var x = pos.x;
          var y = pos.y;
          var z = pos.z;

          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;

          color.setRGB(255, 255, 255);

          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        }

        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();

        var material = new THREE.PointsMaterial({
          size: 1,
          map: this._texture
          // vertexColors: THREE.vertexColors
        });

        var particleSystem = new THREE.Points(geometry, material);

        // this._starsCentriod.add(particleSystem);

        this._scene.add(particleSystem);

        // var geometry = new THREE.SphereGeometry(24, 16, 8);
        // var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // var i;

        // for (i = 0; i < this._starsCount; i++) {
        //   var star = new THREE.Mesh(geometry, material);
        //   var randomizedPosition = this.getPosition(i);

        //   star.position.set(
        //       randomizedPosition.x,
        //       randomizedPosition.y,
        //       randomizedPosition.z
        //   );

        //   var scale = Math.random() + 6;

        //   // Scale it up a bit
        //   star.scale.x = scale;
        //   star.scale.y = scale;
        //   star.scale.z = scale;

        //   // Add the star to the scene
        //   this._scene.add(star);
        // }

        resolve();
      });
    }
  }

  return StarFactory;
});
