define(
[
  'Models/Moon',
  'Modules/ColorManager'
],
function(Moon, ColorManager) {
  'use strict';

  class TravelController {
    constructor(scene) {
      this.scene = scene;
      this.camera = this.scene.camera;
      this.travelObjectType = 'planet'; // default
      this.travelStartEvent = new CustomEvent('solarsystem.travel.start');
      this.targetPosition = new THREE.Vector3();
      this.colorManager = new ColorManager();
    }

    /**
     * @param  {Number} radius              [The target object's orbit amplitude (distance from parent)]
     * @param  {Number} theta               [The day of the year in the form of radians]
     * @param  {Number} distanceFromParent  []
     * @return {Object}
     */
    calculateDestinationCoordinates_(radius, theta, distanceFromParent) {
      // var d = distanceFromParent + (distanceFromParent / 2);
      var r = radius;
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);

      return {
        x: x,
        y: y,
        z: 0
      };
    }

    calculateDestinationCoordinates(targetObject) {
      var x = targetObject.core.position.x;
      var y = targetObject.core.position.y;
      var z = targetObject.core.position.z;

      var destinationX = x;
      var destinationY = y;
      var destinationZ = z;

      var quadrant1 = x > 0 && y > 0;
      var quadrant2 = x < 0 && y > 0;
      var quadrant3 = x < 0 && y < 0;
      var quadrant4 = x > 0 && y < 0;

      var offset = targetObject.threeDiameter > 3 ? targetObject.threeDiameter * 6 : targetObject.threeDiameter * 3;

      if (quadrant1) {
        destinationX = destinationX + offset;
        destinationY = destinationY + offset;
      }

      if (quadrant2) {
        destinationX = destinationX - offset;
        destinationY = destinationY + offset;
      }

      if (quadrant3) {
        destinationX = destinationX - offset;
        destinationY = destinationY - offset;
      }

      if (quadrant4) {
        destinationX = destinationX + offset;
        destinationY = destinationY - offset;
      }

      return {
        x: destinationX,
        y: destinationY,
        z: destinationZ + (targetObject.threeDiameter * 0.15)
      };
    }

    dispatchTravelStartEvent(data) {
      var event = new CustomEvent('solarsystem.travel.'+ this.travelObjectType +'.start', {
        detail: data
      });

      document.dispatchEvent(event);
    }

    dispatchTravelCompleteEvent(data) {
      var event = new CustomEvent('solarsystem.travel.'+ this.travelObjectType +'.complete', {
        detail: data
      });

      document.dispatchEvent(event);
    }

    prepareForTravel(takeOffHeight, targetObject) {
      var travelDuration = 3000; // 3000;

      return new TWEEN.Tween(this.camera.position)
        .to({
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z + takeOffHeight + 700
        }, travelDuration)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate((currentAnimationPosition)=> {
            this.camera.lookAt(targetObject.threeObject.position);
        })
      ;
    }

    travelToObject(currentPosition, targetObject, takeOffHeight) {
      var travelDuration = 5000; // 5000; // milliseconds

      this.travelObjectType = targetObject instanceof Moon ? 'moon' : 'planet';
      this.dispatchTravelStartEvent(targetObject);

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);

      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      this.camera.lookAt(targetObject.threeObject.position);

      var destinationCoordinates = this.calculateDestinationCoordinates(targetObject);
      var takeOff = this.prepareForTravel(takeOffHeight, targetObject);

      var cameraTarget = targetObject instanceof Moon ? targetObject.core : targetObject.objectCentroid;

      return takeOff.start().onComplete(()=> {
        var cameraTween = new TWEEN.Tween(this.camera.position)
          .to(destinationCoordinates, travelDuration)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate(function(currentAnimationPosition) {
            var destinationCoordinates = this.calculateDestinationCoordinates(targetObject);

            cameraTween.to(destinationCoordinates);

            this.camera.lookAt(targetObject.threeObject.position);

            if (targetObject.highlight.geometry.boundingSphere.radius > targetObject.threeDiameter / 1.25) {
              this.updateTargetHighlight(targetObject);
            }
          }.bind(this))
          .onComplete(this.handleComplete.bind(this, targetObject, cameraTarget))
          .start()
        ;
      });
    }

    handleComplete(targetObject, cameraTarget) {
      cameraTarget = cameraTarget || targetObject.objectCentroid;

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, cameraTarget);

      var transition = this.colorManager.fadeTo(
        targetObject.highlight,
        targetObject.highlight.material.color,
        { r: 59, b: 234, b: 247 },
        3000
      ).onComplete(()=> {
        targetObject.core.remove(targetObject.highlight);
      });

      this.camera.lookAt(new THREE.Vector3());

      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      this.dispatchTravelCompleteEvent(targetObject);
    }

    /**
     * Updates the target's highlight geometry based on the camera's
     * distance from the target.
     *
     * @param {Object} target
     */
    updateTargetHighlight(target) {
      target.core.remove(target.highlight);

      var distanceTo = this.camera.position.distanceTo(target.threeObject.position);
      var highlightDiameter = distanceTo * 0.011; // 1.1% of distance to target

      target.highlight = highlightDiameter;
      target.highlight.material.opacity = 0.9;
    }
  }

  return TravelController;
});
