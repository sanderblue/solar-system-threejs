define(['Camera', 'Time'], function(Camera) {

    window.focalPoint = Camera.defaultFocalPoint;

    var Scene = {
        Sun: null,
        planets: [],
        planetCores: [],
        astroids: [],
        tilt: 200,
        scene: null,
        camera: null,
        brightness: 0.165,
        currentRadian: 0.0174532925 * 360,

        setContainer: function() {
            Scene.container = document.getElementById('solar-system');

            // document.body.appendChild(Scene.container);
        },

        setScene: function() {
            Scene.scene = new THREE.Scene();
        },

        setAxisHelpers: function() {
            Scene.scene.add(new THREE.AxisHelper(7000));
            // Scene.scene.add(new THREE.GridHelper(4000, 400));
        },

        setLights: function() {
            var directionalLightFromTop    = new THREE.DirectionalLight(0xffffff, Scene.brightness),
                directionalLightFromBottom = new THREE.DirectionalLight(0xffffff, Scene.brightness)
            ;

            directionalLightFromTop.position.set(0, 1500, 0);
            directionalLightFromBottom.position.set(0, -1500, 0);

            Scene.scene.add(directionalLightFromTop);
            Scene.scene.add(directionalLightFromBottom);
        },

        setCamera: function() {
            Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000000 * 10);
        },

        setCameraControls: function() {
            Scene.controls = new THREE.OrbitControls(Scene.camera);
            Scene.controls.addEventListener('change', render);
        },

        setRender: function() {
            Scene.renderer = new THREE.WebGLRenderer({ antialias: true });
            Scene.renderer.setSize(window.innerWidth, window.innerHeight);

            Scene.container.appendChild(Scene.renderer.domElement);
        },

        setStats: function() {
            // Scene.stats = new Stats();
            // Scene.stats.domElement.style.position = 'absolute';
            // Scene.stats.domElement.style.top = '0px';

            // Scene.container.appendChild(Scene.stats.domElement);
        },

        setCameraPosition: function(object3D, parentObject3D, vector3, reset) {
            if (object3D && parentObject3D) {
                Scene.camera.position.x = parentObject3D.geometry.radius * 8.3; // zoom
                Scene.camera.position.y = parentObject3D.geometry.radius * 1;
                Scene.camera.position.z = 2;

                object3D.add(Scene.camera);

                return;
            }

            if (reset) {
                Scene.scene.add(Scene.camera);
            }

            Scene.camera.position.y = vector3.y;
            Scene.camera.position.x = vector3.x;
            Scene.camera.position.z = vector3.z;
        },

        setCameraFocalPoint: function(target) {
            var focalPoint = target;

            Scene.camera.focalPoint = focalPoint;
            Scene.camera.lookAt(focalPoint);
        },

        init: function() {
            return $.Deferred(function(promise) {

                Scene.setContainer();
                Scene.setScene();
                // Scene.setAxisHelpers();
                Scene.setLights();
                Scene.setCamera();
                // Scene.setCameraControls();
                Scene.setRender();
                // Scene.setStats();

                $.when(
                    Scene.setCameraPosition(null, null, Camera.defaultPosition, false)
                ).done(function() {
                    Scene.setCameraFocalPoint(window.focalPoint);
                });

                promise.resolve();
            });
        }
    };

    return Scene;
});
