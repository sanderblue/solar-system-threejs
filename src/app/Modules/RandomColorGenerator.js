define(
[
  'vendor/randomcolor/randomColor'
],
function(randomColor) {
  'use strict';

  class RandomColorGenerator {
    constructor() {}

    getRandomHexColor() {
      return '#'+ (Math.random().toString(16) + '000000').slice(2, 8);
    }

    getRandomColor(options) {
      return randomColor(options);
    }
  }

  return RandomColorGenerator;
});
