define(['jquery'], function($) {

    var LoadingPromptController = {
        initEventListeners: function(Initializer, MainController) {
            var prompt            = document.getElementById('loading-prompt'),
                introduction      = document.getElementById('introduction'),
                buildButton       = document.getElementById('build-button'),
                buildStatusPrompt = document.getElementById('build-status-prompt'),
                statusMessages    = document.getElementById('status-messages')
            ;

            buildButton.onclick = function() {
                $(introduction).fadeOut(600, function() {
                    $(buildStatusPrompt).fadeIn(600, function() {
                        $(statusMessages).fadeIn(600, function() {
                            $.when(Initializer.buildSolarSystem($(statusMessages))).done(function() {
                                $(buildStatusPrompt).append('<div id="view-button" class="btn-ss view-button">VIEW SOLAR SYSTEM</div>');
                                $(buildStatusPrompt).find('#view-button').fadeIn(300, function() {
                                    LoadingPromptController.initViewSceneListener(prompt, MainController);
                                });
                            });
                        });
                    });
                });
            };
        },

        initViewSceneListener: function(prompt, MainController) {
            $(document).on('click', '#view-button', function() {
                MainController.renderSolarSystem();
                $(prompt).fadeOut(1200);
            });
        },

        init: function(Initializer, MainController) {
            $(function() {
                LoadingPromptController.initEventListeners(Initializer, MainController);
            });
        }
    };

    return LoadingPromptController;

});
