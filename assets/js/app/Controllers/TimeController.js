define(function() {

    var TimeController = {
        // TODO: Make these accessible to the user to change and manipulate
        dayWithTimeAsDecimal: 1,
        dayIntervalObj: null,
        dayInterval: 2000,
        pseudoDayCount: 1,

        createTime: function() {
            TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal();
        },

        startTime: function() {
            TimeController.dayIntervalObj = setInterval(function() {
                TimeController.pseudoDayCount++;

                TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal() + TimeController.pseudoDayCount + ms;

                // console.log('Day ', TimeController.dayWithTimeAsDecimal);

            }, TimeController.dayInterval);
        },

        stopTime: function() {
            clearInterval(TimeController.dayIntervalObj);
        }
    };

    return TimeController;
});