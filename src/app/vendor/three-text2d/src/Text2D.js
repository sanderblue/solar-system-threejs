var textAlign = require('./textAlign')
  , CanvasText = require('./CanvasText')

class Text2D extends THREE.Object3D {

  constructor(text = '', options = {}) {
    super();

    this._font = options.font || '30px Arial';
    this._fillStyle = options.fillStyle || '#FFFFFF';

    this.canvas = new CanvasText()

    this.align = options.align || textAlign.center
    this.side = options.side || THREE.DoubleSide

    // this._textAlign = options.align || "center"
    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    this.antialias = typeof(options.antialias==="undefined") ? true : options.antialias
    this.text = text;
  }

  get width () { return this.canvas.textWidth }
  get height () { return this.canvas.textHeight }

  get text() {
    return this._text;
  }

  set text(value) {
    if (this._text !== value) {
      this._text = value;
      this.updateText();
    }
  }

  get font() {
    return this._font;
  }

  set font(value) {
    if (this._font !== value) {
      this._font = value;
      this.updateText();
    }
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(value) {
    if (this._fillStyle !== value) {
      this._fillStyle = value;
      this.updateText();
    }
  }

  updateText() {
    this.cleanUp() // cleanup previous texture

    this.canvas.drawText(this._text, {
      font: this._font,
      fillStyle: this._fillStyle
    })

    this.texture = new THREE.Texture(this.canvas.canvas);
    this.texture.needsUpdate = true;
    this.applyAntiAlias()

    if (!this.material) {
      this.material = new THREE.MeshBasicMaterial({ map: this.texture, side: this.side });
      this.material.transparent = true

    } else {
      this.material.map = this.texture
    }

    if (!this.mesh) {
      this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), this.material);
      this.geometry = this.mesh.geometry
      this.add(this.mesh)
    }

    this.mesh.position.x = ((this.canvas.width/2) - (this.canvas.textWidth/2)) + ((this.canvas.textWidth/2) * this.align.x)
    this.mesh.position.y = (- this.canvas.height/2) + ((this.canvas.textHeight/2) * this.align.y)

    // manually update geometry vertices
    this.geometry.vertices[0].x = this.geometry.vertices[2].x = -this.canvas.width/2
    this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.canvas.width/2
    this.geometry.vertices[0].y = this.geometry.vertices[1].y = this.canvas.height/2
    this.geometry.vertices[2].y = this.geometry.vertices[3].y = -this.canvas.height/2
    this.geometry.verticesNeedUpdate = true
  }

  cleanUp () {
    if (this.texture) {
      this.texture.dispose()
    }
  }

  applyAntiAlias () {
    if (this.antialias === false) {
      this.texture.magFilter = THREE.NearestFilter
      this.texture.minFilter = THREE.LinearMipMapLinearFilter
    }
  }

}

module.exports = Text2D
