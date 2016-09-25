define(function() {
  'use strict';

  class ColorManager {
    constructor() {}

    /**
     * Fades out the material of a 3D object.
     *
     * @param  {Object3D} object
     * @param  {Object}   rgb    [Should be in the form of { r: 0, g: 0, b: 0 }]
     * @param  {Number}   speed  [milliseconds]
     * @return {Tween}
     */
    fadeOut(object, rgb, speed) {
      speed = speed || 1000;

      return new TWEEN.Tween({ r: rgb.r, g: rgb.b, b: rgb.b })
        .to({
          r: 0,
          g: 0,
          b: 0
        }, speed)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(a) {
          object.material.color.setRGB(this.r, this.g, this.b);
          object.material.opacity -= 0.05;
        })
        .start()
      ;
    }

    fadeTo(object, startRGB, endRGB, speed) {
      speed = speed || 1000;

      return new TWEEN.Tween({ r: startRGB.r, g: startRGB.b, b: startRGB.b })
        .to({
          r: endRGB.r || 0,
          g: endRGB.g || 0,
          b: endRGB.b || 0
        }, speed)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(a) {
          object.material.color.setRGB(this.r, this.g, this.b);
          object.material.opacity -= 0.015;
        })
        .start()
      ;
    }
  }

  return ColorManager;
});
