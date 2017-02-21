import Stick from './stick';

const LOW_CROSSING_LIMIT = 0.1;
const HIGH_CROSSING_LIMIT = 0.9;
const STICK_COLORS = ["#3cb371", "#cd5c5c", "#f0e68c", "#9370db", "#afeeee"];
const FIVE_DEG = Math.PI / 36;
const ONE_SEVEN_FIVE_DEG = FIVE_DEG * 35;
const NINETY_DEG = FIVE_DEG * 18;
const TEN_DEG = FIVE_DEG * 2;

export function calculateSticks(gameLevel, gameArea) {
    let dataSet = [],
        rotation = 0;

    for (var i = 0; i < gameLevel; i++) {
        let newStick, oldStick;
        const s = _getRandomNumberInRange(LOW_CROSSING_LIMIT, HIGH_CROSSING_LIMIT);
        const t = _getRandomNumberInRange(LOW_CROSSING_LIMIT, HIGH_CROSSING_LIMIT);

        if (i !== 0) {
            oldStick = dataSet[(i - 1)];
            rotation = _newStickNotNearParallelLast(dataSet[(i - 1)].rotation);
        }
        else {
            // To place first stick, first calculate the position of a dummy old stick
            // in the centre of the game area in order to lessen chance of it being quickly out
            // of range for subsequent sticks
            var x = gameArea.gameAreaMiddle[0] + gameArea.stickLength / 2;
            var y = gameArea.gameAreaMiddle[1];

            oldStick = new Stick(0.5, 0.5, NINETY_DEG, STICK_COLORS[_getRandomIntInRange(0, 4)], x, y);
            rotation = _getRandomNumberInRange(FIVE_DEG, ONE_SEVEN_FIVE_DEG);
        }

        newStick = generateNewStickXY(
            oldStick,
            new Stick(s, t, rotation, STICK_COLORS[_getRandomIntInRange(0, 4)]),
            gameArea
        );
        dataSet.push(newStick);
    }
    return dataSet;
}

function _getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function _getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function _isInRange(x, min, max) {
    return (x >= min && x < max);
}

function _newStickNotNearParallelLast(lastRot) {
    const newRotation = _getRandomNumberInRange(FIVE_DEG, ONE_SEVEN_FIVE_DEG),
        lowerBound = (lastRot - TEN_DEG),
        upperBound = (lastRot + TEN_DEG);

    if (_isInRange(newRotation, lowerBound, upperBound)) {
        return _newStickNotNearParallelLast(lastRot);
    }
    else {
        return newRotation;
    }
}

function generateNewStickXY(oldStick, newStick, gameArea) {
    let aOld, bOld, aNew, bNew;

    if (_isInRange(oldStick.rotation, FIVE_DEG, NINETY_DEG)) {
        aOld = -(gameArea.stickLength * Math.sin(oldStick.rotation));
        bOld = (gameArea.stickLength * Math.cos(oldStick.rotation));
    }
    else // NINETY_DEG <= oldStick.rotation <= ONE_SEVEN_FIVE_DEG
    {
        const oldRotationMinusNinetyDeg = oldStick.rotation - NINETY_DEG;

        aOld = -(gameArea.stickLength * Math.cos(oldRotationMinusNinetyDeg));
        bOld = -(gameArea.stickLength * Math.sin(oldRotationMinusNinetyDeg));
    }

    if (_isInRange(newStick.rotation, FIVE_DEG, NINETY_DEG)) {
        aNew = gameArea.stickLength * Math.sin(newStick.rotation);
        bNew = -gameArea.stickLength * Math.cos(newStick.rotation);
    }
    else // NINETY_DEG <= newStick.rotation <= ONE_SEVEN_FIVE_DEG
    {
        const newRotationMinusNinetyDeg = newStick.rotation - NINETY_DEG;

        aNew = gameArea.stickLength * Math.cos(newRotationMinusNinetyDeg);
        bNew = gameArea.stickLength * Math.sin(newRotationMinusNinetyDeg);
    }

    newStick.x = oldStick.x + oldStick.propAlongStickLengthToCrossNext * aOld
        + newStick.propAlongStickLengthToCrossPrevious * aNew;

    newStick.y = oldStick.y + oldStick.propAlongStickLengthToCrossNext * bOld
        + newStick.propAlongStickLengthToCrossPrevious * bNew;

    const stickTopX = newStick.x - newStick.propAlongStickLengthToCrossNext * aNew,
        stickTopY = newStick.y - newStick.propAlongStickLengthToCrossNext * bNew;

    return _forceStickWithinBounds(newStick, stickTopX, stickTopY, gameArea);
}

function _forceStickWithinBounds(newStick, stickTopX, stickTopY, gameArea) {
    // If new stick end exceeds any of the game area bound edges,
    // set its crossing point for the next stick to be the same as
    // the point at which it is crossing the stick laid prior to it
    if ((stickTopY < (gameArea.gameAreaBounds.top + gameArea.stickLength))
        || (stickTopY > (gameArea.gameAreaBounds.bottom - gameArea.stickLength))
        || (stickTopX < (gameArea.gameAreaBounds.left + gameArea.stickLength))
        || (stickTopX > (gameArea.gameAreaBounds.right - gameArea.stickLength))) {
        newStick.propAlongStickLengthToCrossNext =
            newStick.propAlongStickLengthToCrossPrevious;
    }

    return newStick;
}