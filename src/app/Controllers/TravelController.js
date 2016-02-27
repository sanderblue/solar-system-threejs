define(function() {
    'use strict';

    class TravelController {
        constructor(scene) {
            this.scene = scene;
            this.camera = scene.camera;
            this.travelStartEvent = new CustomEvent('travelStart');
            this.travelCompleteEvent = new CustomEvent('travelComplete');
            this.travelToObject = this.travelToObject;
        }

        travelToObject(currentPosition, targetObject) {
            document.dispatchEvent(this.travelStartEvent);

            console.debug('targetObject', targetObject);

            var targetPosition = targetObject.threeObject.position;
            var travelDuration = 5000; // milliseconds

            console.debug('currentPosition', currentPosition);
            // console.debug('targetPosition', targetPosition);
            // console.debug('targetObject', targetObject);

            targetObject.orbitCentroid.add(this.camera);

            this.camera.position.x = currentPosition.x;
            this.camera.position.y = currentPosition.y;
            this.camera.position.z = currentPosition.z;

            var self =this;

            var point = {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z
            };

            var cameraTween = new TWEEN.Tween(this.camera.position)
                .to(point, travelDuration)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(function(currentAnimationPosition) {
                    // console.debug('Camera Position: ', this);
                    // console.debug('Target Position: ', targetObject.threeObject.position);

                    // Follow the target for a smooth transition from "flight" to "orbit".
                    this.y = targetObject.threeObject.position.y;
                    self.camera.lookAt(targetObject.threeObject.position);


                })
                .onComplete(function() {
                    console.debug('targetObject.threeDiameter ', targetObject.threeDiameter );

                    // self.camera.up.set(0, 1, 0);
                    self.camera.lookAt(new THREE.Vector3());
                    var cameraDistanceFromTarget = targetObject.threeDiameter + 1.2 + (targetObject.threeDiameter / 2);

                    console.debug('Target Object', targetObject);

                    console.debug('cameraDistanceFromTarget', cameraDistanceFromTarget);

                    targetObject.core.add(self.camera);
                    self.camera.lookAt(new THREE.Vector3());

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
