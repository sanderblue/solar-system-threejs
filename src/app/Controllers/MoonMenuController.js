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
      this.data = options.data || {};
      this.moons = options.moons || [];
      this.templateLoader = new TemplateLoader();
      this.currentTarget = null;
    },

    matchTarget: function(id) {
      var target = null;

      for (var i = 0; i < this.moon.length; i++) {
        if (this.moon[i].id === id) {
          return this.moon[i];
        }
      }

      return target;
    },

    highlightObject: function(e) {
      var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

      if (this.currentTarget && _.isEqual(this.currentTarget.id, target.id)) {
        return;
      }

      target.orbitLine.orbit.material.color = new THREE.Color('#d3d3d3');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightObject: function(e) {
      var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

      if (this.currentTarget && _.isEqual(this.currentTarget, target)) {
        return;
      }

      target.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      target.orbitLine.orbit.material.needsUpdate = true;
    }
  });
});
