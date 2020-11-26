const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

let sandbox = sinon.createSandbox();

let mailer = rewire('./mailer');

describe('mailer', () => {

    afterEach(() => {
        mailer = rewire('./mailer');
        sandbox.restore();
    });


    context('sendWelcomeEmail', () => {
        it('should throw error with invalid args', async () => {

            expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith('Invalid input')
            expect(mailer.sendWelcomeEmail('only 1 argument')).to.eventually.be.rejectedWith('Invalid input')
        });

        it('should return a promise, whether it fails or not.', () => {

            expect(mailer.sendWelcomeEmail()).is.instanceOf(Promise);
            expect(mailer.sendWelcomeEmail('a@b.com', 'email body')).is.instanceOf(Promise);
        });

        it('Should send an email', async () => {

            let sendEmailStub = sandbox.stub().resolves('fake email sent');
            // Replace the private sendEmail function with our stub
            mailer.__set__('sendEmail', sendEmailStub);

            await mailer.sendWelcomeEmail('a@b.com', 'Matt');
            expect(sendEmailStub).to.have.been.calledOnce;
            expect(sendEmailStub).to.have.been.calledWith('a@b.com', `Dear Matt, welcome to our family!`);

            await expect(mailer.sendWelcomeEmail('a@b.com', 'email body')).to.eventually.equal('fake email sent')
        });
    });


    context('sendPasswordResetEmail', () => {

        // Basically the same as sendWelcome email
        it('should throw error with invalid args', async () => {

            expect(mailer.sendPasswordResetEmail()).to.eventually.be.rejectedWith('Invalid input');
        });

        it('should return a promise, whether it fails or not.', () => {

            expect(mailer.sendPasswordResetEmail()).is.instanceOf(Promise);
            expect(mailer.sendPasswordResetEmail('a@b.com')).is.instanceOf(Promise);
        });

        it('Should send an email', async () => {

            let sendEmailStub = sandbox.stub().resolves('fake email sent');
            // Replace the private sendEmail function with our stub
            mailer.__set__('sendEmail', sendEmailStub);

            await mailer.sendPasswordResetEmail('a@b.com');
            expect(sendEmailStub).to.have.been.calledOnce;
            expect(sendEmailStub).to.have.been.calledWith('a@b.com', 'Please click http://some_link to reset your password.');

            await expect(mailer.sendPasswordResetEmail('a@b.com')).to.eventually.equal('fake email sent')
        });
    });


    context('sendEmail', () => {

        // have to get the internal private function using rewire and call that instead.
        // then test normally.
        let sendEmail;

        beforeEach(() => {
            mailer = rewire('./mailer');
            sendEmail = mailer.__get__('sendEmail');
            // My intellisense will even know that sendEmail is a function accepting 2 arguments and rteturns a promise.
            // Magic!
        })

        it('Should send properly', () => {

            expect(sendEmail('a@b.com', 'body')).to.eventually.equal('Email sent')
        });
    });
});


