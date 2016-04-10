define(function() {
  'use strict';

  /**
   * Gets the current day of the year.
   *
   * @return {Integer}
   */
  Date.prototype.getDayOfYear = function(date) {
    var date = date || new Date();
    var onejan = new Date(date.getFullYear(), 0, 1);

    return Math.ceil((this - onejan) / 86400000);
  };

  /**
   * Gets the current local time and returns it in decimal format.
   * Uses ES6 `Number.parseInt()` instead of the global `parseInt()`.
   *
   * @return {Float}
   */
  Date.prototype.timeStringToDecimal = function () {
      var timeString   = this.toTimeString(),
          hoursMinutes = timeString.split(/[.:]/),
          hours        = Number.parseInt(hoursMinutes[0], 10),
          minutes      = hoursMinutes[1] ? Number.parseInt(hoursMinutes[1], 10) : 0
      ;

      return hours + minutes / 60;
  };

  /**
   * Gets the current day of the year with the current time of day and
   * returns it in decimal format. Uses ES6 `Number.parseFloat()` to
   * return an floating point number from a number string.
   *
   * @param  {Integer} toFixed
   * @return {Float}
   */
  Date.prototype.getDOYwithTimeAsDecimal = function(toFixed) {
    var float = this.getDayOfYear() + this.timeStringToDecimal() / 24;

    return toFixed && toFixed > 0
      ? Number.parseFloat(float.toFixed(toFixed))
      : float
    ;
  };

});
