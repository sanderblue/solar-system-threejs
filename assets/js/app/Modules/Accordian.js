define(function() {

    var Accordian = function() {
        this.init();
    };

    Accordian.prototype.init = function() {
        var accordianItems = $('.accordian-item'),
            itemLabels     = accordianItems.find('.accordian-item-label')
        ;

        itemLabels.on('click', function() {
            var menuContainer = $(this).parent(),
                submenu       = menuContainer.find('.accordian-submenu').first()
            ;

            if (menuContainer.hasClass('active')) {
                menuContainer.removeClass('active');
                submenu.slideUp();

                return;
            }

            menuContainer.addClass('active');
            submenu.slideToggle();
        });
    };

    return Accordian;
});
