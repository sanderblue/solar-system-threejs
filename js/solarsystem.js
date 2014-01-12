if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

var SolarSystemContants
  , Zoom;


  Zoom = 2100;
  
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
      diameter: 0.68,
      meanDistanctFromSun: 22.79,
      moons: {}
    },
    Jupiter: {
      diameter: 14.3,
      meanDistanctFromSun: 77.83,
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
  , renderer;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(1000, 500)

  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(20));

  var ambientLight
    , sunLight
    , Sun
    , Mercury
    , Venus;  

  // Ambient Light
  ambientLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(0, 1, 0);

  // Sun Light
  sunLight = new THREE.AmbientLight(0xffffff);
  sunLight.position.set(0, 0, 0);

  var getOrbitAmplitute = function(distanceFromSun) {
    var orbitAmplitude = (SolarSystemContants.Sun.radius + distanceFromSun) * 1.2;

    console.log(orbitAmplitude);

    return orbitAmplitude;
  };

  var sunTexture     = THREE.ImageUtils.loadTexture('../textures/lava.jpg')
    , mercuryTexture = THREE.ImageUtils.loadTexture('../textures/w.jpg')
    , venusTexture   = THREE.ImageUtils.loadTexture('../textures/w.jpg')
    , earthTexture   = THREE.ImageUtils.loadTexture('../textures/earth.jpg');
  

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


  var resolution = 200;
  var size = 360 / resolution;


  var mercuryOrbitLine         = new THREE.Geometry()
    , mercuryOrbitLineMaterial = new THREE.LineBasicMaterial( { color: 0xe6e6e6, opacity: 0.1 } );

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

  var venusOrbitLine         = new THREE.Geometry()
    , venusOrbitLineMaterial = new THREE.LineBasicMaterial( { color: 0xe6e6e6, opacity: 0.1 } );

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , venusOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Venus.meanDistanctFromSun);

    mercuryOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * venusOrbitAmplitude, 
        0,
        Math.sin(segment) * venusOrbitAmplitude 
      )
    );         
  }

  var earthOrbitLine         = new THREE.Geometry()
    , earthOrbitLineMaterial = new THREE.LineBasicMaterial( { color: 0xe6e6e6, opacity: 0.1 } );

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180
      , earthOrbitAmplitude = getOrbitAmplitute(SolarSystemContants.Earth.meanDistanctFromSun);

    mercuryOrbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * earthOrbitAmplitude, 
        0,
        Math.sin(segment) * earthOrbitAmplitude 
      )
    );         
  }

  var MercuryOrbitLine = new THREE.Line(mercuryOrbitLine, mercuryOrbitLineMaterial);
  scene.add(MercuryOrbitLine);

  var VenusOrbitLine = new THREE.Line(venusOrbitLine, venusOrbitLineMaterial);
  scene.add(VenusOrbitLine);

  var EarthOrbitLine = new THREE.Line(earthOrbitLine, earthOrbitLineMaterial);
  scene.add(EarthOrbitLine);
  
  // Add objects to the scene
  scene.add(new THREE.AmbientLight(0x404040));
  scene.add(ambientLight);
  scene.add(sunLight);
  scene.add(Sun);
  scene.add(Mercury);

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
  var timer = Date.now() * 0.0001;

  camera.position.x = Math.cos(timer) * Zoom;
  camera.position.z = Math.sin(timer) * Zoom;

  camera.lookAt(scene.position);

  for (var i = 0, l = scene.children.length; i < l; i++) {
    var Sun = scene.children[ i ];

    // Sun.rotation.x = timer * 1.9;
    // Sun.rotation.y = timer * 0.2;
  }

  renderer.render( scene, camera );
}