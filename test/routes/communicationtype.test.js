process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const CommunicationType = require("../../src/model/communication-type");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const serverApp = require("../../src/app")
chai.use(chaiHttp);

describe("# CommunicationType API Tests", () => {
    beforeEach((done) => {
        CommunicationType.remove({}, (err) => {
            done();
        });
    });

    // New CommunicationType - POST
    describe('## /CommunicationType (POST) - Create CommunicationType', () => {
        it('Should create new CommunicationType with all the passed data', (done) => {
            let title = "E-Mails";
            let colorHex = "#fffff";

            chai.request(serverApp)
                .post('/data/communicationType/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    colorHex: colorHex
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.title.should.be.eql(title)
                    res.body.colorHex.should.be.eql(colorHex);
                    should.exist(res.body._id);
                    done();
                });
        });
    });

    //Get CommunicationType by id - GET
    describe('## /CommunicationType (GET) - Get CommunicationType by id', () => {
        it('Should get CommunicationType by id ', (done) => {
            let title = "E-Mails";
            let colorHex = "#fffff";

            chai.request(serverApp)
                .post('/data/communicationType/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    colorHex: colorHex
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/communicationType/get/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.title.should.be.eql(title);
                            should.exist(res.body._id);
                            done();
                        });
                });
        });
    });

    //Delete CommunicationType by id - GET
    describe('## /CommunicationType (GET) - Delete CommunicationType by id', () => {
        it('Should delete CommunicationType by the id ', (done) => {
            let title = "E-Mails";
            let colorHex = "#fffff";

            chai.request(serverApp)
                .post('/data/communicationType/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    colorHex: colorHex
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .delete('/data/communicationType/delete/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

    });

    //Get All CommunicationType - GET
    describe('## /CommunicationType (GET) - Get All CommunicationType', () => {
        it('Should get All CommunicationType ', (done) => {
            let title = "E-Mails";
            let colorHex = "#fffff";

            chai.request(serverApp)
                .post('/data/communicationType/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    colorHex: colorHex
                })
                .end((err, res) => {
                    title = "SMS";
                    chai.request(serverApp)
                        .post('/data/communicationType/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            title: title,
                            colorHex: colorHex
                        })
                        .end((err, res) => {
                            chai.request(serverApp)
                                .get('/data/communicationType/all')
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.should.have.lengthOf(2);
                                    done();
                                });
                        });
                });
        });
    });

    //Update one CommunicationType - POST
    describe('## /CommunicationType (POST) - Update One CommunicationType', () => {
        it('Should Update A CommunicationType ', (done) => {
            let title = "E-Mails";
            let colorHex = "#fffff";

            chai.request(serverApp)
                .post('/data/communicationType/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    title: title,
                    colorHex: colorHex
                })
                .end((err, res) => {
                    message = "Secured E-Mails";
                    chai.request(serverApp)
                        .post('/data/communicationType/update')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            title: title,
                            colorHex: colorHex
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/communicationType/get/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.title.should.be.eql(title);
                                    done();
                                });
                        });
                });
        });
    });
});