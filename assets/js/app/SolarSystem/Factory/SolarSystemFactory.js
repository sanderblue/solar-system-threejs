define(
    [
        'Scene',
        'SolarSystem',
        'SunFactory',
        'PlanetFactory',
        'AsteroidBeltFactory',
        'StarFactory',
        'TimerUtil',
        'System',
        'DocumentWriter'
    ],
    function(
        Scene,
        SolarSystem,
        SunFactory,
        PlanetFactory,
        AsteroidBeltFactory,
        StarFactory,
        TimerUtil,
        System,
        DocumentWriter
    )
    {
        /**
         * SolarSystemFactory
         *
         * This is the main factory that controls the construction of the Solar System. The contruction does not
         * begin until the scene has been built and initialized. Each build process is enabled or disabled by
         * the application configurations (found in App.js).
         */
        var SolarSystemFactory = {
            buildParent: function(buildStatusPrompt) {
                return $.Deferred(function(promise) {
                    if (!App.config.build.SunFactoryEnabled) {
                        return promise.resolve();
                    }

                    var startTime = new Date().getTime();

                    SunFactory.build();

                    var endTime = new Date().getTime(),
                        statusMessage = 'Sun Factory done building in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.'
                    ;

                    buildStatusPrompt.append('<div class="status-message">'+ statusMessage + '</div>');
                    System.log(statusMessage);

                    promise.resolve(statusMessage);
                });
            },

            buildAsteroidBelt: function(buildStatusPrompt) {
                return $.Deferred(function(promise) {
                    if (!App.config.build.AsteroidBeltFactoryEnabled) {
                        return promise.resolve();
                    }

                    var startTime = new Date().getTime();

                    AsteroidBeltFactory.buildBelt();

                    var endTime = new Date().getTime(),
                        statusMessage = 'Asteroid Belt Factory done building in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.'
                    ;

                    buildStatusPrompt.append('<div class="status-message">'+ statusMessage + '</div>');
                    System.log(statusMessage);

                    promise.resolve(statusMessage);
                });
            },

            buildPlanets: function(buildStatusPrompt) {
                if (!App.config.build.PlanetFactoryEnabled) {
                    return $.Deferred(function(promise) { return promise.resolve() });
                }

                var startTime = new Date().getTime(),
                    planets = SolarSystem.planets,
                    promises = []
                ;

                for (var i = 0; i < planets.length; i++) {
                    promises.push(PlanetFactory.build(planets[i], buildStatusPrompt));
                }

                return $.when.apply($, promises).done(function() {
                    var endTime = new Date().getTime(),
                        statusMessage = 'Planet Factory done building in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.'
                    ;

                    buildStatusPrompt.append('<div class="status-message">'+ statusMessage + '</div>');
                    System.log(statusMessage);
                });
            },

            buildDwarfPlanets: function(buildStatusPrompt) {
                if (!App.config.build.DwarfPlanetFactoryEnabled) {
                    return $.Deferred(function(promise) { return promise.resolve() });
                }

                var startTime = new Date().getTime(),
                    dwarfPlanets = SolarSystem.dwarfPlanets,
                    promises = []
                ;

                for (var i = 0; i < dwarfPlanets.length; i++) {
                    promises.push(PlanetFactory.build(dwarfPlanets[i], buildStatusPrompt));
                }

                return $.when.apply($, promises).done(function() {
                    var endTime = new Date().getTime(),
                        statusMessage = 'Planet Factory done building dwarf planets in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.'
                    ;

                    buildStatusPrompt.append('<div class="status-message">'+ statusMessage + '</div>');
                    System.log(statusMessage);
                });
            },

            buildStars: function(buildStatusPrompt) {
                return $.Deferred(function(promise) {
                    if (!App.config.build.StarFactoryEnabled) {
                        return promise.resolve();
                    }

                    var startTime = new Date().getTime();

                    StarFactory.build();
                    // StarFactory.buildStarsAsParticleSystem();

                    var endTime = new Date().getTime(),
                        statusMessage = 'Star Factory done building in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.'
                    ;

                    buildStatusPrompt.append('<div class="status-message">'+ statusMessage + '</div>');
                    System.log(statusMessage);

                    promise.resolve();
                });
            },

            build: function(buildStatusPrompt) {
                if (!App.config.build.SolarSystemFactoryEnabled) {
                    return promise.resolve();
                }

                var startTime = new Date().getTime();

                return $.when(
                    SolarSystemFactory.buildParent(buildStatusPrompt),
                    SolarSystemFactory.buildPlanets(buildStatusPrompt),
                    SolarSystemFactory.buildDwarfPlanets(buildStatusPrompt),
                    SolarSystemFactory.buildAsteroidBelt(buildStatusPrompt),
                    SolarSystemFactory.buildStars(buildStatusPrompt)
                )
                .done(function() {
                    var endTime = new Date().getTime();

                    System.log('Solar System Factory done building in ' +  TimerUtil.getElapsedTime(startTime, endTime) + ' milliseconds.');
                });
            }
        };

        return SolarSystemFactory;
    }
);
