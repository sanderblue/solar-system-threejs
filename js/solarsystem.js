if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystem,
    Zoom,
    Tilt,
    Scene,
    Scale
;

Scale = 2.25;
Zoom = 5200;
Tilt = 500;

SolarSystem = {
    Parent: {
        name: 'Sun',
        radius: 700,
        diameter: 1400,
        texture: null
    },
    Planets: [
        {
            id: 1,
            name: 'Mercury',
            radius: 2.44,
            diameter: 4.88,
            meanDistanceFromSun: 57.9 * Scale,
            earthDaysToOrbitSun: 88,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 2,
            name: 'Venus',
            radius: 6.05,
            diameter: 12.1,
            meanDistanceFromSun: 108.2 * Scale,
            earthDaysToOrbitSun: 224.7,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 3,
            name: 'Earth',
            radius: 6.35,
            diameter: 12.7,
            meanDistanceFromSun: 149.5 * Scale,
            earthDaysToOrbitSun: 364.25,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 4,
            name: 'Mars',
            radius: 3.4,
            diameter: 6.8,
            meanDistanceFromSun: 227.9 * Scale,
            earthDaysToOrbitSun: 687,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 5,
            name: 'Jupiter',
            radius: 71.5,
            diameter: 143,
            meanDistanceFromSun: 778.3 * Scale,
            earthDaysToOrbitSun: 4329,
            moons: [],
            texture: null,
            rings: []
        },
        {
            id: 6,
            name: 'Saturn',
            radius: 60,
            diameter: 120,
            meanDistanceFromSun: 1429.4 * Scale,
            earthDaysToOrbitSun: 10753,
            moons: [],
            texture: null,
            rings: [160, 180, 185, 195, 210, 220, 225, 240]
        },
        {
            id: 7,
            name: 'Uranus',
            radius: 25.6,
            diamter: 51.2,
            meanDistanceFromSun: 2871 * Scale,
            earthDaysToOrbitSun: 30714,
            moons: [],
            texture: null,
            rings: [65, 69, 72]
        },
        {
            id: 8,
            name: 'Neptune',
            radius: 24.3,
            diameter: 48.6,
            meanDistanceFromSun: 4504.3 * Scale,
            earthDaysToOrbitSun: 60025,
            moons: [],
            texture: null,
            rings: [60, 67, 71] // Neptune has 9 rings (3 major)
        }
    ],
    AstroidBelt: {
        primary: [
            {
                name: 'Ceres',
                radius: 0.475,
                earthDaysToOrbitSun: 1680,
            },
            {
                name: 'Vesta',
                radius: 0.262,
                earthDaysToOrbitSun: 1325,
            },
            {
                name: 'Pallas',
                radius: 0.225,
                earthDaysToOrbitSun: 1686
            },
            {
                name: 'Hygiea',
                radius: 0.2,
                earthDaysToOrbitSun: 2031
            },
        ],
        secondary: [],
        totalCount: 1500, // true number is estimated in the billions within the main astroid belt
        meanDistanceFromSun: 373 * Scale
    }
};

function init() {

    return $.Deferred(function(promise) {
        Scene = {
            planets: [],
            astroids: [],

            setContainer: function() {
                Scene.container = document.getElementById('solar-system');

                // document.body.appendChild(Scene.container);
            },

            setScene: function() {
                Scene.scene = new THREE.Scene();
                // Scene.scene.add(new THREE.AxisHelper(20));
            },

            setLights: function() {
                var directionalLightFromTop    = new THREE.DirectionalLight(0xffffff, 0.22),
                    directionalLightFromBottom = new THREE.DirectionalLight(0xffffff, 0.22)
                ;

                directionalLightFromTop.position.set(0, 1800, 0);
                directionalLightFromBottom.position.set(0, -1800, 0);

                Scene.scene.add(directionalLightFromTop);
                Scene.scene.add(directionalLightFromBottom);
            },

            setCamera: function() {
                Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);

                Scene.camera.position.set(0, Tilt, 0);
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

            setCameraPosition: function(target) {
                Scene.camera.focalPoint = target;
                // Scene.camera.position.x = Zoom;
                Scene.camera.position.y = Tilt;
                Scene.camera.position.z = Zoom;

                Scene.camera.lookAt(target);
            },

            init: function() {
                Scene.setContainer();
                Scene.setScene();
                Scene.setLights();
                Scene.setCamera();
                // Scene.setCameraControls();
                Scene.setRender();
                // Scene.setStats();
                // Scene.setCameraPosition(Scene.scene.position);
            }
        };

        Scene.init();

        var SunBuilder = {
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('../textures/sun_large.jpg');
            },
            build: function() {
                var texture = SunBuilder.getTexture();

                var material = new THREE.MeshLambertMaterial({
                                      ambient: 0xffffff,
                                      emissive: 0xffffff,
                                      map: texture,
                                      side: THREE.DoubleSide,
                                      transparent: true,
                                      opacity: 0.9
                                    });

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.anisotropy = 32;

                var sunGeometry = new THREE.SphereGeometry(
                                        SolarSystem.Parent.radius,
                                        SolarSystem.Parent.radius / 3.5,
                                        SolarSystem.Parent.radius / 7
                                    );

                var Sun = new THREE.Mesh(sunGeometry, material);

                var pointLight = new THREE.PointLight(0xffffff, 1.95);

                Sun.scale.x = Sun.scale.y = Sun.scale.z = 1;

                Scene.Sun = Sun;

                Sun.position.set(0, 0, 0);

                Scene.scene.add(pointLight);
                Scene.scene.add(Sun);
            }
        };

        var RingBuilder = {
            buildRing: function(amplitude) {
                return $.Deferred(function(promise) {
                    var resolution = 400, // segments in the line
                        size       = 360 / resolution;

                    var material = new THREE.LineBasicMaterial({
                                        color: 0xe6e6e6,
                                        opacity: 0.1
                                      });

                    var ringLine = new THREE.Geometry();

                    for (var i = 0; i <= resolution; i++) {
                        var segment = (i * size) * Math.PI / 180;

                        ringLine.vertices.push(
                            new THREE.Vector3(
                                Math.cos(segment) * amplitude,
                                0,
                                Math.sin(segment) * amplitude
                            )
                        );
                    }

                    var ringLine = new THREE.Line(ringLine, material);

                    var responseObject = {
                        line: ringLine
                    };

                    promise.resolve(responseObject);
                });
            },
        };

        var PlanetBuilder = {
            OrbitBuilder: {
                getPlanetRadian: function(planet) {
                    return 360 / planet.earthDaysToOrbitSun;
                },

                getOrbitAmplitute: function(distance) {
                    return Number(SolarSystem.Parent.radius + distance);
                },

                build: function(planet) {
                    var resolution = 200; // segments in the line
                    var size = 360 / resolution;

                    var material = new THREE.LineBasicMaterial({
                                            color: 0x6E6E6E,
                                            opacity: 0.1
                                        });

                    var orbitLine = new THREE.Geometry();

                    // Build the orbit line
                    for(var i = 0; i <= resolution; i++) {
                        var segment = ( i * size ) * Math.PI / 180,
                            orbitAmplitude = PlanetBuilder.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

                        orbitLine.vertices.push(
                            new THREE.Vector3(
                                Math.cos(segment) * orbitAmplitude,
                                0,
                                Math.sin(segment) * orbitAmplitude
                            )
                        );
                    }
                    var orbitLine = new THREE.Line(orbitLine, material);

                    Scene.scene.add(orbitLine);
                }
            },

            buildRings: function(thisPlanet, planet) {
                return $.Deferred(function(promise) {
                    var hasRings = Boolean(planet.rings.length);

                    if (hasRings) {
                        var amplitudes = planet.rings;

                        for (var i = 0; i < amplitudes.length; i++) {
                            $.when(RingBuilder.buildRing(amplitudes[i])).done(function(response) {
                                thisPlanet.add(response.line);
                            });
                        }

                        var promiseObject = {
                            planet: planet,
                            thisPlanet: thisPlanet
                        };

                        promise.resolve(promiseObject);

                    } else {
                        var promiseObject = {
                            planet: planet,
                            thisPlanet: thisPlanet
                        };

                        promise.resolve(promiseObject);
                    }
                });
            },

            getTexture: function(planet) {
                return new THREE.ImageUtils.loadTexture('../textures/' + planet.name.toLowerCase() + '.jpg');
            },

            addMoons: function(planet) {
                return $.Deferred(function(promise) {

                });
            },

            build: function(planet) {
                return $.Deferred(function(promise) {
                    // Create our orbit line geometry first
                    PlanetBuilder.OrbitBuilder.build(planet);

                    var thisPlanet = new THREE.Object3D({
                                        id: planet.id,
                                        name: planet.name
                                    });

                    var texture = PlanetBuilder.getTexture(planet);

                    var planetMaterial = new THREE.MeshLambertMaterial({
                                              ambient: 0xbbbbbb,
                                              map: texture,
                                              side: THREE.DoubleSide
                                            });

                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;

                    texture.anisotropy = 16;

                    thisPlanet = new THREE.Mesh(
                                new THREE.SphereGeometry(
                                        planet.diameter,
                                        200,
                                        120
                                    ),
                                    planetMaterial
                                 );

                    // Attempt at adding Saturns axis tilt
                    if (planet.name == 'Saturn') {
                        var quaternion = new THREE.Quaternion();
                        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

                        var vector = new THREE.Vector3(10, 0, 0);
                        vector.applyQuaternion(quaternion);

                        thisPlanet.add(vector);
                    }

                    thisPlanet.name = planet.name;

                    $.when(PlanetBuilder.buildRings(thisPlanet, planet)).done(function(response) {
                        PlanetBuilder.addPlanet(thisPlanet);

                        var posX = PlanetBuilder.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

                        thisPlanet.position.set(
                            posX, // x
                            0,    // y
                            0     // z
                        );

                        PlanetBuilder.addPlanet(thisPlanet);
                        Scene.planets.push(thisPlanet);

                        promise.resolve(thisPlanet);
                    });
                });
            },

            addPlanet: function(planet) {
                setTimeout(function() {
                    Scene.scene.add(planet);
                }, 100);
            }
        };

        var AstroidBelt = {
            getTexture: function() {
                return new THREE.ImageUtils.loadTexture('../textures/crust_tiny.jpg');
            },

            getRandomPointInSphere: function(radius) {
                return new THREE.Vector3(
                    ( Math.random() - 0.5 ) * 1.55 * radius,
                    ( Math.random() - 0.5 ) * 1.55* radius,
                    ( Math.random() - 0.5 ) * 1.55 * radius
                );
            },

            buildRandomPoints: function() {
                var points = [];

                for (var i = 0; i < 4; i ++) {
                    var radius = Math.random() * 2.33;
                    points.push(AstroidBelt.getRandomPointInSphere(radius));
                }

                return points;
            },

            positionAstroid: function(astroid, count) {
                var degreesToRadianRatio = 0.0174532925,
                    randomNumA = new Date().getMilliseconds() - (new Date().getMilliseconds() / 2.1),
                    randomNumB = Math.random() * randomNumA,
                    amplitude = SolarSystem.AstroidBelt.meanDistanceFromSun + randomNumB // randomize the amplitudes to spread them out
                ;

                var posX = getOrbitAmplitute(amplitude)
                            * Math.cos(count + 50 * Math.random()
                            * getAstroidRadian()
                            * degreesToRadianRatio);

                var posY = getOrbitAmplitute(amplitude)
                            * Math.sin(count + 50 * Math.random()
                            * getAstroidRadian()
                            * degreesToRadianRatio);

                astroid.position.set(
                    posX,
                    0,
                    posY
                );
            },

            buildAstroid: function(index) {
                return $.Deferred(function(promise) {
                    var randomPoints = AstroidBelt.buildRandomPoints();

                    var map = AstroidBelt.getTexture();

                    map.wrapS = map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 2;

                    var materials = [
                        new THREE.MeshLambertMaterial({ ambient: 0xbbbbbb, map: map }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 })
                    ];

                    // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
                    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), materials);

                    AstroidBelt.positionAstroid(object, index);
                    AstroidBelt.addAstroid(object);

                    Scene.astroids.push(object);

                    promise.resolve(object);
                });
            },

            buildBelt: function() {
                var astroids = SolarSystem.AstroidBelt.totalCount;

                for (var i = 0; i < astroids; i++) {
                    AstroidBelt.buildAstroid(i);
                }
            },

            addAstroid: function(astroid) {
                Scene.scene.add(astroid);
            }
        };

        var SolarSystemBuilder = {
            buildAstroidBelt: function() {
                return $.Deferred(function(promise) {
                    AstroidBelt.buildBelt();

                    promise.resolve();
                });
            },

            buildPlanets: function() {
                return $.Deferred(function(promise) {
                    var promises = new Array();

                    for (var i = 0; i < planets.length; i++) {
                        var planetBuildPromise = PlanetBuilder.build(planets[i]);

                        promises.push(planetBuildPromise);
                    }

                    promise.resolve(promises);
                });
            }
        };

        SunBuilder.build();

        Scene.camera.focalPoint = Scene.Sun.position;

        var startFor = new Date().getTime();
        var planets = SolarSystem.Planets;

        $.when(SolarSystemBuilder.buildPlanets()).done(function() {
            $.when(SolarSystemBuilder.buildAstroidBelt()).done(function() {
                TimeController.createTime();
            });
        });

        var endFor = new Date().getTime();

        console.log('Builder Done: ', endFor - startFor + ' milliseconds');

        promise.resolve(Scene);
    });

    window.addEventListener('resize', onWindowResize, false);
}

function getOrbitAmplitute(distanceFromSun) {
    return SolarSystem.Parent.radius + distanceFromSun;
};

// Gets a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
// This ratio helps create an accurate representation of each planet's location along its orbit circumference.
function getPlanetRadian(planet) {
    return 360 / planet.earthDaysToOrbitSun;
}

function getAstroidRadian() {
    return 360 / SolarSystem.AstroidBelt.primary[0].earthDaysToOrbitSun; // Using Ceres just as a reference point
}

function onWindowResize() {
    Scene.camera.aspect = window.innerWidth / window.innerHeight;
    Scene.camera.updateProjectionMatrix();

    Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    // Scene.stats.update();
}


function positionPlanets() {
    var degreesToRadianRatio = 0.0174532925,
        planets = Scene.planets,
        dayOnEarth = TimeController.dayWithTimeAsDecimal,
        count = 1
    ;

    for (var i = 0; i < planets.length; i++) {
        // Mercury
        if (i === 0) {
            count = dayOnEarth + 48;
        }

        // Venus
        if (i === 1) {
            count = dayOnEarth + 155;
        }

        // Earth
        if (i === 2) {
            count = dayOnEarth;
        }

        // Mars
        if (i === 3) {
            count = dayOnEarth + 71;
        }

        // Jupiter
        if (i === 4) {
            count = dayOnEarth + 2692;
        }

        // Saturn
        if (i === 5) {
            count = dayOnEarth + 13753;
        }

        // Uranus
        if (i === 6) {
            count = dayOnEarth + 29654;
        }

        // Neptune
        if (i === 7) {
            count = dayOnEarth + 62885;
        }

        var posX = getOrbitAmplitute(SolarSystem.Planets[i].meanDistanceFromSun)
                    * Math.cos(
                        count
                        * getPlanetRadian(SolarSystem.Planets[i])
                        * degreesToRadianRatio
                    );

        var posY = getOrbitAmplitute(SolarSystem.Planets[i].meanDistanceFromSun)
                    * Math.sin(
                        count
                        * getPlanetRadian(SolarSystem.Planets[i])
                        * degreesToRadianRatio
                    );

        Scene.planets[i].rotation.y += 0.00041;

        Scene.planets[i].position.set(
            parseFloat(posX),
            0,
            parseFloat(posY)
        );
    }

    Scene.Sun.rotation.y += 0.0003;
}

function render() {
    // var timer = Date.now() * 0.00002;
    // camera.position.x = Math.cos(timer) * Zoom;
    // camera.position.z = Math.sin(timer) * Zoom;

    // Scene.Sun.rotation.y = Math.cos(timer);

    positionPlanets();
    Scene.renderer.render(Scene.scene, Scene.camera);
    Scene.setCameraPosition(Scene.camera.focalPoint);
}

$.when(init()).done(function(scene) {
    $('#zoom').val(Zoom);
    $('#tilt').val(Tilt);

    Scene.camera.focalPoint = Scene.Sun.position;
    animate();
});
