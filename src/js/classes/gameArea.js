export default class GameArea {
    constructor(el) {
        this.gameAreaBounds = el.getBoundingClientRect();
        this.gameAreaMiddle = [(this.gameAreaBounds.right - this.gameAreaBounds.left) / 2,
            (this.gameAreaBounds.bottom - this.gameAreaBounds.top) / 2];
        this.stickLength = this.gameAreaBounds.height / 3.5;
        this.proposedStickWidth = this.stickLength / 16;
        this.stickWidth = this.proposedStickWidth > 12 ? this.proposedStickWidth : 12;
        this.strokeLength = this.stickLength + this.stickWidth;
        this.strokeDashArray = this.strokeLength + "," + this.strokeLength;
        this.strokeWidth = this.stickWidth / 5;
    }
}