import { assert, expect } from 'chai';
import GameArea from '../../classes/GameArea';
import * as stickLayerOuter from '../../classes/stickLayerOuter';
import Stick from '../../classes/stick';

describe('stickLayerOuter', () => {
    describe('calculateSticks', () => {
        let elementMock;

        beforeEach(() => {
            elementMock = {
                getBoundingClientRect: () => {
                    return {
                        width: 800,
                        height: 600,
                        top: 0,
                        right: 800,
                        bottom: 600,
                        left: 0
                    };
                }
            };
        });

        it('should return 1 stick for game level 1', () => {
            const result = stickLayerOuter.calculateSticks(1, new GameArea(elementMock));

            expect(result).to.have.lengthOf(1);
            assert.isTrue(hasSameProps(result[0], new Stick()));
        });

        it('should return 999 sticks for game level 999', () => {
            const result = stickLayerOuter.calculateSticks(999, new GameArea(elementMock));

            xpect(result).to.have.lengthOf(999);
            assert.isTrue(hasSameProps(result[998], new Stick()));
        });
    });
});

function hasSameProps( obj1, obj2 ) {
    return Object.keys( obj1 ).every( function( prop ) {
        return obj2.hasOwnProperty( prop );
    });
}
