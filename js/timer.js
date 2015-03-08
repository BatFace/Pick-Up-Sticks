define(['../lib/jquery/dist/jquery.min.js', '../lib/FlipClock/compiled/flipclock.min.js'], function () {
    var clock;
    var timeLimit = 31;

    clock = $('#flipClock').FlipClock(timeLimit, {
        clockFace: 'Counter',
        countdown: true,
        autoStart: true,
        callbacks: {
            stop: function () {
                if (clock.getTime().time === 0) {
                    clock.OnFinish();
                }
            }
        }
    });

    clock.stop();

    clock.Reset = function () {
        clock.stop();
        clock.setTime(timeLimit);
    };

    clock.Start = function () {
        clock.start();
    };

    clock.Stop = function () {
        clock.stop();
    };

    clock.OnFinish = function () {
        console.log('Timer ended.');
    };

    return clock;
});