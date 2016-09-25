define(
[
    'jquery',
    'underscore',
    'backbone',
    'Modules/TemplateLoader',
    'Controllers/TravelController'
],
function($, _, Backbone, TemplateLoader, TravelController) {
  'use strict';

  const ORBIT_COLOR_DEFAULT = '#424242';
  const ORBIT_COLOR_HIGHLIGHT = '#b863f2';
  const ORBIT_COLOR_ACTIVE = '#3beaf7';

  return Backbone.View.extend({
    events: {
      'mouseenter a[data-id]': 'onMouseEnter',
      'mouseleave a[data-id]': 'onMouseLeave',
      'click a[data-id]': 'onClick'
    },

    initialize: function(options) {
      this.scene = options.scene || null;
      this.model = null;
      this.data = options.data || {};
      this.sceneObjects = options.sceneObjects || [];
      this.currentTarget = null;
      this.model = Backbone.Model.extend();
      this.model = new this.model({ data: [] });
      this.templateLoader = new TemplateLoader();
      this.travelController = new TravelController(this.scene);
      this.template = this.templateLoader.get('moons', 'src/app/Views/moons.twig').then((template)=> {
        this.template = template;
        this.render();
        this.initializePlugins();
        this.initializeListeners();
      });
      this.isTraveling = false;

      this.listenTo(this.model, 'change', this.render);
    },

    setModel: function(data) {
      if (data instanceof Array) {
        data.sort(function (objectA, objectB) {
          return objectA.distanceFromParent - objectB.distanceFromParent;
        });
      }

      this.model.set({ data: data });

      this.initializePlugins();
    },

    initializePlugins: function() {
      this.accordion = new Foundation.Accordion(this.$('.accordion'), {
        allowAllClosed: true
      });
    },

    render: function() {
      var data = this.model.get('data');

      if (data && !data.length) {
        return this;
      }

      this.$el.html(this.template.render({ moons: data }));
    },

    onClick: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.isCurrentTarget(target)) {
        e.stopImmediatePropagation();
        return false;
      }

      this.travelToObject(target);
    },

    onMouseEnter: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.isCurrentTarget(target)) {
        if (!this.isTraveling) {
          this.highlightTarget(target);
        }

        return true;
      }

      this.highlightObject(e);

      // $(e.currentTarget).trigger('click.zf.accordion');
    },

    onMouseLeave: function(e) {
      var target = this.matchTarget(e.currentTarget.dataset.id);

      if (this.isCurrentTarget(target)) {
        if (!this.isTraveling) {
          this.unhighlightTarget(target);
        }

        return true;
      }

      this.unhighlightObject(e);

      // $(e.currentTarget).trigger('click.zf.accordion');
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
    },

    highlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color(ORBIT_COLOR_HIGHLIGHT);
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    unhighlightTarget: function(target) {
      target.core.remove(target.highlight);
    },

    unhighlightOrbit: function(target) {
      target.orbitLine.orbit.material.color = new THREE.Color(ORBIT_COLOR_DEFAULT);
      target.orbitLine.orbit.material.needsUpdate = true;
    },

    travelToObject: function(target) {
      // Return old target to default orbit line color
      if (this.currentTarget) {
        this.currentTarget.orbitLine.orbit.material.color = new THREE.Color(ORBIT_COLOR_DEFAULT);
      }

      // Change new target orbit line color
      target.orbitLine.orbit.material.color = new THREE.Color(ORBIT_COLOR_HIGHLIGHT);
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

    initializeListeners: function() {
      document.addEventListener('solarsystem.travel.planet.start', this.handleTravelStart.bind(this));
      document.addEventListener('solarsystem.travel.planet.complete', this.handleTravelComplete.bind(this));
      document.addEventListener('solarsystem.travel.moon.start', this.handleTravelToMoonStart.bind(this));
      document.addEventListener('solarsystem.travel.moon.complete', this.handleTravelToMoonComplete.bind(this));
    },

    handleTravelStart: function(e) {
      this.isTraveling = true;

      this.$el.addClass('traveling');
    },

    handleTravelComplete: function(e) {
      this.$el.removeClass('traveling');

      this.isTraveling = false;
    },

    handleTravelToMoonStart: function(e) {

    },

    handleTravelToMoonComplete: function(e) {

    }
  });
});
