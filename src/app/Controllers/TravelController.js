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

    updateTargetHighlight(target) {
      target.core.remove(target.highlight);

      var distanceTo = this.camera.position.distanceTo(target.threeObject.position);
      var highlightDiameter = distanceTo * 0.011; // 1.1% of distance to target

      target.highlight = highlightDiameter;
      target.highlight.material.opacity = 0.9;
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

      // console.debug('targetObject.threeDiameter', targetObject.threeDiameter, targetObject.threeDiameter * 0.15);

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

    travelToObject(currentPosition, targetObject, takeOffHeight) {
      var travelDuration = 6000; // milliseconds

      this.travelObjectType = targetObject instanceof Moon ? 'moon' : 'planet';
      this.dispatchTravelStartEvent(targetObject);

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);
      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      this.camera.lookAt(targetObject.threeObject.position);
      var destinationCoordinates = this.calculateDestinationCoordinates(targetObject);
      var takeOff = this.prepareForTravel(takeOffHeight, targetObject);

      // console.debug('Destination', destinationCoordinates);
      // console.debug('targetObject.highlight.geometry', targetObject.highlight.geometry);

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
          z: this.camera.position.z + takeOffHeight + 700
        }, 3000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate((currentAnimationPosition)=> {
            this.camera.lookAt(targetObject.threeObject.position);
        })
      ;
    }

    handleComplete(targetObject) {
      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.core);

      var transition = this.colorManager.fadeOut(
        targetObject.highlight,
        targetObject.highlight.material.color,
        3000
      ).onComplete(()=> {
        targetObject.core.remove(targetObject.highlight);
      });

      this.camera.lookAt(new THREE.Vector3());

      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      this.dispatchTravelCompleteEvent(targetObject);

      // document.dispatchEvent(new CustomEvent('solarsystem.travel.complete', {
      //     detail: {
      //         object: targetObject
      //     }
      // }));
    }
  }

  return TravelController;
});
