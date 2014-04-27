var TimeController = {
    dayWithTimeAsDecimal: 1,
    dayIntervalObj: null,
    dayInterval: 1000,

    createTime: function() {
        var today       = new Date(),
            timeDecimal = today.timeStringToDecimal(),
            dayOfYear   = today.getDOY()
        ;

        TimeController.dayWithTimeAsDecimal = dayOfYear + timeDecimal / 24;

        console.log(TimeController.dayWithTimeAsDecimal)
    },

    startTime: function() {
        TimeController.dayIntervalObj = setInterval(function() {
            var today       = new Date(),
                timeDecimal = today.timeStringToDecimal(),
                dayOfYear   = today.getDOY()
            ;

            TimeController.dayWithTimeAsDecimal = dayOfYear + timeDecimal / 24
        }, TimeController.dayInterval);
    },

    stopTime: function() {
        clearInterval(TimeController.dayIntervalObj);
    }
};