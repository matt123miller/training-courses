const chai = require('chai');
const expect = chai.expect;

describe('arbitrary nesting file', () => {
    describe('level 1', () => {
        describe('level 2', () => {
            describe('level 3', () => {
                describe('level 4', () => {
                    describe('level 5', () => {
                        context('arbitrary nesting!', () => {
                            it('should be able to nest this deep', (done) => {
                                done();
                            })
                            it('should nest a pending test this deep')
                        })
                    })

                    context('arbitrary nesting!', () => {
                        it('should be able to nest this deep', (done) => {
                            done();
                        })
                        it('should nest a pending test this deep')
                    })
                })
            })

            context('arbitrary nesting!', () => {
                it('should be able to nest this deep', (done) => {
                    done();
                })
                it('should nest a pending test this deep')
            })
        })
    })
})