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

    /**
     * @param  {Number} radius [The target object's orbit amplitude (distance from parent)]
     * @param  {Number} theta  [The day of the year in the form of radians]
     * @return {Object}
     */
    calculateDestinationCoordinates(radius, theta) {
      var r1 = radius + 100;
      var x1 = r1 * Math.cos(theta);
      var y1 = r1 * Math.sin(theta);

      return {
        x: x1,
        y: y1,
        z: 0
      };
    }

    travelToObject(currentPosition, targetObject, takeOffHeight) {
      var travelDuration = 4000; // milliseconds

      document.dispatchEvent(this.travelStartEvent);

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);

      // targetObject.orbitCentroid.updateMatrixWorld();

      var destinationCoordinates = this.calculateDestinationCoordinates(targetObject.threeDistanceFromParent, targetObject.theta);


      console.debug('destinationCoordinates', destinationCoordinates);

      // return;

      // targetObject.orbitCentroid.add(this.camera);
      this.camera.up.set(0, 0, 1);
      this.camera.lookAt(targetObject.threeObject.position);

      var takeOff = this.prepareForTravel(takeOffHeight, targetObject);

      takeOff.start().onComplete(()=> {
        console.debug('Take off complete...');

        var cameraTween = new TWEEN.Tween(this.camera.position)
          .to(destinationCoordinates, travelDuration)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate(function(currentAnimationPosition) {
              this.camera.lookAt(targetObject.threeObject.position);
          }.bind(this))
          .onComplete(this.handleComplete.bind(this, targetObject))
          .start()
        ;
      });
    }

    prepareForTravel(takeOffHeight, targetObject) {
      return new TWEEN.Tween(this.camera.position)
        .to({
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z + takeOffHeight
        }, 1500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(currentAnimationPosition) {
            this.camera.lookAt(targetObject.threeObject.position);
        }.bind(this))
      ;
    }

    calculateTravelToPoint(targetObject) {
      var posX = targetObject.threeDiameter + 1.5 + (targetObject.threeDiameter / 1.75);

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

      // console.debug('targetObject.core.position: ', targetObject.core.position);

      targetObject.core.add(this.camera);

      this.camera.position.x = endPoint.x; // newPosX; // zoom
      this.camera.position.y = endPoint.y; // newPosY; // vertical positioning of the camera
      this.camera.position.z = endPoint.z; // 0;       // this is really the y-axis in terms of plan view

      targetObject.orbitCentroid.updateMatrixWorld();
      this.camera.lookAt(new THREE.Vector3());

      // console.debug('this.camera.position: ', this.camera.position);

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
});
