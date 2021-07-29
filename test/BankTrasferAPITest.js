let server = require('../app');
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require('chai').expect;

// Assertion
chai.should();
chai.use(chaiHttp)

describe("POST /bankapi/sendMoney", () => {
    it("It should POST for check  Bank Transection", (done) => {

          let InputParmeters ={
                "accountHolderName": "Prasad",
                "AccountNumber": 1000,
                "bankName": "HDFC bank",
                "senderMobileNo":"7040088212",
                "ReceiverName": "Niraj",
                "ReceiverBankName": "AXIS",
                "ReceiverAccountNumber": 20000,
                "amount": 1000
              }

        chai.request(server)
            .post("/bankapi/sendMoney")
            .send(InputParmeters)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              done();
            });
    });

    it("check with missed account holder name", (done) => {

        let InputParmeters ={
          "AccountNumber": 123213,
          "bankName": "PNBank",
          "senderMobileNo":"8668946276",
          "ReceiverName": "Pankaj",
          "ReceiverBankName": "HDFC",
          "ReceiverAccountNumber": 20000,
          "amount": 6000
        }

        chai.request(server)
            .post("/bankapi/sendMoney")
            .send(InputParmeters)
            .end((err, response) => {
            response.should.have.status(400);
            done();
        });
    });
  });
