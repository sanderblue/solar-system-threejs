define(
[
  'Modules/Scene',
  'Environment/Constants',
  'Modules/RandomNumberGenerator',
  'Models/Asteroid'
],
function(Scene, Constants, RandomNumberGenerator, Asteroid) {
  'use strict';

  class AsteroidBeltFactory {
    constructor(scene, data) {
      this._scene = scene || null;
      this._count = data.asteroidBelt.count || 1000;
      this._distanceFromParent = data.asteroidBelt.distanceFromParent.min;
      this._distanceFromParentMin = data.asteroidBelt.distanceFromParent.min;
      this._distanceFromParentMax = data.asteroidBelt.distanceFromParent.max;
      this._texture = new THREE.TextureLoader().load('src/assets/textures/crust_tiny.jpg');
      this._randomNumberGenerator = new RandomNumberGenerator();
      this._orbitCentroid = new THREE.Object3D();
      this._orbitRadian = 360 / 1681.6;
      this._d2r = Constants.degreesToRadiansRatio;
    }

    build() {
      return new Promise((resolve, reject)=> {
        var asteroids = [];

        for (var i = 0; i < this._count; i++) {
          var asteroid = new Asteroid(i, this._texture);

          this.positionAsteroid(asteroid.threeObject, i);

          asteroids.push(asteroid);

          this._orbitCentroid.add(asteroid.orbitCentroid);
        }

        // console.debug('asteroids', asteroids);

        this._scene.add(this._orbitCentroid);

        resolve();
      });
    }

    positionAsteroid(asteroid, count) {
      function isOdd(num) {
        return num % 2;
      }

      var odd = isOdd(count);
      var d = this._distanceFromParentMax * Constants.orbitScale;

      if (odd) {
        d = this._distanceFromParentMin * Constants.orbitScale;
      }

      if (count % 5) {
        d = this._distanceFromParentMax * Constants.orbitScale;
      }

      if (count % 12) {
        d = this._distanceFromParentMin * Constants.orbitScale;
      }

      if (odd && count % 13 && !(count % 23) && count % 200) {
        d = this._distanceFromParentMax * Constants.orbitScale;
      }

      var randomNumber = this._randomNumberGenerator.getRandomNumber();
      var randomOffset = odd ? randomNumber * 40 : randomNumber * 18;

      var amplitude = odd ? d + randomOffset : d - randomOffset;
      var theta = count + 1 * Math.random() * this._orbitRadian * this._d2r;

      var posX = amplitude * Math.cos(theta);
      var posY = amplitude * Math.sin(theta);

      asteroid.position.set(
        posX,
        posY,
        0
      );
    }
  }

  return AsteroidBeltFactory;

  //   /**
  //    * AsteroidBeltFactory
  //    *
  //    * Builds the Solar System's Asteroid Belt. The number of asteroids to be rendered is set in
  //    * the SolarSystem object. Each asteroid is randomly positioned within its orbit and between
  //    * the orbits of Mars and Jupiter.
  //    */
  //   var AsteroidBeltFactory = {

  //   asteroidBelt: new THREE.Object3D({ name: 'asteroid_belt_centroid' }),

  //   /**
  //    * Gets a generic texture for an astroid.
  //    */
  //   getTexture: function() {
  //     return new THREE.TextureLoader().load('/textures/crust_tiny.jpg');
  //   },

  //   /**
  //    * Gets a random Vector3 object to create a random point
  //    *
  //    * @param radius   [float]
  //    * @return Vector3 [THREE object]
  //    */
  //   getRandomPointCoordinate: function(radius) {
  //       return new THREE.Vector3(
  //           Math.random() * radius,
  //           Math.random() * radius,
  //           Math.random() * radius
  //       );
  //   },

  //   /**
  //    * Gets an astroid's current radian value based on each astroid's earth days to orbit the Sun.
  //    * This ratio helps create an accurate representation of each astroid's location along its orbit.
  //    */
  //   getAstroidRadian: function() {
  //       return 360 / SolarSystem.asteroidBelt.primary[0].orbitDuration; // Using Ceres as a reference point
  //   },

  //   /**
  //    * Builds the random points that create a unique shape for each astroid.
  //    * Each asteroid has a max radius of ~13 units.
  //    */
  //   buildRandomPoints: function() {
  //       var points = [];

  //       for (var i = 0; i < 7; i ++) {
  //           var radius = (Math.random() * 6300) * SolarSystem.celestialScale + (i * 2);

  //           points.push(AsteroidBeltFactory.getRandomPointCoordinate(radius));
  //       }

  //       return points;
  //   },

  //   /**
  //    * Positions an astroid within its orbit. The semi-major axis of each astroid's orbit is randomized to
  //    * distribute the astroids between the Mars and Jupiter orbits.
  //    *
  //    * @param astroid [THREE object]
  //    * @param count   [integer]
  //    */
  //   positionAstroid: function(astroid, count) {
  //       var amplitude = SolarSystem.asteroidBelt.distanceFromParent + RandomNumber.getRandomNumber() * 170; // randomize the amplitudes to spread them out

  //       var posX = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
  //           * Math.cos(count + 35 * Math.random()
  //           * AsteroidBeltFactory.getAstroidRadian()
  //           * Constants.degreesToRadiansRatio)
  //       ;

  //       var posY = OrbitFactory.getOrbitAmplitute(SolarSystem.parent, amplitude)
  //           * Math.sin(count + 50 * Math.random()
  //           * AsteroidBeltFactory.getAstroidRadian()
  //           * Constants.degreesToRadiansRatio)
  //       ;

  //       astroid.position.set(
  //           posX,
  //           posY,
  //           0
  //       );
  //   },

  //   /**
  //    * Builds a uniquely shaped astroid.
  //    *
  //    * @param index [integer]
  //    */
  //   buildAstroid: function(index, addBelt) {
  //       return $.Deferred(function(promise) {
  //           var randomPoints = AsteroidBeltFactory.buildRandomPoints(),
  //               texture      = AsteroidBeltFactory.getTexture()
  //           ;

  //           texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  //           texture.anisotropy = 1;

  //           var materials = [
  //               new THREE.MeshLambertMaterial({ map: texture }),
  //               new THREE.MeshLambertMaterial({ emissive: 0x79849E, transparent: true, opacity: 0.2, wireframe: true })
  //           ];
  //           // Random convex mesh to represent an irregular, rock-like shape based on random points within a sphere where radius = n(random)
  //           var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(randomPoints), materials),
  //               centroid = new THREE.Object3D(),
  //               isOdd = index % 2,
  //               offset = isOdd ? -1 : 1
  //           ;

  //           // Create a random orbit inclination to give the Asteroid Belt some "depth"
  //           var orbitInclination = (Math.random() * RandomNumber.getRandomNumberWithinRange(1, 6) / 150) * offset;

  //           centroid.rotation.x = orbitInclination;
  //           centroid.add(object);

  //           AsteroidBeltFactory.positionAstroid(object, index);
  //           AsteroidBeltFactory.addAstroid(centroid);

  //           Scene.astroids.push(object);

  //           if (addBelt) {
  //               AsteroidBeltFactory.addAstroidBelt();
  //           }

  //           promise.resolve();
  //       });
  //   },

  //   /**
  //    * Builds the entire astroid belt based on the configured astroid count.
  //    */
  //   buildBelt: function() {
  //       for (var i = 0; i < SolarSystem.asteroidBelt.count; i++) {
  //           if (i === SolarSystem.asteroidBelt.count - 1) {
  //               AsteroidBeltFactory.buildAstroid(i, true);
  //           }

  //           AsteroidBeltFactory.buildAstroid(i, false);
  //       }
  //   },

  //   /**
  //    * Adds an astroid to the scene.
  //    *
  //    * @param astroid [THREE object]
  //    */
  //   addAstroid: function(astroid) {
  //       AsteroidBeltFactory.asteroidBelt.add(astroid);
  //   },

  //   addAstroidBelt: function() {
  //       Scene.asteroidBelt = AsteroidBeltFactory.asteroidBelt;
  //       Scene.scene.add(AsteroidBeltFactory.asteroidBelt);
  //   }
  // };

  // return AsteroidBeltFactory;
});
