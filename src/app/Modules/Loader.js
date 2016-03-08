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
    'http://www.solarsystem.lcl/src/data/solarsystem.json',
    true
  );

  var getMenuTemplate = templateLoader.get('menu', 'src/app/Views/menu.twig');

  dataRequest.send().then(function(data) {
    solarSystemData = data;

    getMenuTemplate.then(function(template) {
      var menu = template.render({ planets: data.planets });
      menu = $('#menu').html(menu);

      console.debug('DATA:', data);

      var solarSystemFactory = new SolarSystemFactory(solarSystemData);
      var introScreen = $('.intro-screen');
      var renderButton = $('#render-scene');
      var solarsystem = $('#solar-system');
      var progressPrompt = $('#loading-prompt');
      var progressBar = $('#progress-bar');

      solarsystem.fadeOut();

      renderButton.one('click', ()=> {
        $('.inner').slideUp(500, ()=> {
          progressBar.addClass('active');
          progressPrompt.addClass('active');

          progressBar.on('animationend', ()=> {
            progressBar.addClass('complete');
            progressBar.after('Loading the Solar System. Please wait.');

            setTimeout(()=> {
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
            }, 10);
          });
        });
      });
    });
  });
});
