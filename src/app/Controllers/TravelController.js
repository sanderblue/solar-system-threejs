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
      this.travelStartEvent = new CustomEvent('travelStart');
      this.travelCompleteEvent = new CustomEvent('travelComplete');
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

    travelToObject(currentPosition, targetObject, takeOffHeight) {
      var travelDuration = 6000; // milliseconds

      // console.debug('Instanceof', targetObject instanceof Moon);

      document.dispatchEvent(this.travelStartEvent);

      var isMoon = targetObject instanceof Moon;

      THREE.SceneUtils.detach(this.camera, this.camera.parent, this.scene);
      THREE.SceneUtils.attach(this.camera, this.scene, targetObject.orbitCentroid);
      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      this.camera.lookAt(targetObject.threeObject.position);

      var destinationCoordinates = this.calculateDestinationCoordinates(targetObject);

      console.debug('Destination', destinationCoordinates);
      console.debug('targetObject.highlight.geometry', targetObject.highlight.geometry);

      var self = this;
      var takeOff = this.prepareForTravel(takeOffHeight, targetObject);

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
          z: this.camera.position.z + takeOffHeight * 12
        }, 4000)
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
      );

      this.camera.lookAt(new THREE.Vector3());
      targetObject.core.updateMatrixWorld();
      targetObject.orbitCentroid.updateMatrixWorld();

      var distanceToObject = this.camera.position.distanceTo(targetObject.threeObject.position);

      // console.debug('\nDONE');
      // console.debug('Distance To Object:', distanceToObject);

      // console.debug('Target Coordinates:\n',
      //   'x:', targetObject.threeObject.position.x,
      //   '\n',
      //   'y:', targetObject.threeObject.position.y,
      //   '\n'
      // );

      // console.debug('Camera Coordinates:\n',
      //   'x:', this.camera.position.x,
      //   '\n',
      //   'y:', this.camera.position.y,
      //   '\n'
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
