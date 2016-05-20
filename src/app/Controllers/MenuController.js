define(
[
	'jquery',
	'underscore',
	'backbone',
	'Controllers/TravelController',
  'Controllers/MoonMenuController',
	'Modules/TemplateLoader',
  'Models/Planet',
  'Models/Moon'
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
  MoonData
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
      this.moonDataModel = null;

      this.currentTarget = options.currentTarget || this.sceneObjects[0];
      this.template = this.templateLoader.get('planets', 'src/app/Views/menu.twig').then((template)=> {
        this.template = template;
        this.render();
        this.initializePlugins();
        this.initializeListeners();

        this.moonMenuController = new MoonMenuController({
          el: $('#moons'),
          scene: this.scene,
          data: this.data,
          sceneObjects: this.sceneObjects.moons
        });
      });
    },

    initializePlugins: function() {
      this.accordion = new Foundation.Accordion(this.$('.accordion'), { allowAllClosed: true });
    },

    render: function() {
      this.$el.html(this.template.render({ planets: this.data.planets }));
    },

    onClick: function(e) {
      var id = Number.parseInt(e.currentTarget.dataset.id);
      var target = this.matchTarget(id);

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

      this.highlightObject(e);
    },

    onMouseLeave: function(e) {
      var id = Number.parseInt(e.currentTarget.dataset.id);
      var target = this.matchTarget(id);

      if (this.isCurrentTarget(target)) {
        return true;
      }

      this.unhighlightObject(e);
    },

    travelToObject: function(target) {
      // Return old target to default orbit line color
      if (this.currentTarget && this.currentTarget.orbitLine) {
        this.currentTarget.orbitLine.orbit.material.color = new THREE.Color('#2d2d2d');
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
    },

    highlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color('#214956'); // new THREE.Color('#d3d3d3');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightTarget: function(target) {
      target.core.remove(target.highlight);
    },

    unhighlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color('#2d2d2d');
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    initializeListeners: function() {
      document.addEventListener('solarsystem.travel.planet.start', this.handleTravelStart.bind(this));
      document.addEventListener('solarsystem.travel.planet.complete', this.handleTravelComplete.bind(this));
      document.addEventListener('solarsystem.focalpoint.change', this.handleTravelComplete.bind(this));
    },

    handleTravelStart: function(e) {
      $('#current-target-title').removeClass('active').html('');
    },

    handleTravelComplete: function(e) {
      var object = e.detail;

      $('#current-target-title').html(object.name).addClass('active');

      this.moonMenuController.setModel(object._moons);
    }
  });
});
