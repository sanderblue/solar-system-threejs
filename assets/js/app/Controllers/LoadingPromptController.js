define(['jquery'], function($) {

    var LoadingPromptController = {
        initEventListeners: function(Initializer) {
            var introduction      = document.getElementById('introduction'),
                buildButton       = document.getElementById('build-button'),
                buildStatusPrompt = document.getElementById('build-status-prompt')
            ;

            buildButton.onclick = function() {
                $(introduction).fadeOut(600, function() {
                    $(buildStatusPrompt).fadeIn(600, function() {
                        Initializer.buildSolarSystem($(this));
                    });
                });
            };
        },

        init: function(Initializer) {
            $(function() {
                LoadingPromptController.initEventListeners(Initializer);
            });
        }
    };

    return LoadingPromptController;

});
