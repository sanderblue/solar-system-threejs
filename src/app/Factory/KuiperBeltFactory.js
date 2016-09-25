define(
[
  'Modules/Scene',
  'Environment/Constants',
  'Modules/RandomNumberGenerator',
],
function(Scene, Constants, RandomNumberGenerator) {
  'use strict';

  class KuiperBeltFactory {
    constructor(scene, data) {
      this._scene = scene || null;
      this._count = data.kuiperBelt.count || 1000;
      this._distanceFromParentMin = data.kuiperBelt.distanceFromParent.min;
      this._distanceFromParentMax = data.kuiperBelt.distanceFromParent.max;
      this._distanceFromParentMedian = this.calculateDistanceFromParentMedian();
      this._texture = new THREE.TextureLoader().load('src/assets/textures/asteroid_dark.jpg');
      this._randomNumberGenerator = new RandomNumberGenerator();
      this._orbitCentroid = new THREE.Object3D();
      this._orbitRadian = 360 / 112897;
      this._d2r = Constants.degreesToRadiansRatio;
    }

    build() {
      return new Promise((resolve, reject)=> {
        var particles = this._count;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(particles * 3);
        var colors = new Float32Array(particles * 3);
        var color = new THREE.Color();
        var n = 1000;
        var n2 = n / 2; // particles spread in the cube

        var material = new THREE.PointsMaterial({
          size: 1,
          map: this._texture
        });

        for (var i = 0; i < positions.length; i += 3) {
          this._orbitCentroid.rotation.z += Math.random() + 1;

          var pos = this.positionObject(null, i);
          var x = pos.x;
          var y = pos.y;
          var z = pos.z;

          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;
        }

        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();

        var particleSystem = new THREE.Points(geometry, material);

        this._orbitCentroid.add(particleSystem);

        this._scene.add(this._orbitCentroid);

        document.addEventListener('frame', (e)=> {
          var degreesToRotate = 0.002;

          this._orbitCentroid.rotation.z += degreesToRotate * Constants.degreesToRadiansRatio;
        }, false);

        resolve();
      });
    }

    positionObject(object, count) {
      var odd = count % 2;
      var d = this._distanceFromParentMin * Constants.orbitScale;

      d = d + (count / count.toFixed(0).length);

      // console.log('Distance: ',d);

      var randomNumber = this._randomNumberGenerator.getRandomNumberWithinRange(1, 8000000, 64) * (Math.random() + 1);
      var randomOffset = odd ? randomNumber * (Math.random() + 0.2) : randomNumber * (Math.random() + 0.05);

      // console.debug('randomNumber', randomNumber);

      var amplitude = d + randomOffset * (3 + Math.random());
      var theta = count + 1 * Math.random() * this._orbitRadian * this._d2r;

      var posX = amplitude * Math.cos(theta);
      var posY = amplitude * Math.sin(theta);

      // console.debug('randomOffset', randomOffset);
      // console.debug('randomNumber', randomNumber);

      var posZ = this._randomNumberGenerator.getRandomArbitraryNumber(-7000, 7000);

      return {
        x: posX,
        y: posY,
        z: posZ
      }
    }

    calculateDistanceFromParentMedian() {
        return Number.parseFloat((this._distanceFromParentMin + this._distanceFromParentMax) / 2);
    }
  }

  return KuiperBeltFactory;
});
