import MicroEvent from 'microevent';

export default class Timer{
    constructor(){
        this.startTime =  30000;
        this.currentTime =  30000;
        this.onFinish =  () => {
        };
        this.start =  () => {
            setInterval(function(){
                this.currentTime = this.currentTime - 1000;
                self.trigger('tick', this.currentTime);

                if (this.currentTime === 0) {
                    this.onFinish();
                }
            }, 1000);
        };
        this.reset =  () => {
            this.currentTime = this.startTime;
        };
        this.pause =  () => {
            clearTimeout(this.start);
        };
        this.finish =  () => {
            this.onFinish();
        };

        this.bind('reset', function() {
            this.reset();
        });
    }
};

MicroEvent.mixin(Timer);
