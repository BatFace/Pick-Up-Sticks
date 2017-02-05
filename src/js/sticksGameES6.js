import d3 from 'd3';
import $ from 'jquery';
import Timer from './classes/timer';
import calculateSticks from './stickLayerOuter';

const gameArea = () => {return calculateGameArea()};
const currentStickIndex = 9;

export function sticksGameES6() {
    let globalTimer = new Timer();
    globalTimer.OnFinish = loseGame;

    let gameLevel = 1;

    $('#restartButton').bind('click', { timer: globalTimer }, restartGame);

    // Primitive 'debounce' to stop restartGame being called
    // every time up/down spinner pressed
    var windowTimeOut;
    $('#levelNumericControl').change(function() {
        clearTimeout(windowTimeOut);
        windowTimeOut = setTimeout(function() {
            if($('#levelNumericControl').val() != gameLevel){
                restartGame({data: { timer: globalTimer }});
            }
        }, 200);
    });

    restartGame({data: { timer: globalTimer }});
}

// function restartGame(event) {
//     event.data.timer.reset();
//     makePauseScreenElementActive('#startText');
//
//     if (!$('#levelNumericControl')[0].checkValidity()) {
//         disablePlayPauseButton();
//
//         // Force the browser display native HTML5 error
//         // for the selected level number
//         $('#gameLevelForm').find(':submit').click();
//     }
//     else {
//         enablePlayPauseButton(event.data.timer);
//         redraw(event.data.timer);
//     }
// }
//
function makePauseScreenElementActive(element) {
    $("#pauseScreenText > span").addClass('notActive').removeClass('active');
    $(element).removeClass('notActive').addClass('active');
    $('#pauseScreen').toggle(true);
}

function calculateGameArea(){
    const gameAreaBounds = $('#gameArea')[0].getBoundingClientRect();
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

function redraw(globalTimer) {
    d3.select("svg").remove();

    var gameLevel = $('#levelNumericControl').val();

    var dataSet = calculateSticks(gameLevel, gameArea());

    update(dataSet, globalTimer);
}

function update(dataSet, globalTimer) {
    const svg = d3.select("#gameArea")
        .classed("svg-container", true)
        .append("svg")
        .classed("svg-content-responsive", true)
        .attr("preserveAspectRatio", "none")
        .attr("viewBox", "0 0 "
            + gameArea().gameAreaBounds.width
            + " "
            + gameArea().gameAreaBounds.height);

    let rectangles = svg.selectAll("rect")
        .data(dataSet);

    rectangles.enter().append("rect");
    rectangles.exit().remove();
    rectangles
        .attr("x", function (d, i) {
        return d.x;
        })
        .attr("y", function (d, i) {
            return d.y;
        })
        .attr("width", gameArea().stickWidth)
        .attr("height", gameArea().stickLength)
        .attr("transform", function (d) {
            return 'rotate('
                + (d.rotation * (180 / Math.PI)) + ' '
                + d.x + ' ' + d.y + ')';
        })
        .attr("stroke", "black")
        .attr("stroke-width", gameArea().strokeWidth)
        .attr("stroke-dasharray", gameArea().strokeDashArray)
        .attr("fill", function (d) {
            return d.color;
        })
        .on("click", function (d, i) {
            if (index === currentStickIndex) {
                if (currentStickIndex === 0) {
                    winGame(globalTimer);
                }
                else {
                    dataSet.pop();
                }
            }
        });
}

function disablePlayPauseButton() {
    $('#playPauseButton')
        .addClass("disabled")
        .removeClass("enabled")
        .unbind('click', playPause);
}

function enablePlayPauseButton(globalTimer) {
    $('#playPauseButton')
        .removeClass("disabled")
        .addClass("enabled")
        .unbind('click', playPause).bind('click', { timer: globalTimer }, playPause);
}

function playPause(event) {
    const pauseScreen = $('#pauseScreen');
    if (!pauseScreen.is(":visible")) {
        event.data.timer.pause();
        makePauseScreenElementActive('#pausedText');
    }
    else {
        pauseScreen.toggle(false);
        event.data.timer.start();
    }
}

function winGame(globalTimer) {
    globalTimer.pause();
    makePauseScreenElementActive('#wonText');
    disablePlayPauseButton();
    pulseLevelDisplay();
}

function loseGame() {
    makePauseScreenElementActive('#lostText');
    disablePlayPauseButton();
}

function pulseLevelDisplay(){
    $("#levelNumericControl")
        .fadeOut(100).fadeIn(100)
        .fadeOut(100).fadeIn(100);
}