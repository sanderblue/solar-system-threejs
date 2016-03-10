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

            document.dispatchEvent(this.travelStartEvent);

            var currentCameraPosition = this.camera.position;
            var targetPosition = targetObject.threeObject.position;
            var travelDuration = 6000; // milliseconds

            targetObject.orbitCentroid.add(this.camera);
            this.camera.position.x = currentCameraPosition.x;
            this.camera.position.y = currentCameraPosition.y;
            this.camera.position.z = currentCameraPosition.z;

            this.camera.up.set(0, 0, 1);
            this.camera.lookAt(targetObject.threeObject.position);

            // var cameraTween = new TWEEN.Tween(this.camera.position)
            //     .to(targetObject.core.position, travelDuration)
            //     .easing(TWEEN.Easing.Cubic.InOut)
            //     .onUpdate(function(currentAnimationPosition) {
            //         // Follow the target for a smooth transition from "flight" to "orbit".
            //         // this.y = targetObject.threeObject.position.y;
            //         // this.camera.lookAt(targetObject.threeObject.position);
            //         // this.targetPosition = targetObject.threeObject.position;
            //     }.bind(this))
            //     .onComplete(this.handleComplete.bind(this, targetObject))
            //     .start()
            // ;
        }

        prepareForTravel(targetObject) {
          var self = this;

          return new TWEEN.Tween(this.camera.position)
            .to({
              x: this.camera.position.x,
              y: this.camera.position.y,
              z: this.camera.position.z + 500
            },
              liftOffDuration
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(()=> {
              this.camera.lookAt(targetObject.position);
            })
            .start()
          ;
        }

        calculateTravelToPoint(targetObject) {
            var posX = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2.5);

            return {
                x: posX,
                y: 0,
                z: 0
            };
        }

        handleComplete(targetObject) {
            this.camera.lookAt(new THREE.Vector3());
            var cameraDistanceFromTarget = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);
            var endPoint = this.calculateTravelToPoint(targetObject);

            // console.debug('Camera Position:', this.camera.position);
            // console.debug('Target Position:', targetObject.threeObject.position);
            // console.debug('End Point: ', endPoint);

            this.camera.position.x = endPoint.x; // newPosX; // zoom
            this.camera.position.y = endPoint.y; // newPosY; // vertical positioning of the camera
            this.camera.position.z = endPoint.z; // 0;       // this is really the y-axis in terms of plan view

            targetObject.core.add(this.camera);

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
