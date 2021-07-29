const express = require('express');
const router = express.Router();

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./localData');

router.post('/sendMoney', function(req, res) {
    //  Initilized Array for store transection details.
    let data = req.body;
    var count = 0;
    var bank_Record_Details=[];
    if (!data.accountHolderName){
      return res.status(400).send("account holder name should be required");
    }
    let receiverBankDetails={
        transectionID:count+1,
        bankName:data.bankName,
        accountNumber: data.AccountNumber,
        accountHolderName: data.accountHolderName,
        transferAmount: data.amount,
        senderMobileNo:data.senderMobileNo
      };
      let payeeDetails={
        transectionID:receiverBankDetails.transectionID+1,
        payeeBankName:data.ReceiverBankName,
        payeeAccountNumber: data.ReceiverAccountNumber,
        payeeName: data.ReceiverName,
        payeeMobileNo:data.ReceiverMobileNo,
        amount : data.amount,

      };
 // push new bank transection  details
 bank_Record_Details.push(receiverBankDetails);
 bank_Record_Details.push(payeeDetails);

localStorage.setItem('BankDetailsListTran', JSON.stringify(bank_Record_Details));
 let showBank_Details_Txn = JSON.parse(localStorage.getItem('BankDetailsListTran'));
         return res.status(200).send({
          "status":"success",
          "message":"Completed",
          "receiverBankDetails": receiverBankDetails,
          "payeeDetails": payeeDetails,
          "all_Txn_Details":showBank_Details_Txn
    });

});

module.exports = router;
