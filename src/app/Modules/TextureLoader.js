define(function() {

    class TextureLoader {
        get(src) {
            return new THREE.ImageUtils.loadTexture(src);
        }
    }

});
