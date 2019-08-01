const chai = require('chai');
const expect = chai.expect;

var demo = require('./demo');

describe('demo', () => {
    context('add', () => {
        it('test the add', () => {
            expect(demo.add(1,2)).to.equal(3);
        });
        it('with 1 negative number', () => {
            expect(demo.add(1, -2)).to.equal(-1);
        });
        it('with 2 negative number2', () => {
            expect(demo.add(-5, -2)).to.equal(-7);
        });
    });

    context('callback add', () => {
        it('should test the add with callback', (done) => {
            demo.addCallback(3,5, (err, res) => {
                expect(err).to.not.exist;
                expect(res).to.equal(8);
                done();
            })
        });
    });

    context('test promise', () => {
        it('should add the promise', (done) => {
            demo.addPromise(5,6).then(res =>{

                expect(res).to.equal(11);
                done();
            });
        });

        it('should add with a waiting promise', (done) => {
            console.log('about to being waiting');
            demo.addWaitingPromise(4,8)
                .then(res => {
                    console.log('ended waiting');
                    expect(res).to.equal(12);
                    done();
                })
                .catch(err => {
                    console.log('there was an error :(');
                    done(err);
                });
        });
    });

});