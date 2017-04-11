'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;
const Client = require('../lib/onfleet/client');
const Tasks = require('../lib/onfleet/tasks');
const moment = require('moment');
require('sinon-as-promised');

describe('onfleet.tasks', () => {

    beforeEach(() => {
        this.client = new Client('key', 'testUrl');
        this.underTest = new Tasks(this.client);
    });

    describe('#get()', () => {
        it('should make a GET request to /tasks/testId when getting a task by id', () => {
            let stub = sinon.stub(this.client, 'get').withArgs('/tasks/testId').resolves();
            return this.underTest.get('testId').then(() => {
                expect(stub.calledOnce).to.be.true;
            })
        });

        it('should throw error when given no id', () => {
            expect(this.underTest.get).to.throw();
        });

        it('should perform a GET request to /tasks/all when getting all tasks', () => {
            let tstamp = 1480668708000; // 08:52, 2nd December, 2016
            let from = moment(tstamp);
            let stub = sinon.stub(this.client, 'get').withArgs('/tasks/all', {
                from: tstamp
            }).resolves();
            return this.underTest.all(from).then(() => {
                expect(stub.calledOnce).to.be.true;
            })
        });
    });

    describe('#all()', () => {
        it('should include the optional parameter', () => {
            let fromTstamp = 1480668708000; // 08:52, 2nd December, 2016
            let toTstamp = 1480680000000; // 12:00, 2nd December, 2016
            let from = moment(fromTstamp);
            let to = moment(toTstamp);
            let stub = sinon.stub(this.client, 'get').withArgs('/tasks/all', {
                from: fromTstamp,
                to: toTstamp
            }).resolves();
            return this.underTest.all(from, to).then(() => {
                expect(stub.calledOnce).to.be.true;
            })
        });

        it('should include the optional lastId parameter', () => {
            let tstamp = 1480668708000; // 08:52, 2nd December, 2016
            let from = moment(tstamp);
            let lastId = 'lastId';
            let stub = sinon.stub(this.client, 'get').withArgs('/tasks/all', {
                from: tstamp,
                lastId: 'lastId'
            }).resolves();
            return this.underTest.all(from, null, lastId).then(() => {
                expect(stub.calledOnce).to.be.true;
            })
        });
    });

    describe('#byShortId()', () => {
        it('should make a GET request to /tasks/shortId with the given task id', () => {
            let stub = sinon.stub(this.client, 'get').withArgs('/tasks/shortId/testId').resolves();
            return this.underTest.byShortId('testId').then(() => {
                expect(stub.calledOnce).to.be.true;
            })
        });
    });

    describe('#today()', () => {
        it('should get all tasks for today', () => {
            let stub = sinon.stub(this.client, 'get');
            stub.withArgs('/tasks').resolves([
                getTask('task0', moment('2000-01-01').valueOf()),
                getTask('task1', moment().valueOf()),
                getTask('task2', moment().valueOf())
            ]);

            return this.underTest.today().then(tasks => {
                expect(tasks.length).to.equal(2);
                expect(tasks[0].id).to.equal('task1');
                expect(tasks[1].id).to.equal('task2');
            })
        });

        it('should exclude failed tasks when so instructed', () => {
            let stub = sinon.stub(this.client, 'get');
            stub.withArgs('/tasks').resolves([
                getTask('task0', moment('2000-01-01').valueOf()),
                getTask('task1', moment().valueOf(), false),
                getTask('task2', moment().valueOf())
            ]);

            return this.underTest.today(false).then(tasks => {
                expect(tasks.length).to.equal(1);
                expect(tasks[0].id).to.equal('task2');
            })
        });
    });

    function getTask(id, completeBefore = null, success = true) {
        return {
            id: id,
            completeBefore: completeBefore,
            completionDetails: {
                success: success
            }
        };
    }
});
