define(function() {
  'use strict'

  class Planet {
    constructor(data, options) {
      this.data = data;
      this.object3d = null; // Need to call set object3d() - maybe should be a static method?
    }

    get data() {
      return this.data;
    }

    set data(data) {
      this.data = data;
    }

    get texture() {
      return new THREE.ImageUtils.loadTexture('/textures/' + this.data.name.toLowerCase() + '.jpg');
    }

    set object3d(data) {
      var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      var material = new THREE.MeshPhongMaterial({ map: this.getTexture() });

      this.object3d = new THREE.Mesh(geometry, material);
    }
  }
});
