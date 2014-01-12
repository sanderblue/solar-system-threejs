if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystemContants
  , Zoom;


  Zoom = 1700;
  
  SolarSystemContants = {
    Sun: {
      radius: 700,
      diameter: 1400,
      meanDistanctFromSun: 0,
      moons: {}
    },
    Mercury: {
      radius: 2.45,
      diameter: 4.9,
      meanDistanctFromSun: 57.9,
      moons: {}
    },
    Venus: {
      radius: 6.05,
      diameter: 12.1,
      meanDistanctFromSun: 108.2,
      moons: {}
    },
    Earth: {
      radius: 6.35,
      diameter: 12.7,
      meanDistanctFromSun: 149.5,
      moons: {}
    },
    Mars: {
      radius: 3.4,
      diameter: 6.8,
      meanDistanctFromSun: 227.9,
      moons: {}
    },
    Jupiter: {
      radius: 7.15,
      diameter: 143,
      meanDistanctFromSun: 778.3,
      moons: {}
    },
    Saturn: {
      diameter: 12.0,
      meanDistanctFromSun: 142.94,
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
  , Jupiter;  

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(1000, 500)

  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(20));

  // Ambient Light
  ambientLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(0, 1, 0);

  // Sun Light
  sunLight = new THREE.AmbientLight(0xffffff);
  sunLight.position.set(0, 0, 0);

  var getOrbitAmplitute = function(distanceFromSun) {
    var orbitAmplitude = (SolarSystemContants.Sun.radius + distanceFromSun);
    return orbitAmplitude;
  };

  var sunTexture     = THREE.ImageUtils.loadTexture('../textures/lava.jpg')
    , mercuryTexture = THREE.ImageUtils.loadTexture('../textures/w.jpg')
    , venusTexture   = THREE.ImageUtils.loadTexture('../textures/w.jpg')
    , earthTexture   = THREE.ImageUtils.loadTexture('../textures/earth.jpg')
    , marsTexture    = THREE.ImageUtils.loadTexture('../textures/mars.jpg')
    , jupiterTexture = THREE.ImageUtils.loadTexture('../textures/w.jpg');
  

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


  // Build Sun geometry
  Sun = new THREE.Mesh(
          new THREE.SphereGeometry(
            SolarSystemContants.Sun.radius, 
            SolarSystemContants.Sun.radius / 3.75, 
            SolarSystemContants.Sun.radius / 7.5
          ), 
          sunMaterial
        );

  Sun.position.set(0, 0, 0);

  // Build Mercury geometry
  Mercury = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemContants.Mercury.diameter, 
                8, 
                6
              ), 
              mercuryMaterial
            );

  var mercuryPosition = getOrbitAmplitute(SolarSystemContants.Mercury.meanDistanctFromSun);

  Mercury.position.set(mercuryPosition, 0, 0);

  // Build Venus geometry
  Venus = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemContants.Venus.radius, 
                8, 
                6
              ), 
              venusMaterial
            );

  var venusPosition = getOrbitAmplitute(SolarSystemContants.Venus.meanDistanctFromSun);

  Venus.position.set(venusPosition, 0, 0);

  // Build Earth geometry
  Earth = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemContants.Earth.radius, 
                13, 
                9
              ), 
              earthMaterial
            );

  var earthPosition = getOrbitAmplitute(SolarSystemContants.Earth.meanDistanctFromSun);

  Earth.position.set(earthPosition, 0, 0);

  // Build Earth geometry
  Mars = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemContants.Mars.radius, 
                13, 
                9
              ), 
              marsMaterial
            );

  var marsPosition = getOrbitAmplitute(SolarSystemContants.Mars.meanDistanctFromSun);

  Mars.position.set(marsPosition, 0, 0);

  // Build Earth geometry
  Jupiter = new THREE.Mesh(
              new THREE.SphereGeometry(
                SolarSystemContants.Jupiter.radius, 
                130, 
                90
              ), 
              jupiterMaterial
            );

  var jupiterPosition = getOrbitAmplitute(SolarSystemContants.Jupiter.meanDistanctFromSun);

  Jupiter.position.set(jupiterPosition, 0, 0);


  var resolution = 200;
  var size = 360 / resolution;
  var lineMaterial = new THREE.LineBasicMaterial({ color: 0xe6e6e6, opacity: 0.1 });


  var mercuryOrbitLine = new THREE.Geometry()
    , venusOrbitLine   = new THREE.Geometry()
    , earthOrbitLine   = new THREE.Geometry()
    , marsOrbitLine    = new THREE.Geometry()
    , jupiterOrbitLine = new THREE.Geometry();

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , mercuryOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Mercury.meanDistanctFromSun);

    mercuryOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * mercuryOrbitAmplitude, 
        0,
        Math.sin(segment) * mercuryOrbitAmplitude 
      )
    );         
  }

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , venusOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Venus.meanDistanctFromSun);

    venusOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * venusOrbitAmplitude, 
        0,
        Math.sin(segment) * venusOrbitAmplitude 
      )
    );         
  }

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , earthOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Earth.meanDistanctFromSun);

    earthOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * earthOrbitAmplitude, 
        0,
        Math.sin(segment) * earthOrbitAmplitude 
      )
    );         
  }

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , marsOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Mars.meanDistanctFromSun);

    marsOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * marsOrbitAmplitude, 
        0,
        Math.sin(segment) * marsOrbitAmplitude 
      )
    );         
  }

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , jupiterOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Jupiter.meanDistanctFromSun);

    jupiterOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * jupiterOrbitAmplitude, 
        0,
        Math.sin(segment) * jupiterOrbitAmplitude 
      )
    );         
  }

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
  
  // Add objects to the scene
  scene.add(new THREE.AmbientLight(0x404040));
  scene.add(ambientLight);
  scene.add(sunLight);
  scene.add(Sun);
  scene.add(Mercury);
  scene.add(Venus);
  scene.add(Earth);
  scene.add(Mars);
  scene.add(Jupiter);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';

  container.appendChild( stats.domElement );

  window.addEventListener('resize', onWindowResize, false);
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
  var timer = Date.now() * 0.00004;

  // camera.position.x = Math.cos(timer) * Zoom;
  // camera.position.z = Math.sin(timer) * Zoom;

  setTimeout(function() {
    // console.log('what')
    Sun.rotation.y = Math.cos(timer);

  }, 100);

  camera.position.x = Zoom;
  camera.position.z = Zoom;
  camera.lookAt(scene.position);

  // Sun.rotation.y -= 0.005;

  // for (var i = 0, l = scene.children.length; i < l; i++) {
  //   var Sun = scene.children[ i ];

  //   Sun.rotation.x = timer * 1.9;
  //   Sun.rotation.y = timer * 0.2;
  // }

  renderer.render(scene, camera);
}

init();
animate();