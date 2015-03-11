define(['../js/timer.js', 'jquery', '../lib/d3/d3.min.js'], function (timer, $) {
    return function () {

        var globalTimer = timer;
        var gameLevel = 1;

        //override timer's OnFinish method
        globalTimer.OnFinish = loseGame;

        var stickColors = ["#3cb371", "#cd5c5c", "#f0e68c", "#9370db", "#afeeee"];

        var fiveDeg = Math.PI / 36;
        var oneSevenFiveDeg = fiveDeg * 35;
        var ninetyDeg = fiveDeg * 18;
        var tenDeg = fiveDeg * 2;

        var lowCrossingLimit = 0.1;
        var highCrossingLimit = 0.9;

        $('#restartButton').bind('click', restartGame);

        // Primitive 'debounce' to stop restartGame being called
        // every time up/down spinner pressed
        var windowTimeOut;
        $('#levelNumericControl').change(function() {
            clearTimeout(windowTimeOut);
            windowTimeOut = setTimeout(function() {
                if($('#levelNumericControl').val() != gameLevel){
                            restartGame();
                }
            }, 200);
        });

        restartGame();

        function restartGame() {

            globalTimer.Reset();
            makePauseScreenElementActive('#startText');

            if (!$('#levelNumericControl')[0].checkValidity()) {
                disablePlayPauseButton();

                // Trick to make the browser display native HTML5 error
                // for the selected level number
                $('#gameLevelForm').find(':submit').click();
            }
            else {
                enablePlayPauseButton();
                refresh();
            }
        }

        function makePauseScreenElementActive(element) {
            $("#pauseScreenText > span").addClass('notActive').removeClass('active');
            $(element).removeClass('notActive').addClass('active');
            $('#pauseScreen').toggle(true);
        }

        function refresh() {
            d3.select("svg").remove();

            gameLevel = $('#levelNumericControl').val();
            var finalStickIndex = gameLevel - 1;
            var dataSet = [];

            var gameAreaBounds = $('#gameArea')[0].getBoundingClientRect();

            var gameAreaMiddle = [(gameAreaBounds.right - gameAreaBounds.left) / 2,
                (gameAreaBounds.bottom - gameAreaBounds.top) / 2];

            var stickLength = gameAreaBounds.height / 3.5;

            var proposedStickWidth = stickLength / 16;
            var stickWidth = proposedStickWidth > 12 ? proposedStickWidth : 12;

            var strokeLength = stickLength + stickWidth;
            var strokeDashArray = strokeLength + ","
                + strokeLength;
            var strokeWidth = stickWidth / 5;

            for (var i = 0; i < gameLevel; i++) {
                var newStick, oldStick
                var s = getRandomNumberInRange(lowCrossingLimit, highCrossingLimit);
                var t = getRandomNumberInRange(lowCrossingLimit, highCrossingLimit);

                if (i !== 0) {
                    var rotation = newStickNotNearParallelLast(dataSet[(i - 1)].rotation);
                    oldStick = dataSet[(i - 1)];
                }
                else {
                    var rotation = getRandomNumberInRange(fiveDeg, oneSevenFiveDeg);

                    // To place first stick, first calculating the position of a dummy old stick
                    // in the centre of the game area in order to lessen chance of t being quickly out
                    // of range for subsequent sticks
                    var x = gameAreaMiddle[0] + stickLength / 2;
                    var y = gameAreaMiddle[1];

                    oldStick = new sticky(0.5, 0.5, ninetyDeg, stickColors[getRandomIntInRange(0, 4)], x, y);
                }

                newStick = generateNewStickXY(oldStick, new sticky(s, t, rotation, stickColors[getRandomIntInRange(0, 4)]));
                dataSet.push(newStick);
            }

            var svg = d3.select("#gameArea")
                .append("svg")
                .attr("width", gameAreaBounds.width)
                .attr("height", gameAreaBounds.height);

            update();

            function sticky(s, t, rotation, color, x, y) {
                // proportion along stick length at which to cross previous stick
                this.propAlongStickLengthToCrossPrevious = s;

                //proportion along stick length at which next stick should cross
                this.propAlongStickLengthToCrossNext = t;

                this.rotation = rotation;
                this.color = color;

                this.x = x;
                this.y = y;
            }

            function update() {
                var rectangles = svg.selectAll("rect")
                    .data(dataSet);

                rectangles.enter().append("rect");

                rectangles.exit().remove();

                rectangles.attr("x", function (d, i) {
                    return d.x;
                })
                    .attr("y", function (d, i) {
                        return d.y;
                    })
                    .attr("width", stickWidth)
                    .attr("height", stickLength)
                    .attr("transform", function (d) {
                        return 'rotate('
                            + (d.rotation * (180 / Math.PI)) + ' '
                            + d.x + ' ' + d.y + ')';
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", strokeWidth)
                    .attr("stroke-dasharray", strokeDashArray)
                    .attr("fill", function (d) {
                        return d.color;
                    })
                    .on("click", function (d, i) {
                        removeIfLast(i);
                        update();
                    });
            }

            function removeIfLast(index) {
                if (index === finalStickIndex) {
                    dataSet.pop();
                    finalStickIndex--;

                    if (finalStickIndex === -1) {
                        winGame();
                    }
                }
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
                var newRotation = getRandomNumberInRange(fiveDeg, oneSevenFiveDeg);

                var lowerBound = (lastRot - tenDeg);
                var upperBound = (lastRot + tenDeg);

                if (isInRange(newRotation, lowerBound, upperBound)) {
                    return newStickNotNearParallelLast(lastRot);
                }
                else {
                    return newRotation;
                }
            }

            function generateNewStickXY(oldStick, newStick) {
                var aOld, bOld, aNew, bNew;

                if (isInRange(oldStick.rotation, fiveDeg, ninetyDeg)) {
                    aOld = -(stickLength * Math.sin(oldStick.rotation));
                    bOld = (stickLength * Math.cos(oldStick.rotation));
                }
                else // ninetyDeg <= oldStick.rotation <= oneSevenFiveDeg
                {
                    var oldRotationMinusNinetyDeg = oldStick.rotation - ninetyDeg;

                    aOld = -(stickLength * Math.cos(oldRotationMinusNinetyDeg));
                    bOld = -(stickLength * Math.sin(oldRotationMinusNinetyDeg));
                }

                if (isInRange(newStick.rotation, fiveDeg, ninetyDeg)) {
                    aNew = stickLength * Math.sin(newStick.rotation);
                    bNew = -stickLength * Math.cos(newStick.rotation);
                }
                else // ninetyDeg <= newStick.rotation <= oneSevenFiveDeg
                {
                    var newRotationMinusNinetyDeg = newStick.rotation - ninetyDeg;

                    aNew = stickLength * Math.cos(newRotationMinusNinetyDeg);
                    bNew = stickLength * Math.sin(newRotationMinusNinetyDeg);
                }

                newStick.x = oldStick.x + oldStick.propAlongStickLengthToCrossNext * aOld
                + newStick.propAlongStickLengthToCrossPrevious * aNew;

                newStick.y = oldStick.y + oldStick.propAlongStickLengthToCrossNext * bOld
                + newStick.propAlongStickLengthToCrossPrevious * bNew;

                var stickTopX = newStick.x - newStick.propAlongStickLengthToCrossNext * aNew;
                var stickTopY = newStick.y - newStick.propAlongStickLengthToCrossNext * bNew;

                return forceStickWithinBounds(newStick, stickTopX, stickTopY);
            }

            function forceStickWithinBounds(newStick, stickTopX, stickTopY) {
                // If new stick end exceeds any of the game area bound edges,
                // set its crossing point for the next stick to be the same as
                // the point at which it is crossing the stick laid prior to it
                if ((stickTopY < (gameAreaBounds.top + stickLength))
                    || (stickTopY > (gameAreaBounds.bottom - stickLength))
                    || (stickTopX < (gameAreaBounds.left + stickLength))
                    || (stickTopX > (gameAreaBounds.right - stickLength))) {
                    newStick.propAlongStickLengthToCrossNext =
                        newStick.propAlongStickLengthToCrossPrevious;
                }

                return newStick;
            }
        }

        function disablePlayPauseButton() {
            $('#playPauseButton')
                .addClass("disabled")
                .removeClass("enabled")
                .unbind('click', playPause);
        }

        function enablePlayPauseButton() {
            $('#playPauseButton')
                .removeClass("disabled")
                .addClass("enabled")
                .unbind('click', playPause).bind('click', playPause);
        }

        function playPause() {
            if (!$('#pauseScreen').is(":visible")) {
                globalTimer.Stop();
                makePauseScreenElementActive('#pausedText');
            }
            else {
                $('#pauseScreen').toggle(false);
                globalTimer.Start();
            }
        }

        function winGame() {
            globalTimer.Stop();
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
    };
});