define(
[
	'jquery',
	'underscore',
	'backbone',
	'Controllers/TravelController',
	'Modules/TemplateLoader'
],
function($, _, Backbone, TravelController, TemplateLoader) {

  return Backbone.View.extend({
    events: {
      'click a[data-id]': 'travelToObject',
      'mouseenter a[data-id]': 'highlightObject',
      'mouseleave a[data-id]': 'unhighlightObject'
    },

    initialize: function(options) {
      this.scene = options.scene || null;
      this.data = options.data || {};
      this.sceneObjects = options.sceneObjects || [];
      this.travelController = new TravelController(this.scene);
      this.templateLoader = new TemplateLoader();
      this.currentTarget = null;
    },

    matchTarget: function(id) {
      var target = null;

      for (var i = 0; i < this.sceneObjects.length; i++) {
        if (this.sceneObjects[i].id === id) {
          return this.sceneObjects[i];
      	}
      }

      return target;
    },

    travelToObject: function(e) {
      var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

      if (this.currentTarget && _.isEqual(this.currentTarget.id, target.id)) {
        return;
      }

      // Return old target to default orbit line color
      if (this.currentTarget) {
        this.currentTarget.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      }

      // Change new target orbit line color
      target.orbitLine.orbit.material.color = new THREE.Color('#8b8b8b');
      target.orbitLine.orbit.material.needsUpdate = true;

      this.currentTarget = target;

      this.travelController.travelToObject(this.scene.camera.parent.position, this.currentTarget);

      var getMoonTemplate = this.templateLoader.get('moons', 'src/app/Views/moons.twig');

      document.removeEventListener('solarsystem.travel.complete');
      document.addEventListener('solarsystem.travel.complete', function(e) {
        var planet = e.detail.object;

        getMoonTemplate.then(function(template) {
          var html = template.render({ moons: planet._moons });

          html = $('#moons').html(html);

          var accordion = new Foundation.Accordion($('#moons').find('.accordion'), {
            allowAllClosed: true
          });
        });
      }.bind(this));
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
