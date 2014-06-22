define(function() {

    var AppConfig = {
        logger: {
            enabled: false
        }
    };

    if (typeof window !== 'undefined') {
        window.AppConfig = AppConfig;
    }

    return AppConfig;

});