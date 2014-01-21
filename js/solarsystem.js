if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystem
  , Zoom;


Zoom = 800;

SolarSystem = {
  Parent: {
      name: 'Sun',
      radius: 700,
      diameter: 1400,
      texture: THREE.ImageUtils.loadTexture('../textures/sun.jpg')
  },
  Planets: [
    { 
      Mercury: {
        id: 1,
        name: 'Mercury',
        radius: 2.45,
        diameter: 4.9,
        meanDistanceFromSun: 57.9,
        earthDaysToOrbitSun: 88,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/mercury.jpg')
      }
    },
    {
      Venus: {
        id: 2,
        name: 'Venus',
        radius: 6.05,
        diameter: 12.1,
        meanDistanceFromSun: 108.2,
        earthDaysToOrbitSun: 224.7,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/venus.jpg')
      }
    },
    {
      Earth: {
        id: 3,
        name: 'Earth',
        radius: 6.35,
        diameter: 12.7,
        meanDistanceFromSun: 149.5,
        earthDaysToOrbitSun: 364.25,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/earth.jpg')
      }
    },
    {
      Mars: {
        id: 4,
        name: 'Mars',
        radius: 3.4,
        diameter: 6.8,
        meanDistanceFromSun: 227.9,
        earthDaysToOrbitSun: 687,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/mars.jpg')
      }
    },
    {
      Jupiter: {
        id: 5,
        name: 'Jupiter',
        radius: 71.5,
        diameter: 143,
        meanDistanceFromSun: 778.3,
        earthDaysToOrbitSun: 4329,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/jupiter.jpg')
      }
    },
    {
      Saturn: {
        id: 6,
        name: 'Saturn',
        radius: 60,
        diameter: 120,
        meanDistanceFromSun: 1429.4,
        earthDaysToOrbitSun: 10753,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/saturn.jpg')
      }
    },
    {
      Uranus: {
        id: 7,
        name: 'Uranus',
        radius: 25.6,
        diamter: 51.2,
        meanDistanceFromSun: 2871,
        earthDaysToOrbitSun: 30714,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/uranus.jpg')
      }
    },
    {
      Neptune: {
        id: 8,
        name: 'Neptune',
        radius: 24.3,
        diameter: 48.6,
        meanDistanceFromSun: 4504.3,
        earthDaysToOrbitSun: 60025,
        moons: [],
        texture: THREE.ImageUtils.loadTexture('../textures/neptune.jpg')
      }
    }
  ]
};

var Scene = {
  setScene: function() {
    Scene.scene = new THREE.Scene();

    Scene.scene.add(new THREE.AxisHelper(20));
  },
  setLights: function() {
    Scene.ambientLight = new THREE.DirectionalLight(0xffffff);
    Scene.ambientLight.position.set(0, 1, 0);

    Scene.scene.add(new THREE.AmbientLight(0x404040));
    Scene.scene.add(Scene.ambientLight);
  },

  setCamera: function() {
    Scene.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    
    Scene.camera.position.set(1000, 400);
  },

  init: function() {
    Scene.setScene();
    Scene.setLights();
    Scene.setCamera();
  }
};

Scene.init();

var SunBuilder = {
  buildSunLight: function() {
    var SunLight = new THREE.AmbientLight(0xffffff);
    SunLight.position.set(0, 0, 0);

    Scene.scene.add(SunLight);
  },

  getTexture: function() {
    return new THREE.ImageUtils.loadTexture('../textures/sun.jpg');
  },
  build: function(object) {

    var texture = SunBuilder.getTexture();

    var material = new THREE.MeshLambertMaterial({ 
                          ambient: 0xbbbbbb, 
                          map: texturetexture, 
                          side: THREE.DoubleSide,
                          transparent: true, 
                          opacity: 0.8
                        });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;

    var Sun = new THREE.Mesh(
            new THREE.SphereGeometry(
              SolarSystem.Parent.Sun.radius, 
              SolarSystem.Parent.Sun.radius / 3.75, 
              SolarSystem.Parent.Sun.radius / 7.5
            ), 
            material
          );

    Sun.position.set(0, 0, 0);
  }
};

var PlanetBuilder = {
  OrbitBuilder: {
    getOrbitAmplitute: function(distance) {
      return Number(SolarSystem.Parent.radius + distance);
    },

    build: function(planet) {
      var resolution = 200; // segments in the line
      var size = 360 / resolution;

      var material = new THREE.LineBasicMaterial({ 
                              color: 0xe6e6e6, 
                              opacity: 0.1 
                            });

      var orbitLine = new THREE.Geometry();

      // Build the orbit line
      for(var i = 0; i <= resolution; i++) {
        var segment = ( i * size ) * Math.PI / 180
          , orbitAmplitude = PlanetBuilder.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

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

  getTexture: function(planet) {
    return new THREE.ImageUtils.loadTexture('../textures/' + planet.name + '.jpg');
  },

  build: function(planet) {
    // Create our orbit line geometry first
    PlanetBuilder.OrbitBuilder.build(planet);

    var thisPlanet = new THREE.Object3D({
                    id: planet.id,
                    name: planet.name,
                    // parent: Sun
                    // position: ,
                    // rotation: ,
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

    var posX = PlanetBuilder.OrbitBuilder.getOrbitAmplitute(planet.meanDistanceFromSun);

    thisPlanet.position.set(
      posX, // x
      0,    // y
      0     // z
    );

    Scene.scene.add(thisPlanet);
  }
};

console.log(Scene);

var startFor = new Date().getTime();

for (var i = 0; i < SolarSystem.Planets.length; i++) {
  var start = new Date().getTime();

  PlanetBuilder.build(SolarSystem.Planets[i])
  
  var end = new Date().getTime();

  console.log('Planet Complete: ', end - start + ' milliseconds');
}

var endFor = new Date().getTime();

console.log('Builder Done: ', endFor - startFor + ' milliseconds');


return; 

var container
  , stats
  , renderer;

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(1000, 400)

  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(20));

  // Ambient Light
  ambientLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(0, 1, 0);

  // Sun Light
  sunLight = new THREE.AmbientLight(0xffffff);
  sunLight.position.set(0, 0, 0);
  

  var sunMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: sunTexture, 
                        side: THREE.DoubleSide,
                        transparent: true, 
                        opacity: 0.8
                      });

  sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;
  sunTexture.anisotropy = 16;



  /*
   * Manually build each planet object as a spherical mesh.
   */

  // Build Sun geometry
  Sun = new THREE.Mesh(
          new THREE.SphereGeometry(
            SolarSystemConstants.Sun.radius, 
            SolarSystemConstants.Sun.radius / 3.75, 
            SolarSystemConstants.Sun.radius / 7.5
          ), 
          sunMaterial
        );

  Sun.position.set(0, 0, 0);


  /*
   * Manualling build each planet's orbit line for visual reference.
   */

  // Create a generic line
  var resolution = 200; // segments in the line
  var size = 360 / resolution;

  var lineMaterial = new THREE.LineBasicMaterial({ 
                          color: 0xe6e6e6, 
                          opacity: 0.1 
                        });

  var saturnRingMaterial = new THREE.LineBasicMaterial({ 
                                color: 0xF7BE81, 
                                opacity: 0.5, 
                                lineWidth: 50,
                                fog: true
                              });

    // Saturn's rings also need to be built
  var saturnRing1      = new THREE.Geometry()
    , saturnRing2      = new THREE.Geometry()
    , saturnRing3      = new THREE.Geometry()
    , saturnRing4      = new THREE.Geometry()
    , saturnRing5      = new THREE.Geometry()
    , saturnRing6      = new THREE.Geometry();

  // Saturn's rings
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , ringAmplitude1 = 92
      , ringAmplitude2 = 100
      , ringAmplitude3 = 105
      , ringAmplitude4 = 110
      , ringAmplitude5 = 119
      , ringAmplitude6 = 125;

    saturnRing1.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude1, 
        0,
        Math.sin(segment) * ringAmplitude1 
      )
    );

    saturnRing2.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude2, 
        0,
        Math.sin(segment) * ringAmplitude2 
      )
    ); 

    saturnRing3.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude3, 
        0,
        Math.sin(segment) * ringAmplitude3 
      )
    ); 

    saturnRing4.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude4, 
        0,
        Math.sin(segment) * ringAmplitude4 
      )
    ); 

    saturnRing5.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude5, 
        0,
        Math.sin(segment) * ringAmplitude5 
      )
    ); 

    saturnRing6.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * ringAmplitude6, 
        0,
        Math.sin(segment) * ringAmplitude6 
      )
    );          
  }

  var SaturnRing1 = new THREE.Line(saturnRing1, saturnRingMaterial);
  Saturn.add(SaturnRing1);
  
  var SaturnRing2 = new THREE.Line(saturnRing2, saturnRingMaterial);
  Saturn.add(SaturnRing2);
  
  var SaturnRing3 = new THREE.Line(saturnRing3, saturnRingMaterial);
  Saturn.add(SaturnRing3);
  
  var SaturnRing4 = new THREE.Line(saturnRing4, saturnRingMaterial);
  Saturn.add(SaturnRing4);
  
  var SaturnRing5 = new THREE.Line(saturnRing5, saturnRingMaterial);
  Saturn.add(SaturnRing5);

  var SaturnRing6 = new THREE.Line(saturnRing6, saturnRingMaterial);
  Saturn.add(SaturnRing6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';

  container.appendChild( stats.domElement );

  window.addEventListener('resize', onWindowResize, false);
}

// Gets a planet's current radian conversion ratio based on each planet's earth days to orbit the Sun.
// This ratio helps create an accurate representation of each planet's location along it's orbit circumference.
function getPlanetRadian(planet) {
  var planetRadian = 360 / planet.earthDaysToOrbitSun;
  return planetRadian;
}

var count     = 0
  , year      = 0
  , dayOfYear = 0;

function createTime() {
  if (count !== 0 && count % 365 === 0) {
    dayOfYear = 1;
    year++;

    // console.log('Day: ', count, '\nDay of Year: ', dayOfYear, '\nYear: ', year, '\n');

    // Jupiter ~ 11 years (11.88 years)
    if (year % 11 /* make this year number a variable */ === 0) {
        console.log('\n1 full orbit for Jupiter: ', year);
    }
  } else {
    dayOfYear++;
  }

  console.log('Count: ', count, '\nDay of Year: ', dayOfYear, '\n');
}

setInterval(function() {
  createTime();

  count++;
}, 100);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );

  render();
  stats.update();
}

function render() {
  var timer = Date.now() * 0.00002
    , degreesToRadianRatio = 0.0174532925;

  // camera.position.x = Math.cos(timer) * Zoom;
  // camera.position.z = Math.sin(timer) * Zoom;

  Sun.rotation.y = Math.cos(timer);

  Jupiter.rotation.y = Math.cos(timer * 0.004);

  /*
   * Animate each planet's orbit. Updates every second. 
   */
  var mercuryPosX = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Mercury) * 0.0174532925);
  
  var mercuryPosY = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Mercury) * 0.0174532925);

  Mercury.position.set(
    mercuryPosX, 
    0,
    mercuryPosY
  );


  var venusPosX = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Venus) * 0.0174532925);
  
  var venusPosY = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Venus) * 0.0174532925);

  Venus.position.set(
    venusPosX, 
    0,
    venusPosY
  );

  var earthPosX = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Earth) * 0.0174532925);
  
  var earthPosY = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Earth) * 0.0174532925);

  Earth.position.set(
    earthPosX, 
    0,
    earthPosY
  );


  var marsPosX = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Mars) * 0.0174532925);
  
  var marsPosY = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Mars) * 0.0174532925);

  Mars.position.set(
    marsPosX, 
    0,
    marsPosY
  );


  var jupiterPosX = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Jupiter) * 0.0174532925);
  
  var jupiterPosY = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Jupiter) * 0.0174532925);

  Jupiter.position.set(
    jupiterPosX, 
    0,
    jupiterPosY
  );


  var saturnPosX = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Saturn) * 0.0174532925);
  
  var saturnPosY = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Saturn) * 0.0174532925);

  Saturn.position.set(
    saturnPosX, 
    0,
    saturnPosY
  );


  var uranusPosX = getOrbitAmplitute(SolarSystemConstants.Uranus.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Uranus) * 0.0174532925);
  
  var uranusPosY = getOrbitAmplitute(SolarSystemConstants.Uranus.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Uranus) * 0.0174532925);

  Uranus.position.set(
    uranusPosX, 
    0,
    uranusPosY
  );


  var neptunePosX = getOrbitAmplitute(SolarSystemConstants.Neptune.meanDistanceFromSun) 
                  * Math.cos(count * getPlanetRadian(SolarSystemConstants.Neptune) * 0.0174532925);
  
  var neptunePosY = getOrbitAmplitute(SolarSystemConstants.Neptune.meanDistanceFromSun) 
                  * Math.sin(count * getPlanetRadian(SolarSystemConstants.Neptune) * 0.0174532925);

  Neptune.position.set(
    neptunePosX, 
    0,
    neptunePosY
  );

  camera.position.x = Zoom;
  camera.position.z = Zoom;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

document.body.addEventListener( 'mousewheel', mouseMove, false );
document.body.addEventListener( 'DOMMouseScroll', mouseMove, false ); // firefox

function mouseMove( e ) {      
  var d = ((typeof e.wheelDelta != "undefined") ? (-e.wheelDelta) : e.detail);
  d = 100 * ((d > 0) ? 1 : -1);

  var cPos = camera.position;
  if (isNaN(cPos.x) || isNaN(cPos.y) || isNaN(cPos.y)) {
    return;
  }

  var r    = cPos.x * cPos.x + cPos.y * cPos.y;
  var sqr  = Math.sqrt(r);
  var sqrZ = Math.sqrt(cPos.z * cPos.z + r);

  var nx = cPos.x + ((r == 0) ? 0 : (d * cPos.x / sqr));
  var ny = cPos.y + ((r == 0) ? 0 : (d * cPos.y / sqr));
  var nz = cPos.z + ((sqrZ==0) ? 0 : (d * cPos.z / sqrZ));

  if (isNaN(nx) || isNaN(ny) || isNaN(nz)) {
    return;
  }

  cPos.x = nx;
  cPos.y = ny;
  cPos.z = nz;
}

init();
animate();