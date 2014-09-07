// Work in progress
function InvalidArgumentException(argument, method) {
    this.message = 'Invalid argument ' + argument + ' passed to method ' + method;
    this.name = 'InvalidArgumentException';

    this.toString = function() {
        return this.name + this.message
    };
}
