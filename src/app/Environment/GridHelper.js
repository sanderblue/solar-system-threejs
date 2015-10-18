define(function() {
  'use strict';

  const SIZE = 360 * 2;
  const STEP = 360;

  class GridHelper extends THREE.GridHelper {
    constructor(size, step) {
      var size = size || SIZE;
      var step = step || STEP;

      super(size, step);

      this.setAxis();
    }

    setAxis() {
      this.rotation.x = 90 * 0.0174532925;
    }
  }

  return GridHelper;
});
