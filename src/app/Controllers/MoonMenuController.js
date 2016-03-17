define(
[
    'jquery',
    'underscore',
    'backbone',
    'Modules/TemplateLoader',
    'Controllers/TravelController',
],
function($, _, Backbone, TemplateLoader, TravelController) {

  return Backbone.View.extend({
    events: {
      'mouseenter a[data-id]': 'onMouseEnter',
      'mouseleave a[data-id]': 'onMouseLeave',
      'click a[data-id]': 'onClick'
    },

    initialize: function(options) {
      this.scene = options.scene || null;
      this.data = options.data || {};
      this.sceneObjects = options.sceneObjects || [];
      this.currentTarget = null;
      this.travelController = new TravelController(this.scene);
    },

    onClick: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      console.debug('Target', target);

      if (this.isCurrentTarget(target)) {
        e.stopImmediatePropagation();
        return false;
      }

      this.travelToObject(target);
    },

    onMouseEnter: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.isCurrentTarget(target)) {
        return true;
      }

      this.highlightTarget(target);
    },

    onMouseLeave: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.isCurrentTarget(target)) {
        return true;
      }

      this.unhighlightTarget(target);
    },

    isCurrentTarget: function(target) {
      return this.currentTarget && _.isEqual(this.currentTarget.id, target.id);
    },

    highlightObject: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      this.highlightTarget(target);
      this.highlightOrbit(target);
    },

    unhighlightObject: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      this.unhighlightTarget(target);
      this.unhighlightOrbit(target);
    },

    highlightTarget: function(target) {
      var distanceTo = this.scene.camera.position.distanceTo(target.threeObject.position);
      var highlightDiameter = distanceTo * 0.011; // 1.1% of distance to target

      target.highlight = highlightDiameter;
      target.highlight.material.opacity = 0.9;

      // console.debug('');
      // console.debug('Distance To:       ', distanceTo);
      // console.debug('Target Diameter:   ', target.threeDiameter);
    },

    highlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color('#ffffff');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightTarget: function(target) {
      target.core.remove(target.highlight);
    },

    unhighlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    travelToObject: function(target) {
      console.debug('Target', target);

      // Return old target to default orbit line color
      if (this.currentTarget) {
        this.currentTarget.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      }

      // Change new target orbit line color
      target.orbitLine.orbit.material.color = new THREE.Color('#aaaaaa');
      target.orbitLine.orbit.material.needsUpdate = true;

      this.currentTarget = target;
      this.travelController.travelToObject(this.scene.camera.parent.position, this.currentTarget);
    },

    matchTarget: function(id) {
      var target = null;

      for (var i = 0; i < this.sceneObjects.length; i++) {
        if (this.sceneObjects[i].id == id) {
          return this.sceneObjects[i];
        }
      }

      return target;
    },

  });
});
