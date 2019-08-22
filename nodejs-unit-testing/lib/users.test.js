const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

const mongoose = require('mongoose');

let users = rewire('./users');
let User = require('./models/user');
let mailer = require('./mailer');

let sandbox = sinon.createSandbox();

describe('users', () => {
    let findStub;
    let deleteStub;
    let mailerStub;
    let sampleArgs;
    let sampleUser;

    beforeEach(() => {
        sampleUser = {
            id: 123,
            name: 'Matt',
            email: 'matt@simpleclick.com',
            save: sandbox.stub().resolves()
        };

        findStub = sandbox.stub(mongoose.Model, 'findById').resolves(sampleUser);
        deleteStub = sandbox.stub(mongoose.Model, 'remove').resolves('fake_remove');
        mailerStub = sandbox.stub(mailer, 'sendWelcomeEmail').resolves('email sent');
    });

    after(() => {
        sandbox.restore();
        users = rewire('./users');
    });

    context('get', () => {
        it('should fail to find user', (done) => {
            users.get(null, (err, res) => {
                expect(err).to.exist;
                expect(err.message).to.equal('Invalid user id');
                done();
            })
        });

        it('should call findUserById with id and return result', (done) => {
            sandbox.restore();
            let stub = sandbox.stub(mongoose.Model, 'findById').yields(null, { name: 'Matt' });

            users.get(123, (err, result) => {
                expect(err).to.not.exist;
                expect(stub).to.have.been.calledOnce;
                expect(stub).to.have.been.calledWith(123);
                expect(result).to.be.a('object');
                expect(result).to.have.property('name').to.equal('Matt');

                done();
            })
        });


        it('should catch an error if there is one', (done) => {
            sandbox.restore();
            let stub = sandbox.stub(mongoose.Model, 'findById').yields(new Error('fake'))

            users.get(123, (err, result) => {

                expect(result).to.not.exist;
                expect(err).to.exist;
                expect(err).to.be.instanceOf(Error);
                expect(stub).to.have.been.calledWith(123);
                expect(err.message).to.equal('fake');

                done();
            })
        });
    });


    context('create user', () => {
        it('should reject invalid args', async () => {
            await expect(users.create()).to.eventually.be.rejectedWith('Invalid arguments');
            await expect(users.create({ name: 'without email' })).to.eventually.be.rejectedWith('Invalid arguments');
            await expect(users.create({ email: 'without@name.com' })).to.eventually.be.rejectedWith('Invalid arguments');
        });

        it('should create a user', async () => {
            // await expect(users.create({name: 'Matt', email:'without@name.com'})).to.eventually.r
        })
    });

    context('delete user', () => {
        it('should check for an id, returning an error when none provided', () => {

            return users.delete()
                .then(result => {
                    throw new Error('unexpected success');
                })
                .catch(err => {
                    expect(err).to.exist;
                    expect(err).to.be.instanceOf(Error);
                    expect(err.message).to.not.equal('unexpected success');
                    expect(err.message).to.equal('Invalid id');
                })
        });

        it('should check for error using eventually plugin', () => {

            return expect(users.delete()).to.eventually.be.rejectedWith('Invalid id');
        });


        it('should internally call User.Remove', async () => {

            const result = await users.delete(123);

            // Because users.delete internally calls mongoose.Model.Remove which we've stubbed
            // Our stub returns 'fake_remove' instead of actually impacting the database
            expect(result).to.equal('fake_remove');
            // We want to check if the id we supplied is correctly pass to the .remove() function
            // The stub we wrote that replaces .remove() will track it's interactions
            expect(deleteStub).to.have.been.calledWith({ _id: 123 });
        });
    });

    context('create user ', () => {

        let FakeUserClass, saveStub, result;

        beforeEach(async () => {
            // Create a stub that, when called, will only return the supplied sample data
            saveStub = sandbox.stub().resolves(sampleUser);
            // Because we're testing the users.create() function which internally calls the User class save() function
            // we need to somehow stub that to fake the behaviour. This is so that we're not actually hitting the DB
            // or any other concrete implementation of things that will have changes reaching beyond our tests.
            // Tests should be self contained and not impact external state in any way. Ideally shouldn't rely
            // on external state either. Hence all the stubbing to create fake objects.
            FakeUserClass = sandbox.stub().returns({ save: saveStub });

            // __set__() is a function from rewire. 'User' will replace the reference to the User class 
            // reference created at the top of the file (const User = require('./models/user');) with our fake one.
            // This means that we can control exactly what the class does while under test, faking the bits we care about.
            // We don't even need to implement/fake the rest of the class in this test context, this context only cares about
            // the save function. In other test contexts we'd fake other functions, ignoring the save function. In this
            // way we can compartmentalise our tests and be specific in what we test.
            users.__set__('User', FakeUserClass);

            // A shortcut so we don't need to do this in each test. In the current example all tests are performing
            // the same users.create calls anyway.
            result = await users.create(sampleUser);
        });

        it('should reject invalid args', () => {

            expect(users.create()).to.eventually.be.rejectedWith('Invalid arguments');
            expect(users.create({ email: 'a@b.com' })).to.eventually.be.rejectedWith('Invalid arguments');
            expect(users.create({ name: 'matt' })).to.eventually.be.rejectedWith('Invalid arguments');
        });

        it('should call User with new keyword', () => {
            expect(FakeUserClass).to.have.been.calledWithNew;
            expect(FakeUserClass).to.have.been.calledWith(sampleUser);
        });

        it('should save the user', () => {
            // I don't need to test the output of the internal save call, just know that it gets called.
            // Another test would check the save call.
            expect(saveStub).to.have.been.called;
        });

        it('should call mailer with email and name', () => {
            // testing the stubbed mailer that is called inside of users.create.
            // We're not concerned with it's result here, only that it gets called.
            // A different test file will be made specifically for the mailer.
            expect(mailerStub).to.have.been.calledWith(sampleUser.email, sampleUser.name)
        });

        it('should reject errors', async () => {
            // We only want to test that users.create will throw and error properly when the save fails.
            // So we can replace the save stub here and have it only reject with an error.
            saveStub.rejects(new Error('fake'));
            // Then we test that users.create will proeprly throw an error to be handled in calling code 
            await expect(users.create(sampleUser)).to.eventually.be.rejectedWith('fake');
        });

    });

    context('update user', () => {

        it('should call findById', async () => {
            await users.update(123, { age: 35 });

            expect(findStub).to.have.been.calledOnce;
            expect(findStub).to.have.been.calledWith(123);
        });

        it('should call user.save', async () => {
            await users.update(123, { age: 35 });

            expect(sampleUser.save).to.have.been.calledOnce;
        });

        it('should reject errors', () => {
            findStub.throws(new Error('fake'))

            expect(users.update(123, { age: 35 })).to.eventually.be.rejectedWith('fake');
        });
    });

    context('reset password', () => {
        
        let resetStub;

        beforeEach(() => {
            resetStub = sandbox.stub(mailer, 'sendPasswordResetEmail').resolves('reset');
        });
        
        it('should check for email field', async () => {
            
            await expect( users.resetPassword()).to.eventually.be.rejectedWith('Invalid email');
        });

        it('should send a password reset email', async () => {
            const result = await users.resetPassword('a@b.com');

            expect(result).to.equal('reset')
            expect(resetStub).to.have.been.calledOnce;
            expect(resetStub).to.have.been.calledWith('a@b.com')
        })
    });
});