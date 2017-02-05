export default class Stick {
    constructor(
        propAlongStickLengthToCrossPrevious,
        propAlongStickLengthToCrossNext,
        rotation,
        color,
        x,
        y
    ) {
        this.propAlongStickLengthToCrossPrevious = propAlongStickLengthToCrossPrevious;
        this.propAlongStickLengthToCrossNext = propAlongStickLengthToCrossNext;
        this.rotation = rotation;
        this.color = color;
        this.x = x;
        this.y = y;
    }
}