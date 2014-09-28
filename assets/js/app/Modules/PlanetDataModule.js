define(['twigjs'], function(Twig) {

    console.log('twigjs', Twig);

    var PlanetDataModule = {
        templateDirectory: '../templates',

        getModuleTemplate: function() {
            var template = Twig.twig({
                id: 'planet',
                href: PlanetDataModule.templateDirectory + '/planet.twig',
                load: function(template) {
                    console.log('BOOM!', template);
                }
            });
        },

        init: function() {

        }
    };

    PlanetDataModule.getModuleTemplate();
});
