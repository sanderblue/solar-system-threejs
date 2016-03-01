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
      var introScreen = $('#render-scene');
      var solarsystem = $('#solar-system');

      solarsystem.fadeOut();

      introScreen.on('click', function() {
        solarSystemFactory.build(solarSystemData).then(()=> {
          setTimeout(()=> {
            introScreen.fadeOut(4000, function() {
              introScreen.remove();
              solarsystem.fadeIn(2000);
            });
          }, 500);
        });
      });
    });
  });
});
