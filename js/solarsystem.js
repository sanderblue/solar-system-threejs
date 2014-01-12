if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystemConstants
  , Zoom;


  Zoom = 2500;
  
  SolarSystemConstants = {
    Sun: {
      radius: 700,
      diameter: 1400
    },
    Mercury: {
      radius: 2.45,
      diameter: 4.9,
      meanDistanctFromSun: 57.9,
      earthDaysToOrbitSun: 88,
      moons: {}
    },
    Venus: {
      radius: 6.05,
      diameter: 12.1,
      meanDistanctFromSun: 108.2,
      earthDaysToOrbitSun: 224.7,
      moons: {}
    },
    Earth: {
      radius: 6.35,
      diameter: 12.7,
      meanDistanctFromSun: 149.5,
      earthDaysToOrbitSun: 364.25,
      moons: {}
    },
    Mars: {
      radius: 3.4,
      diameter: 6.8,
      meanDistanctFromSun: 227.9,
      earthDaysToOrbitSun: 687,
      moons: {}
    },
    Jupiter: {
      radius: 71.5,
      diameter: 143,
      meanDistanctFromSun: 778.3,
      earthDaysToOrbitSun: 4329,
      moons: {}
    },
    Saturn: {
      radius: 60,
      diameter: 120,
      meanDistanctFromSun: 1429.4,
      earthDaysToOrbitSun: 10753,
      moons: {}
    },
    Uranus: {
      diamter: 5.12,
      meanDistanceFromSun: 287.09,
    },
    Neptune: {
      diameter: 4.86,
      meanDistanctFromSun: 450.43,
      moons: {}
    }
  };

var container
  , stats
  , camera
  , scene
  , renderer
  , ambientLight
  , sunLight
  , Sun
  , Mercury
  , Venus
  , Jupiter
  , Saturn
  , Uranus
  , Neptune;  

var getOrbitAmplitute = function(distanceFromSun) {
  var orbitAmplitude = (SolarSystemConstants.Sun.radius + distanceFromSun);
  return orbitAmplitude;
};

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(1000, 500)

  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(20));

  // Ambient Light
  ambientLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(0, 1, 0);

  // Sun Light
  sunLight = new THREE.AmbientLight(0xffffff);
  sunLight.position.set(0, 0, 0);

  var sunTexture     = THREE.ImageUtils.loadTexture('../textures/lava.jpg')
    , mercuryTexture = THREE.ImageUtils.loadTexture('../textures/mercury.jpg')
    , venusTexture   = THREE.ImageUtils.loadTexture('../textures/venus.jpg')
    , earthTexture   = THREE.ImageUtils.loadTexture('../textures/earth.jpg')
    , marsTexture    = THREE.ImageUtils.loadTexture('../textures/mars.jpg')
    , jupiterTexture = THREE.ImageUtils.loadTexture('../textures/jupiter.jpg')
    , saturnTexture  = THREE.ImageUtils.loadTexture('../textures/saturn.jpg')
    , uranusTexture  = THREE.ImageUtils.loadTexture('../textures/uranus.jpg')
    , neptuneTexture = THREE.ImageUtils.loadTexture('../textures/neptune.jpg');
  

  var sunMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: sunTexture, 
                        side: THREE.DoubleSide,
                        transparent: true, 
                        opacity: 0.8
                      });

  sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;
  sunTexture.anisotropy = 16;


  var mercuryMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: mercuryTexture, 
                        side: THREE.DoubleSide
                      });

  mercuryTexture.wrapS = mercuryTexture.wrapT = THREE.RepeatWrapping;
  mercuryTexture.anisotropy = 16;


  var venusMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: venusTexture, 
                        side: THREE.DoubleSide
                      });

  venusTexture.wrapS = venusTexture.wrapT = THREE.RepeatWrapping;
  venusTexture.anisotropy = 16;


  var earthMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: earthTexture, 
                        side: THREE.DoubleSide
                      });

  earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
  earthTexture.anisotropy = 16;


  var marsMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: marsTexture, 
                        side: THREE.DoubleSide
                      });

  marsTexture.wrapS = marsTexture.wrapT = THREE.RepeatWrapping;
  marsTexture.anisotropy = 16;


  var jupiterMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: jupiterTexture, 
                        side: THREE.DoubleSide
                      });

  jupiterTexture.wrapS = jupiterTexture.wrapT = THREE.RepeatWrapping;
  jupiterTexture.anisotropy = 16;


  var saturnMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: saturnTexture, 
                        side: THREE.DoubleSide
                      });

  saturnTexture.wrapS = saturnTexture.wrapT = THREE.RepeatWrapping;
  saturnTexture.anisotropy = 16;


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

  // Build Mercury geometry
  Mercury = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Mercury.diameter, 
                8, 
                6
              ), 
              mercuryMaterial
            );

  var mercuryPosition = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanctFromSun);

  Mercury.position.set(mercuryPosition, 0, 0);

  // Build Venus geometry
  Venus = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Venus.radius, 
                8, 
                6
              ), 
              venusMaterial
            );

  var venusPosition = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanctFromSun);

  Venus.position.set(venusPosition, 0, 0);

  // Build Earth geometry
  Earth = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Earth.radius, 
                13, 
                9
              ), 
              earthMaterial
            );

  var earthPosition = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanctFromSun);

  Earth.position.set(earthPosition, 0, 0);

  // Build Mars geometry
  Mars = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Mars.radius, 
                13, 
                9
              ), 
              marsMaterial
            );

  var marsPosition = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun);

  Mars.position.set(marsPosition, 0, 0);

  // Build Jupiter geometry
  Jupiter = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Jupiter.radius, 
                200, 
                120
              ), 
              jupiterMaterial
            );

  var jupiterPosition = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanctFromSun);

  Jupiter.position.set(jupiterPosition, 0, 0);

  // Build Jupiter geometry
  Saturn = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemConstants.Saturn.radius, 
                200, 
                120
              ), 
              saturnMaterial
            );

  var saturnPosition = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanctFromSun);

  Saturn.position.set(saturnPosition, 0, 0);


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
  
  // Manual build each of the orbit lines to scale
  var mercuryOrbitLine = new THREE.Geometry()
    , venusOrbitLine   = new THREE.Geometry()
    , earthOrbitLine   = new THREE.Geometry()
    , marsOrbitLine    = new THREE.Geometry()
    , jupiterOrbitLine = new THREE.Geometry()
    , saturnOrbitLine  = new THREE.Geometry()
    , saturnRing1      = new THREE.Geometry()
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


  // Mercury's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , mercuryOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanctFromSun);

    mercuryOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * mercuryOrbitAmplitude, 
        0,
        Math.sin(segment) * mercuryOrbitAmplitude 
      )
    );         
  }

  // Venus's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , venusOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanctFromSun);

    venusOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * venusOrbitAmplitude, 
        0,
        Math.sin(segment) * venusOrbitAmplitude 
      )
    );         
  }

  // Earth's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , earthOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanctFromSun);

    earthOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * earthOrbitAmplitude, 
        0,
        Math.sin(segment) * earthOrbitAmplitude 
      )
    );         
  }

  // Mars's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , marsOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun);

    marsOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * marsOrbitAmplitude, 
        0,
        Math.sin(segment) * marsOrbitAmplitude 
      )
    );         
  }

  // Jupiter's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , jupiterOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanctFromSun);

    jupiterOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * jupiterOrbitAmplitude, 
        0,
        Math.sin(segment) * jupiterOrbitAmplitude 
      )
    );         
  }

  // Saturn's orbit line
  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , saturnOrbitAmplitude = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanctFromSun);

    saturnOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * saturnOrbitAmplitude, 
        0,
        Math.sin(segment) * saturnOrbitAmplitude 
      )
    );         
  }

  // Add orbit lines to the scene
  var MercuryOrbitLine = new THREE.Line(mercuryOrbitLine, lineMaterial);
  scene.add(MercuryOrbitLine);

  var VenusOrbitLine = new THREE.Line(venusOrbitLine, lineMaterial);
  scene.add(VenusOrbitLine);

  var EarthOrbitLine = new THREE.Line(earthOrbitLine, lineMaterial);
  scene.add(EarthOrbitLine);

  var MarsOrbitLine = new THREE.Line(marsOrbitLine, lineMaterial);
  scene.add(MarsOrbitLine);

  var JupiterOrbitLine = new THREE.Line(jupiterOrbitLine, lineMaterial);
  scene.add(JupiterOrbitLine);

  var SaturnOrbitLine = new THREE.Line(saturnOrbitLine, lineMaterial);
  scene.add(SaturnOrbitLine);
  
  // Add main objects to the scene
  scene.add(new THREE.AmbientLight(0x404040));
  scene.add(ambientLight);
  scene.add(sunLight);
  scene.add(Sun);
  scene.add(Mercury);
  scene.add(Venus);
  scene.add(Earth);
  scene.add(Mars);
  scene.add(Jupiter);
  scene.add(Saturn);

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

  Jupiter.rotation.y = Math.cos(timer);

  radian = (new Date().getSeconds() * 60) / 10;

  /*
   * Animate each planet's orbit. Updates every second. 
   */
  var mercuryPosX = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Mercury) * degreesToRadianRatio);
  var mercuryPosY = getOrbitAmplitute(SolarSystemConstants.Mercury.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Mercury) * degreesToRadianRatio);
  
  Mercury.position.set(
    mercuryPosX, 
    0,
    mercuryPosY
  );


  var venusPosX = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Venus) * degreesToRadianRatio);
  var venusPosY = getOrbitAmplitute(SolarSystemConstants.Venus.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Venus) * degreesToRadianRatio);
  
  Venus.position.set(
    venusPosX, 
    0,
    venusPosY
  );


  var earthPosX = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Earth) * degreesToRadianRatio);
  var earthPosY = getOrbitAmplitute(SolarSystemConstants.Earth.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Earth) * degreesToRadianRatio);

  Earth.position.set(
    earthPosX, 
    0,
    earthPosY
  );


  var marsPosX = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Mars) * degreesToRadianRatio);
  var marsPosY = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Mars) * degreesToRadianRatio);

  Mars.position.set(
    marsPosX, 
    0,
    marsPosY
  );


  var marsPosX = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Mars) * degreesToRadianRatio);
  var marsPosY = getOrbitAmplitute(SolarSystemConstants.Mars.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Mars) * degreesToRadianRatio);

  Mars.position.set(
    marsPosX, 
    0,
    marsPosY
  );


  var jupiterPosX = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Jupiter) * degreesToRadianRatio);
  var jupiterPosY = getOrbitAmplitute(SolarSystemConstants.Jupiter.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Jupiter) * degreesToRadianRatio);

  Jupiter.position.set(
    jupiterPosX, 
    0,
    jupiterPosY
  );


  var saturnPosX = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanctFromSun) * Math.cos(radian * getPlanetRadian(SolarSystemConstants.Saturn) * degreesToRadianRatio);
  var saturnPosY = getOrbitAmplitute(SolarSystemConstants.Saturn.meanDistanctFromSun) * Math.sin(radian * getPlanetRadian(SolarSystemConstants.Saturn) * degreesToRadianRatio);

  Saturn.position.set(
    saturnPosX, 
    0,
    saturnPosY
  );

  camera.position.x = Zoom;
  camera.position.z = Zoom;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

init();
animate();