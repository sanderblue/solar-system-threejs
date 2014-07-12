define(function() {

    var Accordian = function(container, animationSpeed) {
        this.container = container ? container : $('#accordian');
        this.animationSpeed = 250;
        this.init();
    };

    Accordian.prototype.init = function() {
        var accordianItems = this.container.find('.accordian-item'),
            itemLabels     = accordianItems.find('.accordian-item-label')
        ;

        itemLabels.on('click', function() {
            var menuContainer = $(this).parent(),
                submenu       = menuContainer.find('.accordian-submenu').first()
            ;

            if (menuContainer.hasClass('active')) {
                menuContainer.removeClass('active');
                submenu.slideUp(this.animationSpeed);

                return;
            }

            menuContainer.addClass('active');
            submenu.slideToggle(this.animationSpeed);
        });
    };

    return Accordian;
});
