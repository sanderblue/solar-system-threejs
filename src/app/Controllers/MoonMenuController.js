define(
[
    'jquery',
    'underscore',
    'backbone',
    'Modules/TemplateLoader'
],
function($, _, Backbone, TemplateLoader) {

  return Backbone.View.extend({
    events: {
      'mouseenter a[data-id]': 'highlightObject',
      'mouseleave a[data-id]': 'unhighlightObject'
    },

    initialize: function(options) {
      this.scene = options.scene || null;
      this.data = options.data || {};
      this.sceneObjects = options.sceneObjects || [];
      this.currentTarget = null;
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

    highlightObject: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.currentTarget && _.isEqual(this.currentTarget.id, target.id)) {
        return;
      }

      target.orbitLine.orbit.material.color = new THREE.Color(target.orbitColor);
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightObject: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.currentTarget && _.isEqual(this.currentTarget, target)) {
        return;
      }

      target.orbitLine.orbit.material.color = new THREE.Color(target.orbitColorDefault);
      target.orbitLine.orbit.material.needsUpdate = true;
    }
  });
});
