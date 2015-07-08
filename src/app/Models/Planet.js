define(function() {
  'use strict';

  class Planet {
    constructor(data) {
      for (var prop in data) {
        this[prop] = data[prop];
      }
    }

    // toObject() {
    //   return this.properties;
    // }
  }

  return Planet;
});
