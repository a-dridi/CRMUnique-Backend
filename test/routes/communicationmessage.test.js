process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const CommunicationMessage = require("../../src/model/communication-message");
const CommunicationType = require("../../src/model/communication-type");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const serverApp = require("../../src/app")
chai.use(chaiHttp);

describe("# CommunicationMessages API Tests", () => {
    beforeEach((done) => {
        CommunicationMessage.remove({}, (err) => {
            done();
        });
    });

    // New CommunicationMessage - POST
    describe('## /communicationmessage (POST) - Create CommunicationMessage', () => {
        it('Should create new CommunicationMessage with all the passed data', (done) => {
            let message = "This is a message";
            let tag1 = "Tag 1";
            let tag2 = "Tag 2";
            let tag3 = "Tag 3";
            let tag4 = "Tag 4";
            let tag5 = "Tag 5";

            let newCommunicationType = new CommunicationType({
                title: "Email",
                colorHex: "#cccccc"
            });
            let customerId = "212313";

            newCommunicationType.save()
                .then(savedCommunicationType => {
                    chai.request(serverApp)
                        .post('/data/communicationMessage/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            customerId: customerId,
                            communicationType: savedCommunicationType.title,
                            message: message,
                            tag1: tag1,
                            tag2: tag2,
                            tag3: tag3,
                            tag4: tag4,
                            tag5: tag5,
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.message.should.be.eql(message)
                            res.body.tag1.should.be.eql(tag1);
                            res.body.tag2.should.be.eql(tag2);
                            res.body.tag3.should.be.eql(tag3);
                            res.body.tag4.should.be.eql(tag4);
                            res.body.tag5.should.be.eql(tag5);
                            should.exist(res.body._id);
                            done();
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

    //Get CommunicationMessage by id - GET
    describe('## /communicationmessage (GET) - Get CommunicationMessage by id', () => {
        it('Should get CommunicationMessage by the id ', (done) => {
            let message = "This is a message";
            let tag1 = "Tag 1";
            let tag2 = "Tag 2";
            let tag3 = "Tag 3";
            let tag4 = "Tag 4";
            let tag5 = "Tag 5";

            let newCommunicationType = new CommunicationType({
                title: "Email",
                colorHex: "#cccccc"
            });
            let customerId = "212313";

            newCommunicationType.save()
                .then(savedCommunicationType => {
                    chai.request(serverApp)
                        .post('/data/communicationMessage/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            customerId: customerId,
                            communicationType: savedCommunicationType.title,
                            message: message,
                            tag1: tag1,
                            tag2: tag2,
                            tag3: tag3,
                            tag4: tag4,
                            tag5: tag5,
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/communicationMessage/get/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.message.should.be.eql(message);
                                    should.exist(res.body._id);
                                    done();
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

    //Delete CommunicationMessage by id - GET
    describe('## /communicationmessage (GET) - Delete CommunicationMessage by id', () => {
        it('Should delete CommunicationMessage by the id ', (done) => {
            let message = "This is a message";
            let tag1 = "Tag 1";
            let tag2 = "Tag 2";
            let tag3 = "Tag 3";
            let tag4 = "Tag 4";
            let tag5 = "Tag 5";

            let newCommunicationType = new CommunicationType({
                title: "Email",
                colorHex: "#cccccc"
            });
            let customerId = "212313";

            newCommunicationType.save()
                .then(savedCommunicationType => {
                    chai.request(serverApp)
                        .post('/data/communicationMessage/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            customerId: customerId,
                            communicationType: savedCommunicationType.title,
                            message: message,
                            tag1: tag1,
                            tag2: tag2,
                            tag3: tag3,
                            tag4: tag4,
                            tag5: tag5,
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/communicationMessage/delete/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    done();
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

    //Get All CommunicationMessage - GET
    describe('## /communicationmessage (GET) - Get All CommunicationMessage', () => {
        it('Should get All CommunicationMessage ', (done) => {
            let message = "This is a message";
            let tag1 = "Tag 1";
            let tag2 = "Tag 2";
            let tag3 = "Tag 3";
            let tag4 = "Tag 4";
            let tag5 = "Tag 5";

            let newCommunicationType = new CommunicationType({
                title: "Email",
                colorHex: "#cccccc"
            });
            let customerId = "212313";

            let savedCommunicationTypeId = "";
            newCommunicationType.save()
                .then(savedCommunicationType => {
                    savedCommunicationTypeId = savedCommunicationType.title;
                    chai.request(serverApp)
                        .post('/data/communicationMessage/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            customerId: customerId,
                            communicationType: savedCommunicationTypeId,
                            message: message,
                            tag1: tag1,
                            tag2: tag2,
                            tag3: tag3,
                            tag4: tag4,
                            tag5: tag5,
                        })
                        .end((err, res) => {
                            message = "Message 2";
                            chai.request(serverApp)
                                .post('/data/communicationMessage/add')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .send({
                                    customerId: customerId,
                                    communicationType: savedCommunicationTypeId,
                                    message: message,
                                    tag1: tag1,
                                    tag2: tag2,
                                    tag3: tag3,
                                    tag4: tag4,
                                    tag5: tag5,
                                })
                                .end((err, res) => {
                                    chai.request(serverApp)
                                        .get('/data/communicationMessage/all/'+customerId)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.be.a('array');
                                            res.body.should.have.lengthOf(2);
                                            done();
                                        });
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

    //Update one CommunicationMessage - POST
    describe('## /communicationmessage (POST) - Update One CommunicationMessage', () => {
        it('Should Update A CommunicationMessage ', (done) => {
            let message = "This is a message";
            let tag1 = "Tag 1";
            let tag2 = "Tag 2";
            let tag3 = "Tag 3";
            let tag4 = "Tag 4";
            let tag5 = "Tag 5";

            let newCommunicationType = new CommunicationType({
                title: "Email",
                colorHex: "#cccccc"
            });
            let customerId = "212313";

            let savedCommunicationTypeId = "";
            newCommunicationType.save()
                .then(savedCommunicationType => {
                    savedCommunicationTypeId = savedCommunicationType.title;
                    chai.request(serverApp)
                        .post('/data/communicationMessage/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            customerId: customerId,
                            communicationType: savedCommunicationTypeId,
                            message: message,
                            tag1: tag1,
                            tag2: tag2,
                            tag3: tag3,
                            tag4: tag4,
                            tag5: tag5,
                        })
                        .end((err, res) => {
                            message = "This is an updated message";
                            chai.request(serverApp)
                                .post('/data/communicationMessage/update')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .send({
                                    customerId: customerId,
                                    communicationType: savedCommunicationTypeId,
                                    message: message,
                                    tag1: tag1,
                                    tag2: tag2,
                                    tag3: tag3,
                                    tag4: tag4,
                                    tag5: tag5,
                                })
                                .end((err, res) => {
                                    const createdId = res.body._id;
                                    chai.request(serverApp)
                                        .get('/data/communicationMessage/get/byId/' + createdId)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.message.should.be.eql(message);
                                            done();
                                        });
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

});