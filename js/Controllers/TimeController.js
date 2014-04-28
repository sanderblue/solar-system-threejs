var TimeController = {
    dayWithTimeAsDecimal: 1,
    dayIntervalObj: null,
    dayInterval: 1000,

    createTime: function() {
        TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal();
    },

    startTime: function() {
        TimeController.dayIntervalObj = setInterval(function() {

            TimeController.dayWithTimeAsDecimal = new Date().getDOYwithTimeAsDecimal();

        }, TimeController.dayInterval);
    },

    stopTime: function() {
        clearInterval(TimeController.dayIntervalObj);
    }
};