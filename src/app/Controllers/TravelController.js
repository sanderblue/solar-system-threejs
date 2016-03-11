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
     * @param  {Number} radius              [The target object's orbit amplitude (distance from parent)]
     * @param  {Number} theta               [The day of the year in the form of radians]
     * @param  {Number} distanceFromParent  []
     * @return {Object}
     */
    calculateDestinationCoordinates(radius, theta, distanceFromParent) {
      // var d = distanceFromParent + (distanceFromParent / 2);
      var r = radius;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);


      console.debug('Radius | threeDistanceFromParent:', radius);
      console.debug('Theta:', theta);
      // console.debug('Distance:', d);
      console.debug('Coordinates:\n',
        'x:', x,
        '\n',
        'y:', y,
        '\n'
      );


      return {
        x: x,
        y: y,
        z: 0
      };
    }

    travelToObject(currentPosition, targetObject, takeOffHeight) {
      var travelDuration = 5000; // milliseconds

      document.dispatchEvent(this.travelStartEvent);

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);

      // targetObject.orbitCentroid.updateMatrixWorld();
      var destinationDistanceFromParent = targetObject.threeDiameter > 3 ? targetObject.threeDiameter * 5 : targetObject.threeDiameter * 2;
      var destinationCoordinates = this.calculateDestinationCoordinates(targetObject.threeDistanceFromParent, targetObject.theta, destinationDistanceFromParent);

      // console.log('');
      // console.debug('Target Coordinates', targetObject.threeObject.position);
      // console.debug('Destination Coordinates', destinationCoordinates);
      // console.debug('TWEEN ease:', TWEEN.Easing);

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
        .onUpdate((currentAnimationPosition)=> {
            this.camera.lookAt(targetObject.threeObject.position);
        })
      ;
    }

    handleComplete(targetObject) {
      // var endPoint = this.calculateTravelToPoint(targetObject);
      // targetObject.core.add(this.camera);
      // this.camera.position.x = endPoint.x; // newPosX; // zoom
      // this.camera.position.y = endPoint.y; // newPosY; // vertical positioning of the camera
      // this.camera.position.z = endPoint.z; // 0;       // this is really the y-axis in terms of plan view

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.core);
      targetObject.core.add(this.camera);

      this.camera.lookAt(new THREE.Vector3());
      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      var distanceToObject = this.camera.position.distanceTo(targetObject.threeObject.position);

      console.debug('Distance To Object:', distanceToObject);

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
