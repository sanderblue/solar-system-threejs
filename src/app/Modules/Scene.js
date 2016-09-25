define(
[
  'vendor/THREEOrbitControls/umd/index',
],
function(OrbitControls) {
  'use strict';

  class Scene extends THREE.Scene {
    constructor() {
      super();

      this._sceneElement = document.getElementById('solar-system');
      this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 5 * Math.pow(10, 13));
      this._orbitControls = new OrbitControls(this._camera, this._sceneElement);

      // this.setCamera();
      this.setLights();
      this.setAxis();
    };

    get camera() {
      return this._camera;
    };

    get orbitControls() {
      return this._orbitControls;
    }

    setCamera() {
      this._camera.position.set(0, 0, 300);
      this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    setLights() {
      var ambientLightCount = 4;

      for (var i = 0; i < ambientLightCount; i++) {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.175/* 0.125 */);

        this.setObjectPosition(directionalLight, i);

        super.add(directionalLight);
      }
    };

    setObjectPosition(object, index) {
      switch(index) {
        case 0:
          object.position.set(0, 0, 10000);
          break;
        case 1:
          object.position.set(0, 0, -10000);
          break;
        case 2:
          object.position.set(10000, 0, 0);
          break;
        case 3:
          object.position.set(-10000, 0, 0);
          break;
      }
    };

    setAxis() {
      this.rotation.x = 90 * 0.0174532925;
    };
  }

  return Scene;
});
