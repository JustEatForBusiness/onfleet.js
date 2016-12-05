const sinon = require('sinon');
const expect = require('chai').expect;
const Client = require('../lib/onfleet/client');
const Workers = require('../lib/onfleet/workers');
const moment = require('moment');
require('sinon-as-promised');

describe('onfleet.workers', () => {

    beforeEach(() => {
        this.client = new Client('key', 'testUrl');
        this.underTest = new Workers(this.client);
    });

    it('should call correct url when getting worker', () => {
        let stub = sinon.stub(this.client, 'get').withArgs('/workers/testId').resolves();
        return this.underTest.get('testId').then(() => {
            expect(stub.calledOnce).to.be.true;
        })
    });

    it('should throw error when given no id', () => {
        expect(this.underTest.get).to.throw();
    });

    it('should call correct url when getting all workers', () => {
        let stub = sinon.stub(this.client, 'get').withArgs('/workers').resolves();
        return this.underTest.all().then(() => {
            expect(stub.calledOnce).to.be.true;
        });
    })
});
