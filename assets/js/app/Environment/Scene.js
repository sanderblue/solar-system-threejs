define(['Camera'], function(Camera) {

    window.focalPoint = Camera.defaultFocalPoint;

    /**
     * Scene
     *
     * The universal scene object contains the Threejs scene and is responsible for building
     * the entire viewable UI with exception of the accordian.
     */
    var Scene = {
        Sun: null,
        planets: [],
        planetCores: [],
        moons: [],
        astroids: [],
        tilt: 200,
        scene: null,
        camera: null,
        brightness: 0.3,
        currentRadian: 0.0174532925 * 360,
        perspective: Camera.perspective,

        setContainer: function() {
            Scene.container = document.getElementById('solar-system');
        },

        setScene: function() {
            Scene.scene = new THREE.Scene();
        },

        setAxisHelpers: function() {
            Scene.scene.add(new THREE.AxisHelper(3000));
            Scene.scene.add(new THREE.GridHelper(4000, 400));
        },

        setLights: function() {
            var directionalLightFromTop    = new THREE.DirectionalLight(0xffffff, Scene.brightness),
                directionalLightFromBottom = new THREE.DirectionalLight(0xffffff, Scene.brightness)
            ;

            directionalLightFromTop.position.set(0, 1600, 0);
            directionalLightFromBottom.position.set(0, -1600, 0);

            Scene.scene.add(directionalLightFromTop);
            Scene.scene.add(directionalLightFromBottom);
        },

        setCamera: function() {
            Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, Camera.perspective.near, Camera.perspective.far);
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

        /**
         * Sets the scene's camera position. This method can also reset the camera to its original starting position.
         *
         * @param object3d       [THREE Object]
         * @param parentObject3D [THREE Object]
         * @param vector3        [THREE object]
         * @param reset          [boolean]
         */
        setCameraPosition: function(object3D, parentObject3D, vector3, reset, zAxisUp) {
            if (object3D && parentObject3D) {
                Scene.camera.position.x = parentObject3D.geometry.radius * 6; // zoom
                Scene.camera.position.y = parentObject3D.geometry.radius * 1;
                Scene.camera.position.z = 2.3;

                object3D.add(Scene.camera);

                return;
            }

            if (reset) {
                Scene.scene.add(Scene.camera);
            }

            if (zAxisUp) {
                Scene.camera.up.set(0, 0, 1);
            }

            if (!zAxisUp) {
                Scene.camera.up.set(0, 1, 0);
            }

            Scene.camera.position.y = vector3.y;
            Scene.camera.position.x = vector3.x;
            Scene.camera.position.z = vector3.z;
        },

        /**
         * Sets the scene's camera focal point.
         *
         * @param target [THREE Object]
         */
        setCameraFocalPoint: function(target) {
            var focalPoint = target;

            Scene.camera.focalPoint = focalPoint;
            Scene.camera.lookAt(focalPoint);
        },

        init: function() {
            return $.Deferred(function(promise) {
                if (!App.config.build.SceneEnabled) {
                    return promise.resolve();
                }

                Scene.setContainer();
                Scene.setScene();
                Scene.setLights();
                Scene.setCamera();
                Scene.setRender();

                // Scene.setCameraControls();
                // Scene.setAxisHelpers();
                // Scene.setStats();

                $.when(
                    Scene.setCameraPosition(null, null, Camera.defaultPosition, false)
                ).done(function() {
                    Scene.setCameraFocalPoint(Camera.defaultFocalPoint);
                });

                promise.resolve();
            });
        }
    };

    return Scene;
});
