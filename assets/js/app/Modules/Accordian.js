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

        itemLabels.on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var menuContainer = $(this).parent(),
                submenu       = menuContainer.find('.accordian-submenu').first()
            ;

            console.log(menuContainer.hasClass('active'));

            if (menuContainer.hasClass('active')) {
                menuContainer.removeClass('active');
                submenu.slideUp(this.animationSpeed);

                return;
            }

            menuContainer
                .addClass('active')
                .children()
                .addClass('active')
            ;

            submenu.slideDown(this.animationSpeed);
        });
    };

    return Accordian;
});
