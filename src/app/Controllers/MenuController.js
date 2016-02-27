define(
[
    'jquery',
    'underscore',
    'backbone',
    'Controllers/TravelController'
],
function($, _, Backbone) {

        return Backbone.View.extend({
            event: {
                'click .planet-name': 'travelToObject'
            },

            initialize: function(options) {
                this.data = options.data || {};
                this.sceneObjects = options.sceneObjects || [];

                console.debug('MenuController', options);
            },

            travelToObject: function(e) {
                console.debug('Click', e.currentTarget);
            }
        });
});
