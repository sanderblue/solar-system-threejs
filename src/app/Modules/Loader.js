define(
[
  'vendor/httprequest/httprequest',
  'Modules/ThirdPartyScripts',
  'Modules/Detector',
  'Modules/TemplateLoader',
  'Factory/SolarSystemFactory',
  'vendor/ajaxrequest/dist/ajaxrequest'
],
function(
  HttpRequest,
  ThirdPartyScripts,
  Detector,
  TemplateLoader,
  SolarSystemFactory,
  AjaxRequest
) {
  'use strict';

  var seenJsFeaturesModal = false;

  if (window.localStorage) {
    seenJsFeaturesModal = localStorage.getItem('seenJsFeaturesModal');
  }

  if (!seenJsFeaturesModal) {
    var browserAlert = new Foundation.Reveal($('#browser-compatibility-modal'));
    browserAlert.open();

    $('#browser-compatibility-got-it').on('click', ()=> {
      if (window.localStorage) {
        localStorage.setItem('seenJsFeaturesModal', 'true');
      }
    });
  }

  function notifyGa(category, action, label) {
    ga('send', 'event', category, action, label);

    console.log('Event:', category, '-', action, '-',label);
  }

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    notifyGa('Compatibility Check', 'Fail', window.navigator.userAgent);
    return;
  }

  notifyGa('Compatibility Check', 'Pass', window.navigator.userAgent);

  var solarSystemData = null;
  var templateLoader = new TemplateLoader();
  var dataRequest = new HttpRequest(
    'GET',
    '../../src/data/solarsystem.json',
    true
  );

  dataRequest.send().then((data)=> {
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
