define(function() {
    'use strict';

    // class Scene extends THREE.Scene {
    //     constructor() {

    //     }
    // }


    var Scene = function() {
        this.setScene();
        this.setContainer();
        this.setRenderEngine();
        this.setLights();
        this.setCamera();
        this.setFocalPoint();
    };

    Scene.prototype.setScene = function() {
        this.scene = new THREE.Scene();

        this.scene.add(new THREE.AxisHelper(3000));

        App.scene = this.scene;
    };

    Scene.prototype.setContainer = function() {
        this.container = document.getElementById('solar-system');
    };

    Scene.prototype.setRenderEngine = function() {
        var renderEngine = new THREE.WebGLRenderer({ antialias: true });

        renderEngine.setSize(window.innerWidth, window.innerHeight);

        this.renderEngine = renderEngine;

        document.body.appendChild(this.renderEngine.domElement);
    };

    Scene.prototype.setLights= function() {
        var fromTop    = new THREE.DirectionalLight(0xffffff, 2, { target: new THREE.Vector3(0, 0, 0)}),
            fromBottom = new THREE.DirectionalLight(0xffffff, 2, { target: new THREE.Vector3(0, 0, 0)})
        ;

        fromTop.position.set(0, 0, 1000);
        fromBottom.position.set(0, 0, -1000);

        this.scene.add(fromTop);
        this.scene.add(fromBottom);
    };

    Scene.prototype.setCamera = function() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1 * Math.pow(10, 12)
        );
    };

    Scene.prototype.setFocalPoint = function(target) {
        // var target = target || new THREE.Vector3(0,0,0);

        // this.scene.camera.lookAt(target);
    };

    return new Scene();
});
