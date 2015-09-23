define(
[
  'Environment/Constants',
  'Controllers/TimeController'
],
function(Constants, TimeCtrl) {
  'use strict';

  // class RenderController extends THREE.WebGLRenderer {
  //   constructor(scene, threePlanets) {
  //     super();

  //     this._scene = scene;
  //     this._threePlanets = threePlanets;
  //   };

  //   render() {
  //     requestAnimationFrame(this.render);
  //     super.render(this._scene, this._scene.camera);
  //   };
  // }

  function roundHundred(value){
    return Math.round(value / 100) * 100;
  }

  function RenderController(scene, planets) {
    this._renderEngine = new THREE.WebGLRenderer();
    this._scene = scene;
    this._camera = scene.camera;
    this._planets = planets || [];

    this.setFrame();

    var self = this;

    function render() {
      var delta = TimeCtrl.threeClock.getDelta();
      var elapsedTime = roundHundred(TimeCtrl.time);

      TimeCtrl.start();

      var degreesPerFrame = delta * (2 * Math.PI / 24); // 24s == 1 Earth day

      if (elapsedTime !== 24000 || elapsedTime !== 72000) {
        self._planets[2].rotation.y += degreesPerFrame;
      }

      if (elapsedTime == 12000) {
        console.debug('Rotation at 12s: ', self._planets[2].rotation.y * Constants.radiansToDegreesRatio);
      }

      if (elapsedTime == 24000) {
        console.debug('Rotation at 24s: ', self._planets[2].rotation.y * Constants.radiansToDegreesRatio);
      }

      if (elapsedTime == 48000) {
        console.debug('Rotation at 48s: ', self._planets[2].rotation.y * Constants.radiansToDegreesRatio);
      }

      if (elapsedTime == 72000) {
        console.debug('Rotation at 72s: ', self._planets[2].rotation.y * Constants.radiansToDegreesRatio);
      }

      requestAnimationFrame(render);

      self._renderEngine.render(self._scene, self._camera);
    }

    render();
  }

  RenderController.prototype.setFrame = function() {
    document.body.appendChild(this._renderEngine.domElement);

    this._renderEngine.setSize(window.innerWidth, window.innerHeight);
  };

  return RenderController;
});

