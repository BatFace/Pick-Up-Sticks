import d3 from 'd3';
import { WON } from '../actions/gameStateAction';
import calculateSticks from './stickLayerOuter';

export default class SticksSVG{
    constructor(){
        this.create = (el, props, state) => {
            const gameArea = calculateGameArea(el),
                dataSet = calculateSticks(state.gameLevel, gameArea);

            this.svg = d3.select(el)
                .classed("svg-container", true)
                .append("svg")
                .classed("svg-content-responsive", true)
                .attr("preserveAspectRatio", "none")
                .attr("viewBox", "0 0 "
                    + gameArea.gameAreaBounds.width
                    + " "
                    + gameArea.gameAreaBounds.height);

            this.update(el, props, dataSet, gameArea);
        };

        this.update = (el, props, dataSet, gameArea) => {
            this._drawSticks(el, props, dataSet, gameArea);
        };

        this._drawSticks = function(el, props, data, gameArea) {
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
                .attr("width", gameArea.stickWidth)
                .attr("height", gameArea.stickLength)
                .attr("transform", function (d) {
                    return 'rotate('
                        + (d.rotation * (180 / Math.PI)) + ' '
                        + d.x + ' ' + d.y + ')';
                })
                .attr("stroke", "black")
                .attr("stroke-width", gameArea.strokeWidth)
                .attr("stroke-dasharray", gameArea.strokeDashArray)
                .attr("fill", function (d) {
                    return d.color;
                })
                .on("click", function (d, i) {
                    // TODO: work on stick remove logic
                    console.log(data.length-1);
                    if (i === data.length-1) {
                        if (i === 0) {
                            props.setGameState(WON);
                        } else {
                            data.pop();
                        }
                    }
                });
        };
    }
};

function calculateGameArea(el){
    const gameAreaBounds = el.getBoundingClientRect();
    const gameAreaMiddle = [(gameAreaBounds.right - gameAreaBounds.left) / 2,
        (gameAreaBounds.bottom - gameAreaBounds.top) / 2];
    const stickLength = gameAreaBounds.height / 3.5;
    const proposedStickWidth = stickLength / 16;
    const stickWidth = proposedStickWidth > 12 ? proposedStickWidth : 12;
    const strokeLength = stickLength + stickWidth;
    const strokeDashArray = strokeLength + "," + strokeLength;
    const strokeWidth = stickWidth / 5;

    return {
        gameAreaBounds: gameAreaBounds,
        gameAreaMiddle: gameAreaMiddle,
        stickLength: stickLength,
        stickWidth: stickWidth,
        strokeDashArray: strokeDashArray,
        strokeWidth: strokeWidth
    };
}