define(
[
  'twig'
],
function(Twig) {
  'use strict';

  console.debug(Twig);

  class TemplateLoader {
    constructor(options) {
      // Twig.twig.debug = options.debug || true;
    }

    get(id, pathToTemplate) {
      return Twig.twig({
          id: id,
          href: pathToTemplate,

          // for this example we'll block until the template is loaded
          async: false

          // The default is to load asynchronously, and call the load function
          //   when the template is loaded.

          // load: function(template) { }
      });
    }
  }

  return TemplateLoader;
});
