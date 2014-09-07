define(function() {

    /**
     * Date.js
     *
     * Extends the JavaScript date object
     */


    /**
     * Gets the current day of the year.
     *
     * @return integer
     */
    Date.prototype.getDOY = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);

        return Math.ceil((this - onejan) / 86400000);
    };

    /**
     * Gets the current local time and returns it in decimal format.
     *
     * @return float
     */
    Date.prototype.timeStringToDecimal = function () {
        var timeString   = this.toTimeString(),
            hoursMinutes = timeString.split(/[.:]/),
            hours        = parseInt(hoursMinutes[0], 10),
            minutes      = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0
        ;

        return hours + minutes / 60;
    };

    /**
     * Gets the current day of the year with the current time of day and
     * returns it in decimal format.
     *
     * @return integer
     */
    Date.prototype.getDOYwithTimeAsDecimal = function() {
       return this.getDOY() + this.timeStringToDecimal() / 24;
    };

});
