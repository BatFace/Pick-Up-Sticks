const timer = {
    startTime: 30000,
    currentTime: 30000,
    onFinish: function () {
    },
    start: function () {
        setTimeout(function () {
            this.currentTime = this.currentTime - 1000;
            if (this.currentTime === 0) {
                this.onFinish();
            }
        }, 1000);
    },
    reset: function () {
        this.currentTime = this.startTime;
    },
    pause: function () {
        clearTimeout(this.start);
    },
    finish: function () {
        this.onFinish();
    },
    currentTimeInSeconds: function () {
        return this.currentTime / 1000;
    }
};

export { timer };
