'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fontHeightCache = {};

var CanvasText = (function () {
  function CanvasText() {
    _classCallCheck(this, CanvasText);

    this.textWidth = null;
    this.textHeight = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(CanvasText, [{
    key: 'drawText',
    value: function drawText(text, ctxOptions) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = ctxOptions.font;

      this.textWidth = Math.ceil(this.ctx.measureText(text).width);
      this.textHeight = getFontHeight(this.ctx.font);

      this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth);
      this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight);

      this.ctx.font = ctxOptions.font;
      this.ctx.fillStyle = ctxOptions.fillStyle;
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'top';

      this.ctx.fillText(text, 0, 0);

      return this.canvas;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.height;
    }
  }]);

  return CanvasText;
})();

function getFontHeight(fontStyle) {
  var result = fontHeightCache[fontStyle];

  if (!result) {
    var body = document.getElementsByTagName('body')[0];
    var dummy = document.createElement('div');

    var dummyText = document.createTextNode('MÉq');
    dummy.appendChild(dummyText);
    dummy.setAttribute('style', 'font:' + fontStyle + ';position:absolute;top:0;left:0');
    body.appendChild(dummy);
    result = dummy.offsetHeight;

    fontHeightCache[fontStyle] = result;
    body.removeChild(dummy);
  }

  return result;
}

module.exports = CanvasText;