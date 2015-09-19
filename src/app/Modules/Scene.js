define(function() {
    'use strict';

    var Scene = (function() {

        // Scene
        var scene = new THREE.Scene();


        // Camera
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5 * Math.pow(10, 12));
        camera.position.set(0, 0, 300);


        // Render Engine
        var renderEngine = new THREE.WebGLRenderer();


        // Ambient Light
        var ambientLight = new THREE.AmbientLight(0xffffff);
        var directionalLightTop = new THREE.DirectionalLight(0xffffff, 1); // 0.13
        var directionalLightBottom = new THREE.DirectionalLight(0xffffff, 1); // 0.13

        directionalLightTop.position.set(0, 0, 1000);
        directionalLightBottom.position.set(0, 0, -1000)
        scene.add(directionalLightTop);
        scene.add(directionalLightBottom);


        // Get the scene ready.
        document.body.appendChild(renderEngine.domElement);
        renderEngine.setSize(window.innerWidth, window.innerHeight);

        // Add the lights
        // scene.add(ambientLight);

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
