const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

let sandbox = sinon.createSandbox();

// Even though these objects will get altered by stubbing and whatnot you can still use const
// because you're not reassigning the variables with different objects.
// Just thought it was worth trying to further my understanding of the mechanics
const crypto = require('crypto');
const config = require('./config');
const utils = require('./utils');

describe('utils', () => {
    let secretStub, digestStub, updateStub, createHashStub, hash;

    beforeEach(() => {
        secretStub = sandbox.stub(config, 'secret').returns('fake_secret');
        digestStub = sandbox.stub().returns('ABC123');
        updateStub = sandbox.stub().returns({
            digest: digestStub
        });
        createHashStub = sandbox.stub(crypto, 'createHash').returns({
            update: updateStub
        });
    })

    afterEach(() => {
        sandbox.restore();
    })

    context('getHash', () => {
        it('should call all the stubs', () => {
            hash = utils.getHash('abc');

            expect(digestStub).to.have.been.calledOnce;
            expect(updateStub).to.have.been.calledOnce;
            expect(createHashStub).to.have.been.calledOnce;
        });

        it('should call update with the correctly composed string', () => {

            hash = utils.getHash('abc');

            expect(updateStub).to.have.been.calledWith('abc_fake_secret');
        });

        it('should use md5 hashing', () => {
            hash = utils.getHash('abc');
            
            expect(createHashStub).to.have.been.calledWith('md5');
        });

        it('should return a hexed hash', () => {
            hash = utils.getHash('abc');

            expect(digestStub).to.have.been.calledWith('hex');
        })

        it('should return a correct result', () => {
            // Maybe in real testing you'd validate your supplied string by unhashing the result
            // then compare the values? For now I can only test that the stub work correctly.

            hash = utils.getHash('abc');
        
            expect(hash).to.exist;
            expect(hash).to.equal('ABC123');
        });

        it('should return null with invalid input', () => {

            // Only a string should pass 
            expect(utils.getHash()).to.be.null;
            expect(utils.getHash(123)).to.be.null;
            expect(utils.getHash({ key: 'value' })).to.be.null;
            expect(utils.getHash(null)).to.be.null;
            expect(utils.getHash(undefined)).to.be.null;
            expect(utils.getHash('')).to.be.null; // empty string is falsey
            expect(utils.getHash(new String('abc'))).to.be.null; // the string constructor returns an object

        })

    });
});