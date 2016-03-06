define(
[
	'jquery',
	'underscore',
	'backbone',
	'Controllers/TravelController',
  'Controllers/MoonMenuController',
	'Modules/TemplateLoader'
],
function(
  $,
  _,
  Backbone,
  TravelController,
  MoonMenuController,
  TemplateLoader
) {
  'use strict';

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
      this.initListeners();
    },

    initListeners: function() {
      var getMoonTemplate = this.templateLoader.get('moons', 'src/app/Views/moons.twig');

      document.addEventListener('solarsystem.focalpoint.change', handleFocalPointChange.bind(this));
      document.removeEventListener('solarsystem.travel.complete', handleTravelComplete);
      document.addEventListener('solarsystem.travel.complete', handleTravelComplete.bind(this));

      function handleTravelComplete(e) {
        var planet = e.detail.object;

        getMoonTemplate.then((template)=> {
          var html = template.render({ moons: planet._moons });

          html = $('#moons').html(html);

          var accordion = new Foundation.Accordion($('#moons').find('.accordion'), {
            allowAllClosed: true
          });

          var moonMenuController = new MoonMenuController({
            el: '#moons',
            scene: this.scene,
            data: this.data,
            sceneObjects: this.sceneObjects.moons
          });
        });
      }

      function handleFocalPointChange(e) {
        var object = e.detail.object;

        getMoonTemplate.then((template)=> {
          var html = template.render({ moons: object._moons });

          html = $('#moons').html(html);

          var accordion = new Foundation.Accordion($('#moons').find('.accordion'), {
            allowAllClosed: true
          });

          var moonMenuController = new MoonMenuController({
            el: '#moons',
            scene: this.scene,
            data: this.data,
            sceneObjects: this.sceneObjects.moons
          });
        });
      }
    },

    matchTarget: function(id) {
      var target = null;

      for (var i = 0; i < this.sceneObjects.planets.length; i++) {
        if (this.sceneObjects.planets[i].id === id) {
          return this.sceneObjects.planets[i];
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
      target.orbitLine.orbit.material.color = new THREE.Color('#aaaaaa');
      target.orbitLine.orbit.material.needsUpdate = true;

      this.currentTarget = target;
      this.travelController.travelToObject(this.scene.camera.parent.position, this.currentTarget);
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
