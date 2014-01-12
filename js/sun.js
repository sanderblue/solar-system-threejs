if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

/*
  Solar System Constants @const

  Properties (10^4 km):

    Sun: {
      diameter: 140,
      meandistanctFromSun: 0
      moons: {}
    },
    Mercury: {
      diameter: 0.49,
      meandistanctFromSun: 5.79
      moons: {}
    },
    Venus: {
      diameter: 1.21,
      meandistanctFromSun: 10.82
      moons: {}
    },
    Earth: {
      diameter: 1.27,
      meandistanctFromSun: 14.95
      moons: {}
    },
    Mars: {
      diameter: 0.68,
      meandistanctFromSun: 22.79
      moons: {}
    },
    Jupiter: {
      diameter: 14.3,
      meandistanctFromSun: 77.83
      moons: {}
    },
    Saturn: {
      diameter: 12.0,
      meandistanctFromSun: 142.94
      moons: {}
    },
    Uranus: {
      diamter: 5.12,
      meanDistanceFromSun: 287.09
    },
    Neptune: {
      diameter: 4.86,
      meandistanctFromSun: 450.43
      moons: {}
    }
  
*/

var container, stats;

var camera, scene, renderer;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(5000, 200)

  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(20));

  var ambientLight, 
      sunLight,
      Sun, 
      Mercury;

  // Ambient Light
  ambientLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(0, 1, 0);

  // Sun Light
  sunLight = new THREE.AmbientLight(0xffffff);
  sunLight.position.set(0, 0, 0);

  // console.log(sunLight):

  var sunTexture = THREE.ImageUtils.loadTexture('../textures/lava.jpg');
  var mercuryTexture = THREE.ImageUtils.loadTexture('../textures/w.jpg');
  
  sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;
  sunTexture.anisotropy = 16;

  mercuryTexture.wrapS = mercuryTexture.wrapT = THREE.RepeatWrapping;
  mercuryTexture.anisotropy = 16;

  var sunMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: sunTexture, 
                        side: THREE.DoubleSide,
                        transparent: true, 
                        opacity: 0.8
                      });

  var mercuryMaterial = new THREE.MeshLambertMaterial({ 
                        ambient: 0xbbbbbb, 
                        map: mercuryTexture, 
                        side: THREE.DoubleSide
                      });

  /*
    @prop SphereGeometry(
            radius, 
            widthSegments = radius / 3.75, 
            heightSegments = radius / 7.5, 
            phiStart, 
            phiLength, 
            thetaStart, 
            thetaLength
          )
  */
  Sun = new THREE.Mesh(new THREE.SphereGeometry(140, 373, 187), sunMaterial);
  Sun.position.set(0, 0, 0);

  Mercury = new THREE.Mesh(new THREE.SphereGeometry(4.9 / 3, 8, 6), mercuryMaterial);
  Mercury.position.set(300, 0, 0);

  var resolution = 100;
  var amplitude = 300;
  var size = 360 / resolution;

  var line = new THREE.Geometry();
  var lineMaterial = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 1.0} );

  for(var i = 0; i <= resolution; i++) {
    var segment = ( i * size ) * Math.PI / 180;

    line.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * amplitude, 
        0,
        Math.sin(segment) * amplitude 
      )
    );         
  }

  var MercuryOrbitLine = new THREE.Line(line, lineMaterial);
  scene.add(MercuryOrbitLine);
  
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

  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800;

  camera.lookAt(scene.position);

  for (var i = 0, l = scene.children.length; i < l; i++) {
    var Sun = scene.children[ i ];

    // Sun.rotation.x = timer * 1.9;
    Sun.rotation.y = timer * 0.2;
  }

  renderer.render( scene, camera );
}