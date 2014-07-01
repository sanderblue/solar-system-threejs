define(function() {

    var Scene = {
        planets: [],
        astroids: [],
        tilt: 200,
        scene: null,
        camera: null,
        brightness: 1.5,
        currentRadian: 0.0174532925 * 360,
        cameraData: {
            radius: 1, // doesn't really mean anything
            diameter: 2, // doesn't really mean anything
            distanceFromParent: 2000, //
            defaultPosition: new THREE.Vector3(0, -4600, 400),
            defaultFocalPoint: new THREE.Vector3(0, 0, 0),
            orbitDuration: 364.25,
            dayOfOrbit: 1,
            parent: {
                name: 'Sun',
                radius: 700,
                diameter: 1400,
                texture: null,
                orbitDuration: 364.25,
                position: {
                    x: 0,
                    y: 0
                }
            }
        },

        OrbitBuilder: {
            getOrbitAmplitute: function() {
                return Scene.cameraData.parent.radius + Scene.cameraData.distanceFromParent;
            },

            getPlanetRadian: function() {
                return 360 / Scene.cameraData.orbitDuration;
            },

            build: function() {
                // var resolution = 270; // segments in the line
                // var size = 360 / resolution;

                // var material = new THREE.LineBasicMaterial({
                //                         color: 0x6E6E6E,
                //                         opacity: 0.1
                //                     });

                // var orbitLine = new THREE.Geometry();

                // // Build the orbit line
                // for(var i = 0; i <= resolution; i++) {
                //     var segment = ( i * size ) * Math.PI / 180,
                //         orbitAmplitude = Scene.OrbitBuilder.getOrbitAmplitute(Scene.cameraData.distanceFromParent);

                //     orbitLine.vertices.push(
                //         new THREE.Vector3(
                //             Math.cos(segment) * orbitAmplitude,
                //             Math.sin(segment) * orbitAmplitude,
                //             0
                //         )
                //     );
                // }

                // var orbitLine = new THREE.Line(orbitLine, material);

                // Scene.scene.add(orbitLine);
            }
        },

        setContainer: function() {
            Scene.container = document.getElementById('solar-system');

            // document.body.appendChild(Scene.container);
        },

        setScene: function() {
            Scene.scene = new THREE.Scene();
        },

        setAxisHelpers: function() {
            Scene.OrbitBuilder.build();

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
            Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000 * 10);
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
            Scene.stats = new Stats();
            // Scene.stats.domElement.style.position = 'absolute';
            // Scene.stats.domElement.style.top = '0px';

            // Scene.container.appendChild(Scene.stats.domElement);
        },

        setCameraPosition: function() {
            Scene.camera.position.x = Scene.cameraData.defaultPosition.x;
            Scene.camera.position.y = Scene.cameraData.defaultPosition.y;
            Scene.camera.position.z = Scene.cameraData.defaultPosition.z;

            var dayOnEarth = new Date().getDOYwithTimeAsDecimal();
            var degreesToRadianRatio = 0.0174532925;

            var posY = Scene.OrbitBuilder.getOrbitAmplitute()
                        * Math.cos(
                            dayOnEarth
                            * Scene.OrbitBuilder.getPlanetRadian()
                            * degreesToRadianRatio
                        );

            var posX = Scene.OrbitBuilder.getOrbitAmplitute()
                        * Math.sin(
                            dayOnEarth
                            * Scene.OrbitBuilder.getPlanetRadian()
                            * degreesToRadianRatio
                        );

            Scene.camera.position.x = Scene.cameraData.defaultPosition.x;
            Scene.camera.position.y = Scene.cameraData.defaultPosition.y;
            Scene.camera.position.z = Scene.cameraData.defaultPosition.z;

            if (Scene.camera.position.y > 0) {
                Scene.camera.rotation.z = Math.PI; // Flips the camera axis orientation to match our universal setup
            }

            // setTimeout(function() {
            //     console.log(Scene.camera.position, Scene.planets[5].position)
            // }, 3000);
        },

        setCameraFocalPoint: function(target) {
            var focalPoint = target ? target : Scene.cameraData.defaultFocalPoint;

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
                    Scene.setCameraPosition()
                ).done(function() {
                    Scene.setCameraFocalPoint();
                });

                promise.resolve();
            });
        }
    };

    return Scene;
});