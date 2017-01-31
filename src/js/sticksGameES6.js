import { timer } from './timer';
import d3 from 'd3';
import $ from 'jquery';

const STICK_COLORS = ["#3cb371", "#cd5c5c", "#f0e68c", "#9370db", "#afeeee"];
const FIVE_DEG = Math.PI / 36;
const ONE_SEVEN_FIVE_DEG = FIVE_DEG * 35;
const NINETY_DEG = FIVE_DEG * 18;
const TEN_DEG = FIVE_DEG * 2;

const LOW_CROSSING_LIMIT = 0.1;
const HIGH_CROSSING_LIMIT = 0.9;
// TODO: Put this calculation in the 'right' place
const gameArea = () => {return calculateGameArea()};
const currentStickIndex = 9;

export function sticksGameES6() {
    // TODO: stop passing timer around. Should be self-contained
    let globalTimer = timer;
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

function restartGame(event) {
    event.data.timer.reset();
    makePauseScreenElementActive('#startText');

    if (!$('#levelNumericControl')[0].checkValidity()) {
        disablePlayPauseButton();

        // Force the browser display native HTML5 error
        // for the selected level number
        $('#gameLevelForm').find(':submit').click();
    }
    else {
        enablePlayPauseButton(event.data.timer);
        redraw(event.data.timer);
    }
}

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

    let dataSet = [],
        rotation = 0;

    var gameLevel = $('#levelNumericControl').val();

    for (var i = 0; i < gameLevel; i++) {
        let newStick, oldStick;
        const s = getRandomNumberInRange(LOW_CROSSING_LIMIT, HIGH_CROSSING_LIMIT);
        const t = getRandomNumberInRange(LOW_CROSSING_LIMIT, HIGH_CROSSING_LIMIT);

        if (i !== 0) {
            oldStick = dataSet[(i - 1)];
            rotation = newStickNotNearParallelLast(dataSet[(i - 1)].rotation);
        }
        else {
            // To place first stick, first calculate the position of a dummy old stick
            // in the centre of the game area in order to lessen chance of it being quickly out
            // of range for subsequent sticks
            var x = gameArea().gameAreaMiddle[0] + gameArea().stickLength / 2;
            var y = gameArea().gameAreaMiddle[1];

            oldStick = new sticky(0.5, 0.5, NINETY_DEG, STICK_COLORS[getRandomIntInRange(0, 4)], x, y);
            rotation = getRandomNumberInRange(FIVE_DEG, ONE_SEVEN_FIVE_DEG);
        }

        newStick = generateNewStickXY(oldStick,
            new sticky(s, t, rotation, STICK_COLORS[getRandomIntInRange(0, 4)]));
        dataSet.push(newStick);

        var svg = d3.select("#gameArea")
            .classed("svg-container", true)
            .append("svg")
            .classed("svg-content-responsive", true)
            .attr("preserveAspectRatio", "none")
            .attr("viewBox", "0 0 " + gameArea().gameAreaBounds.width + " " + gameArea().gameAreaBounds.height);

        update(svg, dataSet, globalTimer);
    }
}

// TODO: Move to own class
function sticky(s, t, rotation, color, x, y) {
    this.propAlongStickLengthToCrossPrevious = s;
    this.propAlongStickLengthToCrossNext = t;
    this.rotation = rotation;
    this.color = color;
    this.x = x;
    this.y = y;
}

function update(svg, dataSet, globalTimer) {
    let rectangles = svg.selectAll("rect")
        .data(dataSet);
    rectangles.enter().append("rect");
    rectangles.exit().remove();
    rectangles.attr("x", function (d, i) {
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
            removeIfLast(i, globalTimer, dataSet, svg);
        });
}

function removeIfLast(index, globalTimer, dataSet, svg) {
    if (index === currentStickIndex) {
        if (currentStickIndex === 0) {
            winGame(globalTimer);
        }
        else {
            removeStick(dataSet, svg);
        }
    }
}

function removeStick(dataSet, svg) {
    dataSet.pop();
    // TODO: reinstate this (can't be global const)
    //currentStickIndex--;
    let rectangles = svg.selectAll("rect")
        .data(dataSet);
    rectangles.exit().remove();
}

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function isInRange(x, min, max) {
    return (x >= min && x < max);
}

function newStickNotNearParallelLast(lastRot) {
    const newRotation = getRandomNumberInRange(FIVE_DEG, ONE_SEVEN_FIVE_DEG),
        lowerBound = (lastRot - TEN_DEG),
        upperBound = (lastRot + TEN_DEG);

    if (isInRange(newRotation, lowerBound, upperBound)) {
        return newStickNotNearParallelLast(lastRot);
    }
    else {
        return newRotation;
    }
}

function generateNewStickXY(oldStick, newStick) {
    let aOld, bOld, aNew, bNew;

    if (isInRange(oldStick.rotation, FIVE_DEG, NINETY_DEG)) {
        aOld = -(gameArea().stickLength * Math.sin(oldStick.rotation));
        bOld = (gameArea().stickLength * Math.cos(oldStick.rotation));
    }
    else // NINETY_DEG <= oldStick.rotation <= ONE_SEVEN_FIVE_DEG
    {
        const oldRotationMinusNinetyDeg = oldStick.rotation - NINETY_DEG;

        aOld = -(gameArea().stickLength * Math.cos(oldRotationMinusNinetyDeg));
        bOld = -(gameArea().stickLength * Math.sin(oldRotationMinusNinetyDeg));
    }

    if (isInRange(newStick.rotation, FIVE_DEG, NINETY_DEG)) {
        aNew = gameArea().stickLength * Math.sin(newStick.rotation);
        bNew = -gameArea().stickLength * Math.cos(newStick.rotation);
    }
    else // NINETY_DEG <= newStick.rotation <= ONE_SEVEN_FIVE_DEG
    {
        const newRotationMinusNinetyDeg = newStick.rotation - NINETY_DEG;

        aNew = gameArea().stickLength * Math.cos(newRotationMinusNinetyDeg);
        bNew = gameArea().stickLength * Math.sin(newRotationMinusNinetyDeg);
    }

    newStick.x = oldStick.x + oldStick.propAlongStickLengthToCrossNext * aOld
                    + newStick.propAlongStickLengthToCrossPrevious * aNew;

    newStick.y = oldStick.y + oldStick.propAlongStickLengthToCrossNext * bOld
                    + newStick.propAlongStickLengthToCrossPrevious * bNew;

    const stickTopX = newStick.x - newStick.propAlongStickLengthToCrossNext * aNew,
        stickTopY = newStick.y - newStick.propAlongStickLengthToCrossNext * bNew;

    return forceStickWithinBounds(newStick, stickTopX, stickTopY);
}

function forceStickWithinBounds(newStick, stickTopX, stickTopY) {
    // If new stick end exceeds any of the game area bound edges,
    // set its crossing point for the next stick to be the same as
    // the point at which it is crossing the stick laid prior to it
    if ((stickTopY < (gameArea().gameAreaBounds.top + gameArea().stickLength))
        || (stickTopY > (gameArea().gameAreaBounds.bottom - gameArea().stickLength))
        || (stickTopX < (gameArea().gameAreaBounds.left + gameArea().stickLength))
        || (stickTopX > (gameArea().gameAreaBounds.right - gameArea().stickLength))) {
        newStick.propAlongStickLengthToCrossNext =
            newStick.propAlongStickLengthToCrossPrevious;
    }

    return newStick;
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
    if (!$('#pauseScreen').is(":visible")) {
        event.data.timer.pause();
        makePauseScreenElementActive('#pausedText');
    }
    else {
        $('#pauseScreen').toggle(false);
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