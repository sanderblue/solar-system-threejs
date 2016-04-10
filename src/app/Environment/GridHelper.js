define(function() {
  'use strict';

  const SIZE = 100;
  const STEP = 1 * Math.pow(10, 4);

  class GridHelper extends THREE.GridHelper {
    constructor(size, step) {
      var size = size || SIZE;
      var step = step || STEP;

      super(size, step);

      // this.setAxis();
    }

    setAxis() {
      this.rotation.x = 90 * 0.0174532925;
    }
  }

  return GridHelper;
});
