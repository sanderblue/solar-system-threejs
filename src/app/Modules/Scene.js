define(function() {
    'use strict';

    var Scene = (function() {

        // Scene
        var scene = new THREE.Scene();


        // Camera
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 40;


        // Render Engine
        var renderEngine = new THREE.WebGLRenderer();


        // Ambient Light
        var ambientLight = new THREE.AmbientLight(0xffffff);


        // Get the scene ready.
        document.body.appendChild(renderEngine.domElement);
        renderEngine.setSize( window.innerWidth, window.innerHeight );

        // Add the lights
        scene.add(ambientLight);


        console.log('Camera Distance - Z:', camera.position.z);

        var render = function() {
            requestAnimationFrame(render);
            renderEngine.render(scene, camera);
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
