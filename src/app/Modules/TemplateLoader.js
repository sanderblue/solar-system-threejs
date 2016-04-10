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

    get(id, pathToTemplate, async) {
      var template = Twig.twig({ ref: id });

      if (async === false) {
        if (!template) {
          return Twig.twig({
            id: id,
            href: pathToTemplate,
            async: false
          });
        }

        return template;
      }

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
