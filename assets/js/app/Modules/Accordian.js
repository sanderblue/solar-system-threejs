define(function() {

    var Accordian = function(options) {
        // this.options = {
        //     container: document.getElementById('accordian')
        //     accordianItemSelector:
        // };

        // if (options) {
        //     this.options = {};

        //     for (var attrname in obj1) {
        //         this.options[attrname] = obj1[attrname];
        //     }

        //     for (var attrname in obj2) {
        //         this.options[attrname] = obj2[attrname];
        //     }
        // }

        this.container              = document.getElementById('accordian');
        this.accordianItemClassName = 'accordian-item';

        this.initEventListeners();
    };

    Accordian.prototype.initEventListeners = function() {
        var accordianItems = this.container.getElementsByClassName(this.accordianItemClassName),
            clickHandler   = this.clickHandler
        ;

        for (var i = 0; i < accordianItems.length; i++) {
            accordianItems[i].addEventListener('click', clickHandler, false);
        }

        console.log(accordianItems.length);
    };

    Accordian.prototype.clickHandler = function() {
        var submenu = this.parentElement.querySelector('.accordian-submenu');

        submenu.setAttribute('class', 'accordian-submenu active');
    };

    return Accordian;
});
