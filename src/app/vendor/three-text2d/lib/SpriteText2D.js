'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var textAlign = require('./textAlign'),
    CanvasText = require('./CanvasText');

var SpriteText2D = (function (_THREE$Object3D) {
  _inherits(SpriteText2D, _THREE$Object3D);

  function SpriteText2D() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, SpriteText2D);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpriteText2D).call(this));

    _this._font = options.font || '30px Arial';
    _this._fillStyle = options.fillStyle || '#FFFFFF';

    _this.canvas = new CanvasText();

    _this.align = options.align || textAlign.center;

    // this._textAlign = options.align || "center"
    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    _this.antialias = _typeof(options.antialias === "undefined") ? true : options.antialias;
    _this.text = text;
    return _this;
  }

  _createClass(SpriteText2D, [{
    key: 'updateText',
    value: function updateText() {
      this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle
      });

      // cleanup previous texture
      this.cleanUp();

      this.texture = new THREE.Texture(this.canvas.canvas);
      this.texture.needsUpdate = true;
      this.applyAntiAlias();

      if (!this.material) {
        this.material = new THREE.SpriteMaterial({ map: this.texture });
      } else {
        this.material.map = this.texture;
      }

      if (!this.sprite) {
        this.sprite = new THREE.Sprite(this.material);
        this.geometry = this.sprite.geometry;
        this.add(this.sprite);
      }

      this.sprite.scale.set(this.canvas.width, this.canvas.height, 1);

      this.sprite.position.x = this.canvas.width / 2 - this.canvas.textWidth / 2 + this.canvas.textWidth / 2 * this.align.x;
      this.sprite.position.y = -this.canvas.height / 2 + this.canvas.textHeight / 2 * this.align.y;
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      if (this.texture) {
        this.texture.dispose();
      }
    }
  }, {
    key: 'applyAntiAlias',
    value: function applyAntiAlias() {
      if (this.antialias === false) {
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.LinearMipMapLinearFilter;
      }
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.textWidth;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.textHeight;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text !== value) {
        this._text = value;
        this.updateText();
      }
    }
  }, {
    key: 'font',
    get: function get() {
      return this._font;
    },
    set: function set(value) {
      if (this._font !== value) {
        this._font = value;
        this.updateText();
      }
    }
  }, {
    key: 'fillStyle',
    get: function get() {
      return this._fillStyle;
    },
    set: function set(value) {
      if (this._fillStyle !== value) {
        this._fillStyle = value;
        this.updateText();
      }
    }
  }]);

  return SpriteText2D;
})(THREE.Object3D);

module.exports = SpriteText2D;