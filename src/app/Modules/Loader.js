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

      $('#render-scene').on('click', function() {
        $(this).fadeOut(300, function() {
          $(this).remove();

          solarSystemFactory.build(solarSystemData);
        });
      });
    });
  });
});
