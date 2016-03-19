define(
[
  'underscore',
  'backbone'
],
function(_, Backbone) {
  return Backbone.Model.extend({
    constructor: function(data) {
      Backbone.Model.apply(this, [data]);
    }
  });
});
