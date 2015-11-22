define(function() {
    'use strict';

    class TravelController {
        constructor(scene) {
            this.scene = scene;
            this.camera = scene.camera;
            this.travelStartEvent = new CustomEvent('travelStart');
            this.travelCompleteEvent = new CustomEvent('travelComplete');
            this.travelToPoint = this.travelToPoint;
        }

        travelToPoint(currentPosition, targetObject) {
            document.dispatchEvent(this.travelStartEvent);

            var targetPosition = targetObject.threeObject.position;
            var travelDuration = 10000; // milliseconds

            console.debug('currentPosition', currentPosition);
            console.debug('targetPosition', targetPosition);
            // console.debug('targetObject', targetObject);

            targetObject.orbitCentroid.add(this.camera);

            this.camera.position.x = currentPosition.x;
            this.camera.position.y = currentPosition.y;
            this.camera.position.z = currentPosition.z;

            var self =this;

            var cameraDistanceFromTarget = targetObject.threeDiameter * 2.5;

            console.debug('cameraDistanceFromTarget', cameraDistanceFromTarget);

            var point = {
                x: targetPosition.x + cameraDistanceFromTarget,
                y: targetPosition.y,
                z: targetPosition.z
            };

            var cameraTween = new TWEEN.Tween(this.camera.position)
                .to(point, travelDuration)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(function() {
                    self.camera.lookAt(targetPosition);
                })
                .onComplete(function() {
                    // self.camera.up.set(0, 1, 0);
                    self.camera.lookAt(new THREE.Vector3());

                    targetObject.core.add(self.camera);

                    self.camera.position.x = cameraDistanceFromTarget; // newPosX; // zoom
                    self.camera.position.y = 0; // newPosY; // vertical positioning of the camera
                    self.camera.position.z = 0; // 0;       // this is really the y-axis in terms of plan view

                    console.debug(
                      'Distance To Target',
                      self.camera.position.distanceTo(targetObject.threeObject.position)
                    );

                    document.dispatchEvent(self.travelCompleteEvent);
                })
                .start()
            ;
        }
    }

    return TravelController;
})
