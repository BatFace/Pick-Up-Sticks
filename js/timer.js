define([], function () {
    var sec = 30;
    var timeForCalc = sec * 10;

    var timerId, start;

    this.Start = function () {
        start = new Date();
        timerId = window.setTimeout(function() {
            Start();
            countdown();
            if(timeForCalc === 0)
            {
                Pause();
                this.OnFinish();
            }
        }, 100);
    };

    var countdown = function () {
        document.getElementById("timerDiv").innerHTML = (--timeForCalc/10).toFixed(1);
    };

    this.Reset = function () {
        window.clearTimeout(timerId);
        timeForCalc = sec * 10;
        document.getElementById("timerDiv").innerHTML = sec.toFixed(1);
    };

    this.Pause = function () {
        window.clearTimeout(timerId);
    };

    this.OnFinish = function () {
        console.log('Timer ended.');
        // TODO: or throw ex?
    };

    return this;
});