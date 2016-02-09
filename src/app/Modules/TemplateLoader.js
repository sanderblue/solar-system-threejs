define(
[
  'twig'
],
function(Twig) {
  'use strict';

  class TemplateLoader {
    constructor(options) {
      // Twig.debug = options.debug || true;
    }

    get(id, pathToTemplate) {
      return new Promise(function(resolve, reject) {
        var template = Twig.twig({ ref: id });

        if (template) {
          return resolve(template);
        }

        Twig.twig({
          id: id,
          href: pathToTemplate,
          load: function(template) {
            return resolve(template);
          }
        });
      });
    }
  }

  return TemplateLoader;
});
