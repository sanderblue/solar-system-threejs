'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var textAlign = require('./textAlign'),
    CanvasText = require('./CanvasText');

var Text2D = (function (_THREE$Object3D) {
  _inherits(Text2D, _THREE$Object3D);

  function Text2D() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Text2D);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Text2D).call(this));

    _this._font = options.font || '30px Arial';
    _this._fillStyle = options.fillStyle || '#FFFFFF';

    _this.canvas = new CanvasText();

    _this.align = options.align || textAlign.center;
    _this.side = options.side || THREE.DoubleSide;

    // this._textAlign = options.align || "center"
    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    _this.antialias = _typeof(options.antialias === "undefined") ? true : options.antialias;
    _this.text = text;
    return _this;
  }

  _createClass(Text2D, [{
    key: 'updateText',
    value: function updateText() {
      this.cleanUp(); // cleanup previous texture

      this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle
      });

      this.texture = new THREE.Texture(this.canvas.canvas);
      this.texture.needsUpdate = true;
      this.applyAntiAlias();

      if (!this.material) {
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, side: this.side });
        this.material.transparent = true;
      } else {
        this.material.map = this.texture;
      }

      if (!this.mesh) {
        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), this.material);
        this.geometry = this.mesh.geometry;
        this.add(this.mesh);
      }

      this.mesh.position.x = this.canvas.width / 2 - this.canvas.textWidth / 2 + this.canvas.textWidth / 2 * this.align.x;
      this.mesh.position.y = -this.canvas.height / 2 + this.canvas.textHeight / 2 * this.align.y;

      // manually update geometry vertices
      this.geometry.vertices[0].x = this.geometry.vertices[2].x = -this.canvas.width / 2;
      this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.canvas.width / 2;
      this.geometry.vertices[0].y = this.geometry.vertices[1].y = this.canvas.height / 2;
      this.geometry.vertices[2].y = this.geometry.vertices[3].y = -this.canvas.height / 2;
      this.geometry.verticesNeedUpdate = true;
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

  return Text2D;
})(THREE.Object3D);

module.exports = Text2D;