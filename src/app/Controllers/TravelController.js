define(function() {
    'use strict';

    class TravelController {
        constructor(scene) {
            this.scene = scene;
            this.camera = scene.camera;
            this.travelStartEvent = new CustomEvent('travelStart');
            this.travelCompleteEvent = new CustomEvent('travelComplete');
            this.targetPosition = new THREE.Vector3();
        }

        travelToObject(currentPosition, targetObject) {
            document.dispatchEvent(this.travelStartEvent);

            var targetPosition = targetObject.threeObject.position;
            var travelDuration = 5000; // milliseconds

            targetObject.orbitCentroid.add(this.camera);

            this.camera.position.x = currentPosition.x;
            this.camera.position.y = currentPosition.y;
            this.camera.position.z = currentPosition.z;

            var self = this;
            var endPoint = this.calculateTravelToPoint(targetObject);

            function getPoint(targetObject) {
                var targetPosition = targetObject.threeObject.position;
                var posX = 0;
                var posY = 0;
                var posZ = 0;

                if (targetPosition.x > 0) {
                    posX = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);
                    posX = posX + targetPosition.x;
                }

                if (targetPosition.x < 0) {
                    posX = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);
                    posX = posX - targetPosition.x;
                }

                if (targetPosition.y > 0) {
                    // posY = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 2);
                    posY = targetPosition.y;
                }

                if (targetPosition.y < 0) {

                }

                return {
                    x: posX,
                    y: posY,
                    z: 0
                };
            }

            var point = getPoint(targetObject);
            var cameraTween = new TWEEN.Tween(this.camera.position)
                .to(point, travelDuration)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(function(currentAnimationPosition) {
                    // Follow the target for a smooth transition from "flight" to "orbit".
                    this.y = targetObject.threeObject.position.y;
                    self.camera.lookAt(targetObject.threeObject.position);
                    this.targetPosition = targetObject.threeObject.position;
                })
                .onComplete(this.handleComplete.bind(this, targetObject))
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

            console.debug('Camera Position:', this.camera.position);
            console.debug('Target Position:', targetObject.threeObject.position);
            console.debug('End Point: ', endPoint);

            this.camera.position.x = endPoint.x; // newPosX; // zoom
            this.camera.position.y = endPoint.y; // newPosY; // vertical positioning of the camera
            this.camera.position.z = endPoint.z; // 0;       // this is really the y-axis in terms of plan view

            targetObject.core.add(this.camera);

            console.debug(
              'Distance To Target',
              this.camera.position.distanceTo(targetObject.threeObject.position)
            );

            document.dispatchEvent(this.travelCompleteEvent);
        }
    }

    return TravelController;
})
