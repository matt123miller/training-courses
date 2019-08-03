const chai = require('chai');
const expect = chai.expect;

const logic = require('./lib');

describe('The functionality for the /example route', () => {
    describe('lib file', () => {
        context('appendNames function', () => {
            it('should add 2 names, with a space in the middle', () => {
                expect(logic.appendNames('matt', 'miller')).to.equal('matt miller');
            })
        })
    })
})
