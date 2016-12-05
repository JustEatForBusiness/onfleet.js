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

    it('should call correct url when getting id', () => {
        let stub = sinon.stub(this.client, 'get').withArgs('/tasks/testId').resolves();
        return this.underTest.get('testId').then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should throw error when given no id', () => {
        expect(this.underTest.get).to.throw();
    });

    it('should call correct url when getting all', () => {
        let tstamp = 1480668708000; // 08:52, 2nd December, 2016
        let from = moment(tstamp);
        let stub = sinon.stub(this.client, 'get').withArgs('/tasks/all', {
            from: tstamp
        }).resolves();
        return this.underTest.all(from).then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should correctly include optional to parameter when getting all', () => {
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

    it('should correctly include optional lastId parameter when getting all', () => {
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

    it('should correctly get task by short id', () => {
        let stub = sinon.stub(this.client, 'get').withArgs('/tasks/shortId/testId').resolves();
        return this.underTest.byShortId('testId').then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should correctly get all pages of orders for given day', () => {
        let tstamp = 1480668708000; // 08:52, 2nd December, 2016
        let startTstamp = 1480636800000; // 00:00:00, 2nd December 2016
        let endTstamp = 1480723199999; // 23:59:59, 2nd December 2016
        let givenDate = moment(tstamp);
        let stub = sinon.stub(this.client, 'get');

        stub.withArgs('/tasks/all', {
            from: startTstamp,
            to: endTstamp
        }).resolves({lastId: 'lastId', tasks: [getTask('task1')]});

        stub.withArgs('/tasks/all', {
            from: startTstamp,
            to: endTstamp,
            lastId: 'lastId'
        }).resolves({tasks: [getTask('task2')]});

        return this.underTest.onDay(givenDate).then(tasks => {
            expect(tasks.length).to.equal(2);
            expect(tasks[0].id).to.equal('task1');
            expect(tasks[1].id).to.equal('task2');
        })
    });

    it('should correctly get all pages of orders for today', () => {
        let now = moment();
        let startTstamp = now.clone().startOf('day').valueOf();
        let endTstamp = now.clone().endOf('day').valueOf();

        let stub = sinon.stub(this.client, 'get');

        stub.withArgs('/tasks/all', {
            from: startTstamp,
            to: endTstamp
        }).resolves({lastId: 'lastId', tasks: [getTask('task1')]});

        stub.withArgs('/tasks/all', {
            from: startTstamp,
            to: endTstamp,
            lastId: 'lastId'
        }).resolves({tasks: [getTask('task2')]});

        return this.underTest.today().then(tasks => {
            expect(tasks.length).to.equal(2);
            expect(tasks[0].id).to.equal('task1');
            expect(tasks[1].id).to.equal('task2');
        })
    });

    function getTask(id) {
        return {id: id, completionDetails: {}};
    }
});
