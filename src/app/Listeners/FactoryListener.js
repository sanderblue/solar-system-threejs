define(function() {

    function logData(event) {
        console.log('Build took', event.detail);
    }

    document.addEventListener('build.solarsystem.start', logData);
    document.addEventListener('build.solarsystem.end', logData);


});
