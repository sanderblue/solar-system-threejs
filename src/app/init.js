define('jquery', function() {
    return jQuery;
});

require(
[
    'Modules/Loader'
],
function() {
    if (window.Foundation) {
        $(document).foundation();
    }
});
