define(
[
	'jquery',
	'underscore',
	'backbone',
	'Controllers/TravelController'
],
function($, _, Backbone, TravelController) {

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
				this.currentTarget = null;
			},

			matchTarget: function(id) {
				var target = null;

				for (var i = 0; i < this.sceneObjects.length; i++) {
					if (this.sceneObjects[i].id === id) {
						target = this.sceneObjects[i];
						break;
					}
				}

				return target;
			},

			highlightObject: function(e) {
				var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

				console.debug('Hover', target);

				if (_.isEqual(this.currentTarget, target)) {
					return;
				}

				target.orbitLine.orbit.material.color = new THREE.Color('#60fc41');
				target.orbitLine.orbit.material.needsUpdate = true;
			},

			unhighlightObject: function(e) {
				var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

				console.debug('Hover', e.currentTarget.dataset.id, this.sceneObjects);

				if (_.isEqual(this.currentTarget, target)) {
					return;
				}

				target.orbitLine.orbit.material.color = new THREE.Color('#3d3d3d');
				target.orbitLine.orbit.material.needsUpdate = true;
			},

			travelToObject: function(e) {
				console.debug('Click', e.currentTarget.dataset.id, this.sceneObjects);

				var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

				console.debug('Target:', target.orbitLine.orbit);

				if (_.isEqual(this.currentTarget, target)) {
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
			}
		});
});
