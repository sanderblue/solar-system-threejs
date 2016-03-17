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
      'change #toggle-orbit-highlight': 'toggleOrbitHighlight'
    },

    initialize: function(options) {
      this.sceneObjects = options.sceneObjects || [];
      this._enableOrbitEffectsEvent = new CustomEvent('solarsystem.effects.orbit.enable');
      this._disableOrbitEffectsEvent = new CustomEvent('solarsystem.effects.orbit.disable');

      document.addEventListener('solarsystem.effects.orbit.enable', ()=> {
        for (var i = 0; i < this.sceneObjects.length; i++) {
          var moons = this.sceneObjects[i]._moons;

          for (var n = 0; n < moons.length; n++) {
            var randomColor = '#'+ (Math.random().toString(16) + '000000').slice(2, 8);

            moons[n]._orbitLine.orbit.material.color = new THREE.Color(randomColor);
          }
        }
      });

      document.addEventListener('solarsystem.effects.orbit.disable', ()=> {
        for (var i = 0; i < this.sceneObjects.length; i++) {
          var moons = this.sceneObjects[i]._moons;

          for (var n = 0; n < moons.length; n++) {
            moons[n]._orbitLine.orbit.material.color = new THREE.Color('#2b2b2b');
          }
        }
      });
    },

    toggleOrbitHighlight: function(e) {
      if (e.currentTarget.checked) {
        document.dispatchEvent(this._enableOrbitEffectsEvent);
      } else {
        document.dispatchEvent(this._disableOrbitEffectsEvent);
      }
    }
  });
});
