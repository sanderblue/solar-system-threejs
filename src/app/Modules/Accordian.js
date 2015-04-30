define(function() {

    var Accordian = function(container, animationSpeed) {
        this.container = container ? container : $('#accordian');
        this.animationSpeed = 250;
        this.init();
    };

    Accordian.prototype.init = function() {
        var itemLabels = this.container.find('.accordian-item-label');

        itemLabels.on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var menuItem      = $(this),
                isActive      = menuItem.hasClass('active')
                openItems     =
                menuContainer = menuItem.parent(),
                submenu       = menuContainer.find('.accordian-submenu').first()
            ;

            if (isActive) {
                menuContainer.removeClass('active');
                menuItem.removeClass('active');
                submenu.slideUp(this.animationSpeed);

                return;
            }

            $(this).addClass('active');

            submenu.slideDown(this.animationSpeed);
        });
    };

    return Accordian;
});
