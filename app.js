requirejs.config({
    paths: {
        jquery: 'lib/jquery/dist/jquery.min',
        flipClock: 'lib/FlipClock/compiled/flipclock.min'
    },
    shim:{
        'flipClock':{
            deps: ['jquery']
        }
    }
});

requirejs(['js/main']);