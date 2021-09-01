process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const CustomField = require("../../src/model/custom-field");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const serverApp = require("../../src/app")
chai.use(chaiHttp);

describe("# CustomField API Tests", () => {
    beforeEach((done) => {
        CustomField.remove({}, (err) => {
            done();
        });
    });

    // New CustomField - POST
    describe('## /CustomField (POST) - Create CustomField', () => {
        it('Should create new CustomField with all the passed data', (done) => {
            let fieldName = "Instagram";
            let fieldType = "URL";

            chai.request(serverApp)
                .post('/data/customField/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    fieldName: fieldName,
                    fieldType: fieldType
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.fieldName.should.be.eql(fieldName)
                    res.body.fieldType.should.be.eql(fieldType);
                    should.exist(res.body._id);
                    done();
                });
        });
    });

    //Get CustomField by id - GET
    describe('## /CustomField (GET) - Get CustomField by id', () => {
        it('Should get CustomField by id ', (done) => {
            let fieldName = "Instagram";
            let fieldType = "URL";

            chai.request(serverApp)
                .post('/data/customField/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    fieldName: fieldName,
                    fieldType: fieldType
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/customField/get/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.fieldName.should.be.eql(fieldName)
                            should.exist(res.body._id);
                            done();
                        });
                });
        });
    });

    //Delete CustomField by id - GET
    describe('## /CustomField (GET) - Delete CustomField by id', () => {
        it('Should delete CustomField by the id ', (done) => {
            let fieldName = "Instagram";
            let fieldType = "URL";

            chai.request(serverApp)
                .post('/data/customField/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    fieldName: fieldName,
                    fieldType: fieldType
                })
                .end((err, res) => {
                    const createdId = res.body._id;
                    chai.request(serverApp)
                        .get('/data/customField/delete/byId/' + createdId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

    });

    //Get All CustomField - GET
    describe('## /CustomField (GET) - Get All CustomField', () => {
        it('Should get All CustomField ', (done) => {
            let fieldName = "Instagram";
            let fieldType = "URL";

            chai.request(serverApp)
                .post('/data/customField/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    fieldName: fieldName,
                    fieldType: fieldType
                })
                .end((err, res) => {
                    title = "SMS";
                    chai.request(serverApp)
                        .post('/data/customField/add')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            fieldName: fieldName,
                            fieldType: fieldType
                        })
                        .end((err, res) => {
                            chai.request(serverApp)
                                .get('/data/customField/all')
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

    //Update one CustomField - POST
    describe('## /CustomField (POST) - Update One CustomField', () => {
        it('Should Update A CustomField ', (done) => {
            let fieldName = "Instagram";
            let fieldType = "URL";

            chai.request(serverApp)
                .post('/data/customField/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    fieldName: fieldName,
                    fieldType: fieldType
                })
                .end((err, res) => {
                    message = "Second Instagram";
                    chai.request(serverApp)
                        .post('/data/customField/update')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            fieldName: fieldName,
                            fieldType: fieldType
                        })
                        .end((err, res) => {
                            const createdId = res.body._id;
                            chai.request(serverApp)
                                .get('/data/customField/get/byId/' + createdId)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.fieldName.should.be.eql(fieldName);
                                    done();
                                });
                        });
                });
        });
    });
});