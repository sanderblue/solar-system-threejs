define(
[
  'Environment/Constants'
  // ,
  // 'stats'
  // 'Controllers/TimeController'
],
function(Constants) {
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

  function getElapsedTimeSec(start, end) {
    return (end - start) * 0.001;
  }

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

    var frameEvent = new CustomEvent('frame');

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms, 2: mb

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    function render() {
      // Moniter javascript performance
      stats.begin();

      requestAnimationFrame(render);
      document.dispatchEvent(frameEvent);
      self._renderEngine.render(self._scene, self._camera);

      stats.end();
    }

    render();
  }

  RenderController.prototype.setFrame = function() {
    document.body.appendChild(this._renderEngine.domElement);

    this._renderEngine.setSize(window.innerWidth, window.innerHeight);
  };

  return RenderController;
});

