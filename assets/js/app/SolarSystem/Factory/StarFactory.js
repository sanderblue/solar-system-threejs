define(
    [
        'Scene',
        'SolarSystem',
        'RandomNumber'
    ],
    function(Scene, SolarSystem, RandomNumber) {

        /**
         * StarFactory
         *
         * Builds the distance stars in space. The number of stars to be rendered is set in the SolarSystem object.
         *
         * Note: This is currently not being used due to performance issues. I will be optimizing this in hopes of creating
         *       a true 3d array of stars.
         */
        var StarFactory = {
            buildStarsAsParticleSystem: function() {
                var particles = 500000;

                var geometry = new THREE.BufferGeometry();

                var positions = new Float32Array( particles * 2 );
                var colors = new Float32Array( particles * 2 );

                var color = new THREE.Color();

                var n = 100000, n2 = n / 2; // particles spread in the cube

                for ( var i = 0; i < positions.length; i += 3 ) {

                    // positions

                    var x = 2000 * (Math.random() * n - n2);
                    var y = 2000 * (Math.random() * n - n2);
                    var z = 2000 * (Math.random() * n - n2);

                    positions[ i ]     = x;
                    positions[ i + 1 ] = y;
                    positions[ i + 2 ] = z;

                    // colors
                    color.setRGB( 255, 255, 255 );

                    colors[ i ]     = color.r;
                    colors[ i + 1 ] = color.g;
                    colors[ i + 2 ] = color.b;

                }

                console.log('geometry', THREE, geometry);
                // return;

                geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
                geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

                geometry.computeBoundingSphere();

                //

                var material = new THREE.PointCloudMaterial( { size: 15, vertexColors: THREE.VertexColors } );

                particleSystem = new THREE.PointCloud( geometry, material );

                Scene.scene.add( particleSystem );
            },

            buildStarsAsImageTexture: function() {
                var texturePath = '/textures/earth_night.jpg';

                var texture = new THREE.ImageUtils.loadTexture(texturePath);

                var planetMaterial = new THREE.MeshPhongMaterial({
                                            map: texture,
                                            side: THREE.DoubleSide,
                                            emissive: new THREE.Color('rgb(255,255,255)')
                                        });

                var stars = new THREE.Mesh(
                            new THREE.SphereGeometry(
                                    500,
                                    200,
                                    120
                                ),
                                planetMaterial
                             );

                stars.position.set(0, 0, 0);

                Scene.scene.add(stars);
            },

            getPosition: function(i) {
                var sceneRadius = (4503443661 * (1 * Math.pow(10, -4))) + 10000,
                    isSecond    = i % 2 == 0,
                    isThird     = i % 3 == 0,
                    isFourth    = i % 4 == 0,
                    x           = 0,
                    y           = 0,
                    z           = 0
                ;

                return RandomNumber.getRandomPointInSphere(sceneRadius, x, y, z);
            },

            buildStar: function(i) {
                return $.Deferred(function(promise) {
                    var material = new THREE.MeshLambertMaterial({
                                          ambient: 0xffffff,
                                          emissive: 0xffffff,
                                          // transparent: true,
                                          // opacity: 1
                                        });

                    var geometry  = new THREE.SphereGeometry(250, 3, 2);
                    var Star      = new THREE.Mesh(geometry, material);

                    var randomizedPosition = StarFactory.getPosition(i);

                    console.log(randomizedPosition);

                    Star.position.set(
                        randomizedPosition.x,
                        randomizedPosition.y,
                        randomizedPosition.z
                    );

                    Scene.scene.add(Star);

                    promise.resolve();
                });
            },

            build: function() {
                var promises = [];

                return $.Deferred(function(promise) {
                    for (var i = 0; i < SolarSystem.stars.count; i++) {
                        promises.push(StarFactory.buildStar(i));
                    }

                    return $.when.apply($, promises).done();
                });
            }
        };

        return StarFactory;
    }
);
