define(
    [
        'Camera',
        'TimeController',
        'tweenjs'
    ],
    function(
        Camera,
        TimeController
    )
    {

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
            brightness: 0.2,
            currentRadian: 0.0174532925 * 200,
            perspective: Camera.perspective,

            setContainer: function() {
                Scene.container = document.getElementById('solar-system');
            },

            setScene: function() {
                Scene.scene = new THREE.Scene();
                Scene.scene.name = 'solarsystem';

                window.Scene = Scene;
            },

            setAxisHelpers: function() {
                Scene.scene.add(new THREE.AxisHelper(3000));
                Scene.scene.add(new THREE.GridHelper(4000, 400));
            },

            setLights: function() {
                var directionalLightFromTop    = new THREE.DirectionalLight(0xffffff, Scene.brightness, { target: new THREE.Vector3(0, 0, 0)}),
                    directionalLightFromBottom = new THREE.DirectionalLight(0xffffff, Scene.brightness, { target: new THREE.Vector3(0, 0, 0)})
                ;

                directionalLightFromTop.position.set(0, 0, 7500);
                directionalLightFromBottom.position.set(0, 0, -7500);

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
                    Scene.camera.up.set(0, 0, 1);

                    Scene.tweenCameraPosition(
                        Scene.camera,
                        parentObject3D,
                        object3D
                    );

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

            tweenCameraPosition: function(camera, target, centroid) {
                TimeController.stop();

                var targetObject   = target,
                    targetPosition = target.position,
                    posX           = targetPosition.x + target.geometry.radius * 6,
                    posY           = targetPosition.y,
                    posZ           = 0.4 * target.geometry.radius
                ;

                var point = {
                    x: posX,
                    y: posY,
                    z: posZ
                };

                if (camera.parent && camera.parent.name !== 'solarsystem') {
                    var globalCameraPosition = camera.parent.position;

                    Scene.scene.add(camera);

                    Scene.camera.up.set(0, 0, 1);

                    Scene.camera.position.x = globalCameraPosition.x;
                    Scene.camera.position.y = globalCameraPosition.y;
                    Scene.camera.position.z = globalCameraPosition.z;

                    Scene.prepareForTravel(
                        Scene.camera,
                        targetObject
                    )
                    .done(function() {
                        Scene.travelToPoint(
                            point,
                            Scene.camera,
                            targetObject,
                            centroid
                        );
                    });

                    return;
                }

                Scene.travelToPoint(
                    point,
                    camera,
                    targetObject,
                    centroid
                );
            },

            prepareForTravel: function(camera, targetObject) {
                return $.Deferred(function(promise) {
                    var cameraTween = new TWEEN.Tween(camera.position).to({
                            x: camera.position.x,
                            y: camera.position.y,
                            z: camera.position.z + 3500 }, 4500)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onUpdate(function() {
                            Scene.setCameraFocalPoint(targetObject.position);
                        })
                        .onComplete(function() {
                            Scene.setCameraFocalPoint(targetObject.position);

                            promise.resolve();
                        })
                        .start()
                    ;
                });
            },

            travelToPoint: function(point, camera, targetObject, centroid) {
                var cameraTween = new TWEEN.Tween(camera.position).to({
                        x: point.x,
                        y: point.y,
                        z: point.z}, 6000)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .onUpdate(function() {
                        Scene.setCameraFocalPoint(targetObject.position);
                    })
                    .onComplete(function() {
                        Scene.camera.up.set(0, 1, 0);
                        centroid.add(Scene.camera);
                        Scene.setCameraFocalPoint(Camera.defaultFocalPoint);
                        Scene.camera.up.set(0, 1, 0);

                        var newPosX = Math.abs(Scene.camera.position.x - targetObject.position.x),
                            newPosY = 0.5 * targetObject.geometry.radius
                        ;

                        Scene.camera.position.x = newPosX; // zoom
                        Scene.camera.position.y = newPosY; // vertical positioning of the camera
                        Scene.camera.position.z = 0;       // this is really the y-axis in terms of plan view

                        TimeController.start();
                    })
                    .start()
                ;
            },

            /**
             * Sets the scene's camera focal point.
             *
             * @param target [THREE Object]
             */
            setCameraFocalPoint: function(target) {
                Scene.camera.lookAt(target);
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
    }
);
