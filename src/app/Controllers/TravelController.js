define(function() {
    'use strict';

    class TravelController {
        constructor(scene) {
          this.scene = scene;
          this.camera = this.scene.camera;
          this.travelStartEvent = new CustomEvent('travelStart');
          this.travelCompleteEvent = new CustomEvent('travelComplete');
          this.targetPosition = new THREE.Vector3();
        }

        travelToObject(currentPosition, targetObject) {
          console.debug('Target Object:', targetObject);

          var travelDuration = 5000; // milliseconds

          document.dispatchEvent(this.travelStartEvent);

          THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
          THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);

          // targetObject.orbitCentroid.updateMatrixWorld();

          targetObject.core.add(new THREE.AxisHelper(26));

          // targetObject.orbitCentroid.add(this.camera);
          this.camera.up.set(0, 0, 1);
          this.camera.lookAt(targetObject.threeObject.position);

          var takeOff = this.prepareForTravel(targetObject);

          takeOff.start().onComplete(()=> {
            console.debug('Take off complete...');

            var cameraTween = new TWEEN.Tween(this.camera.position)
              .to(targetObject.core.position, travelDuration)
              .easing(TWEEN.Easing.Cubic.InOut)
              .onUpdate(function(currentAnimationPosition) {
                  this.camera.lookAt(targetObject.threeObject.position);
              }.bind(this))
              .onComplete(this.handleComplete.bind(this, targetObject))
              .start()
            ;
          });
        }

        prepareForTravel(targetObject) {
          var self = this;

          console.debug('prepareForTravel', targetObject);
          console.debug('Camera', this.camera);

          return new TWEEN.Tween(this.camera.position)
            .to({
              x: this.camera.position.x,
              y: this.camera.position.y,
              z: this.camera.position.z + 8000
            }, 3000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function(currentAnimationPosition) {
                this.camera.lookAt(targetObject.threeObject.position);
            }.bind(this))
          ;
        }

        calculateTravelToPoint(targetObject) {
            var posX = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);

            return {
                x: posX,
                y: 0,
                z: 0
            };
        }

        handleComplete(targetObject) {
            // this.camera.lookAt(new THREE.Vector3());
            var cameraDistanceFromTarget = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);
            var endPoint = this.calculateTravelToPoint(targetObject);

            // console.debug('Camera Position:', this.camera.position);
            // console.debug('Target Position:', targetObject.threeObject.position);
            console.debug('targetObject.core.position: ', targetObject.core.position);

            targetObject.core.add(this.camera);

            this.camera.position.x = endPoint.x; // newPosX; // zoom
            this.camera.position.y = endPoint.y; // newPosY; // vertical positioning of the camera
            this.camera.position.z = endPoint.z; // 0;       // this is really the y-axis in terms of plan view

            targetObject.orbitCentroid.updateMatrixWorld();
            this.camera.lookAt(new THREE.Vector3());

            console.debug('this.camera.position: ', this.camera.position);

            // console.debug(
            //   'Distance To Target',
            //   this.camera.position.distanceTo(targetObject.threeObject.position)
            // );

            document.dispatchEvent(this.travelCompleteEvent);
            document.dispatchEvent(new CustomEvent('solarsystem.travel.complete', {
                detail: {
                    object: targetObject
                }
            }));
        }
    }

    return TravelController;
})
