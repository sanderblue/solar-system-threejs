define(
[
  'Environment/Constants',
  'Modules/Scene',
  'Modules/RandomNumberGenerator',
  'vendor/ajaxrequest/dist/ajaxrequest'
],
function(Constants, Scene, RandomNumberGenerator, AjaxRequest) {
  'use strict';

  class StarFactory {
    constructor(scene) {
      this._starsCentriod = new THREE.Object3D();
      this._starsCount = 8000;
      this._threeDistanceFromParent = 14959787070 * 40000 * Constants.orbitScale;
      this._randomNumberGenorator = new RandomNumberGenerator();
      this._texture = new THREE.TextureLoader().load('src/assets/textures/star.jpg');
      this._scene = scene;

      this.getStarData();
    }

    getStarData() {
      // var request = new AjaxRequest('GET', 'http://star-api.herokuapp.com/api/v1/stars');

      // request.send().then((data)=> {
      //   console.debug('Star Data:', data);
      // });
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
          size: 5,
          map: this._texture
        });

        var stars = new THREE.Points(geometry, material);

        this._scene.add(stars);

        resolve();
      });
    }
  }

  return StarFactory;
});
