define(
[
    'lodash',
    'backbone',
    'Controllers/TravelController'
],
function(Backbone) {

        return Backbone.View.extend({
            event: {
                'click .planet-name': 'travelToObject'
            },

            initialize: function() {

            },

            travelToObject: function() {

            }
        });
});
