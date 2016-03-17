define(
[
	'jquery',
	'underscore',
	'backbone',
	'Controllers/TravelController',
  'Controllers/MoonMenuController',
	'Modules/TemplateLoader',
  'Models/PLanet',
  'Models/Moon',
  'Modules/ColorManager'
],
function(
  $,
  _,
  Backbone,
  TravelController,
  MoonMenuController,
  TemplateLoader,
  Planet,
  Moon,
  ColorManager
) {
  'use strict';

  return Backbone.View.extend({
    events: {
      'click a[data-id]': 'onClick',
      'mouseenter a[data-id]': 'onMouseEnter',
      'mouseleave a[data-id]': 'onMouseLeave'
    },

    initialize: function(options) {
      this.scene = options.scene || null;
      this.data = options.data || {};
      this.sceneObjects = options.sceneObjects || [];
      this.travelController = new TravelController(this.scene);
      this.templateLoader = new TemplateLoader();
      this.colorManager = new ColorManager();
      this.currentTarget = options.currentTarget || this.sceneObjects[0];
      this.initListeners();
    },

    onClick: function(e) {
      var id = Number.parseInt(e.currentTarget.dataset.id);
      var target = this.matchTarget(id);

      console.debug('isCurrentTarget', this.isCurrentTarget(target));

      if (this.isCurrentTarget(target)) {
        e.stopImmediatePropagation();
        return false;
      }

      this.travelToObject(target);
    },

    onMouseEnter: function(e) {
      var id = Number.parseInt(e.currentTarget.dataset.id);
      var target = this.matchTarget(id);

      if (this.isCurrentTarget(target)) {
        return true;
      }

      var startingColor = target.highlight.material.color;

      console.debug('startingColor', startingColor);

      this.highlightTarget(target);
    },

    onMouseLeave: function(e) {
      var id = Number.parseInt(e.currentTarget.dataset.id);
      var target = this.matchTarget(id);

      if (this.isCurrentTarget(target)) {
        return true;
      }

      this.unhighlightTarget(target);
    },

    travelToObject: function(target) {
      // Return old target to default orbit line color
      if (this.currentTarget && this.currentTarget.orbitLine) {
        this.currentTarget.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      }

      // Change new target orbit line color
      target.orbitLine.orbit.material.color = new THREE.Color('#aaaaaa');
      target.orbitLine.orbit.material.needsUpdate = true;

      this.travelController.travelToObject(
        this.scene.camera.parent.position,
        target,
        target.threeDiameter * 2.5
      );

      this.currentTarget = target;
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

    isCurrentTarget: function(target) {
      return this.currentTarget && _.isEqual(this.currentTarget.id, target.id);
    },

  	highlightObject: function(e) {
		  var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

      this.highlightTarget(target);
      this.highlightOrbit(target);
    },

    unhighlightObject: function(e) {
      var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

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
      target.orbitLine.orbit.material.color = new THREE.Color('#d3d3d3');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightTarget: function(target) {
      target.core.remove(target.highlight);
    },

    unhighlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    initListeners: function() {
      var getMoonTemplate = this.templateLoader.get('moons', 'src/app/Views/moons.twig');

      document.addEventListener('solarsystem.focalpoint.change', handleFocalPointChange.bind(this));
      document.removeEventListener('solarsystem.travel.complete', handleTravelComplete);
      document.addEventListener('solarsystem.travel.complete', handleTravelComplete.bind(this));

      function handleTravelComplete(e) {
        var object = e.detail.object;

        if (object instanceof Moon) {
          return;
        }

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
  });
});
