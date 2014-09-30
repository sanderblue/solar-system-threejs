define(['twigjs'], function(Twig) {
    var PlanetDataModule = {
        templateDirectory: '/templates',

        initTemplate: function() {
            var template = Twig.twig({
                id: 'planet',
                href: PlanetDataModule.templateDirectory + '/planet.twig'
            });
        },

        getRenderedTemplate: function(id, data) {
            var method = 'PlanetDataModule::renderTemplate()';

            if (!data) {
                for (var i = 0; i < arguments.length; o++) {
                    if (!arguments[i]) {
                        throw new MissingArgumentException(arguments[i], method);
                    }
                }
            }

            if (typeof id !== 'string') {
                throw new InvalidArugmentException(arguments[i], method);
            }

            return Twig.twig({ ref: id }).render({ 'data': data });
        },

        appendTo: function(element, templateHTML) {
            element.innerHTML = template;
        },

        init: function() {
            PlanetDataModule.initTemplate();
        }
    };

    PlanetDataModule.init();

    return PlanetDataModule;
});
