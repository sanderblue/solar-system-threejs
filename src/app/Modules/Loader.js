define(
[
  'vendor/httprequest/httprequest',
  'Modules/TemplateLoader',
  'Factory/SolarSystemFactory'
],
function(
  HttpRequest,
  TemplateLoader,
  SolarSystemFactory
) {
  'use strict';

  var solarSystemData = null;
  var templateLoader = new TemplateLoader();
  var dataRequest = new HttpRequest(
    'GET',
    window.location.origin + '/src/data/solarsystem.json',
    true
  );

  dataRequest.send().then(function(data) {
    solarSystemData = data;

    var updateUserInterfaceEvent = new CustomEvent('solarsystem.update.ui', { detail: data });
    var solarSystemFactory = new SolarSystemFactory(solarSystemData);
    var introScreen = $('.intro-screen');
    var renderButton = $('#render-scene');
    var solarsystem = $('#solar-system');
    var progressPrompt = $('#loading-prompt');
    var progressBar = $('#progress-bar');

    solarsystem.fadeOut();

    renderButton.one('click', ()=> {
      $('.inner').slideUp(500, ()=> {
        progressPrompt.addClass('active');

        solarSystemFactory.build(solarSystemData).then(()=> {
          introScreen.fadeOut(2000, ()=> {
            introScreen.remove();
            solarsystem.fadeIn(2000, ()=> {
              var seenModal = false;

              if (window.localStorage) {
                seenModal = localStorage.getItem('seenModal');
              }

              if (!seenModal) {
                $('#tutorial').foundation('open');

                $('#tutorial-got-it').on('click', ()=> {
                  if (window.localStorage) {
                    localStorage.setItem('seenModal', 'true');
                  }
                });
              }
            });
          });
        });
      });
    });
  });
});
