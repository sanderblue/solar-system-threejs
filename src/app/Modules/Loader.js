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

      console.debug('DATA:', data);

      var menu = $('#menu').html(menu);

      var solarSystemFactory = new SolarSystemFactory(solarSystemData);
      var accordion = new Foundation.Accordion(menu.find('.accordion'), {
        allowAllClosed: true
      });

      $('#render-scene').on('click', function() {
        solarSystemFactory.renderScene(solarSystemData);
      });
    });
  });
});
