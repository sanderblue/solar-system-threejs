define(
[
  'Environment/Constants',
  'Environment/Stats'
  // 'Controllers/TimeController'
],
function(Constants, Stats) {
  'use strict';

  var tweening = false;

  document.addEventListener('travelStart', (e)=> {
    tweening = true;
  }, false);

  document.addEventListener('travelComplete', (e)=> {
    tweening = false;
  }, false);

  function getElapsedTimeSec(start, end) {
    return (end - start) * 0.001;
  }

  function roundHundred(value) {
    return Math.round(value / 100) * 100;
  }

  function RenderController(scene) {
    this._renderEngine = new THREE.WebGLRenderer();
    this._scene = scene;
    this._camera = scene.camera;

    this.setFrame();

    var self = this;

    var frameEvent = new CustomEvent('frame');

    function render() {
      // Moniter javascript performance
      Stats.begin();

      requestAnimationFrame(render);
      TWEEN.update();
      document.dispatchEvent(frameEvent);
      self._renderEngine.render(self._scene, self._camera);

      Stats.end();
    }

    render();
  }

  RenderController.prototype.setFrame = function() {
    var framecontainer = document.getElementById('solar-system');

    this._renderEngine.setSize(window.innerWidth, window.innerHeight);

    if (framecontainer) {
      framecontainer.appendChild(this._renderEngine.domElement);
    } else {
      document.body.appendChild(this._renderEngine.domElement);
    }
  };

  return RenderController;
});

