# three-orbit-controls

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

ThreeJS OrbitControls as an npm module. See [test](#testing) for an example.

```js
var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

function start(gl, width, height) {
    renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas
    })
    renderer.setClearColor(0x000000, 1.0)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000)
    camera.position.set(0, 1, -3)
    camera.lookAt(new THREE.Vector3())

    controls = new OrbitControls(camera)

    var geo = new THREE.BoxGeometry(1,1,1)
    var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })
    var box = new THREE.Mesh(geo, mat)
    scene.add(box)
}

function render(gl, width, height) {
    renderer.render(scene, camera)
}
```

## Usage

[![NPM](https://nodei.co/npm/three-orbit-controls.png)](https://nodei.co/npm/three-orbit-controls/)

#### `OrbitControls = require('three-orbit-controls')(THREE)`

This module exports a function which accepts an instance of THREE, and returns an OrbitControls class. This allows you to use the module with CommonJS, globals, etc.

The returned function has the following constructor pattern:

```js
controls = new OrbitControls(camera[, domElement])
```

#### Versioning

This uses an unusual versioning system to better support ThreeJS's (lack of) versioning. The major version of this repo will line up with ThreeJS breaking releases (`69.0.0` => `r69`). Often the module will continue to work (i.e. `69.0.0` should work with r70).

The minor will be reserved for any new features, and patch for bug fixes and documentation/readme updates. In some rare cases, a minor feature may introduce a breaking change; so it's generally safest to use tilde or `--save-exact` for this module.

If you see any version issues, open a ticket!

## testing

Git clone, `npm install` and then run `npm start` to spin up a development server. Open `localhost:9966` in your browser to see the `test.js` file in action.
