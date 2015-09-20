define(function() {
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

  function RenderController(scene, planets) {
    console.debug('RenderController');
    console.debug('Scene:', scene);
    console.debug('Planets:', planets);

    this._renderEngine = new THREE.WebGLRenderer();
    this._scene = scene;
    this._camera = scene.camera;
    this._planets = planets || [];

    this.setFrame();

    var self = this;

    function render() {
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

