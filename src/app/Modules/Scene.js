define(function() {
    'use strict';

    var Scene = (function() {

        // Scene
        var scene = new THREE.Scene();


        // Camera
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5 * Math.pow(10, 12));
        camera.position.z = 1200;
        camera.position.y = 0;


        // Render Engine
        var renderEngine = new THREE.WebGLRenderer();


        // Ambient Light
        var ambientLight = new THREE.AmbientLight(0xffffff);


        // Get the scene ready.
        document.body.appendChild(renderEngine.domElement);
        renderEngine.setSize(window.innerWidth, window.innerHeight);

        // Add the lights
        scene.add(ambientLight);

        console.debug('Camera Distance - X:', camera.position.x);
        console.debug('Camera Distance - Y:', camera.position.x);
        console.debug('Camera Distance - Z:', camera.position.z);

        camera.lookAt(new THREE.Vector3(0,0,0));

        var render = function() {
            requestAnimationFrame(render);
            renderEngine.render(scene, camera);

            // scene.rotation.z += 1 * 0.0174532925;
        };

        render();

        return {
            scene: scene,
            camera: camera,
            renderEngine: renderEngine
        }
    })();

    return Scene;
});
