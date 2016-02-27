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
                'click a[data-id]': 'travelToObject'
            },

            initialize: function(options) {
                this.scene = options.scene || null;
                this.data = options.data || {};
                this.sceneObjects = options.sceneObjects || [];
                this.travelController = new TravelController(this.scene);
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

            travelToObject: function(e) {
                console.debug('Click', e.currentTarget.dataset.id, this.sceneObjects);

                var target = this.matchTarget(Number.parseInt(e.currentTarget.dataset.id));

                this.travelController.travelToObject(this.scene.camera.parent.position, target);
                console.debug('Target:', target);

            }
        });
});
