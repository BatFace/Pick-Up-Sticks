import d3 from 'd3';
import { calculateSticks } from './stickLayerOuter';
import GameArea from './gameArea';

export default class SticksSVG{
    constructor(){
        this.gameArea = {};

        this.create = (el, props) => {
            this.gameArea = new GameArea(el);

            this.svg = d3.select(el)
                .classed("svg-container", true)
                .append("svg")
                .classed("svg-content-responsive", true)
                .attr("preserveAspectRatio", "none")
                .attr("viewBox", "0 0 "
                    + this.gameArea.gameAreaBounds.width
                    + " "
                    + this.gameArea.gameAreaBounds.height);

            this.update(el, props);
        };

        this.update = (el, props) => {
            const dataSet = calculateSticks(props.gameLevel, this.gameArea)
            this._drawSticks(el, props, dataSet);
        };

        this._drawSticks = function(el, props, data) {
            const rectangles = d3.select(el)
                                 .select("svg")
                                 .selectAll("rect")
                                 .data(data);

            rectangles.enter().append("rect");

            rectangles.exit().remove();

            rectangles
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                })
                .attr("width", this.gameArea.stickWidth)
                .attr("height", this.gameArea.stickLength)
                .attr("transform", function (d) {
                    return 'rotate('
                        + (d.rotation * (180 / Math.PI)) + ' '
                        + d.x + ' ' + d.y + ')';
                })
                .attr("stroke", "black")
                .attr("stroke-width", this.gameArea.strokeWidth)
                .attr("stroke-dasharray", this.gameArea.strokeDashArray)
                .attr("fill", function (d) {
                    return d.color;
                })
                .on("click", function (d, i) {
                    if (i === data.length-1) {
                        if (i === 0) {
                            props.winGame();
                        }

                        data.pop();
                        // TODO: Simplify this
                        let rectangles = d3.select(this.parentElement)
                            .selectAll("rect")
                            .data(data);
                        rectangles.exit().remove();
                    }
                });
        };
    }
};