const assert = require('assert');

describe('file to test', (params) => {
    context('function to test', (params) => {
        it('should do this specific thing',(done) => {
            assert.equal(1,1);

            // You need to call done at the end of each test :(
            done();
        });

        it('will be written later');
    });
});
