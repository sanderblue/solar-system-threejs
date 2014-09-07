function MissingArgumentException(argument, method) {
    var arg;

    if (typeof argument === 'number') {
        arg = argument + 1;
    }

    this.message = arg ? ': Missing argument ' + arg + ' for method ' + method: ': Missing argument!';
    this.name = 'MissingArugmentException';

    this.toString = function() {
        return this.name + this.message
    };
}
