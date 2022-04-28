const router = require('express').Router();
const Prescription = require('../models/Prescription');
const express = require('express');
const Patient = require('../models/Patient');

router.post('/patienthistory', function(req, res){
  var ptid = req.body.ptid;
  console.log('In the history');
  console.log(ptid);
  console.log(req.body);
  Prescription.find( {patientId: ptid}).sort({date: -1}).exec( function(err, data){
    if(data){
      console.log(data);
      res.status(201).json(data);
    }
    else{
      console.log(err);
      res.status(401).json({ err: 'Not Found'});
    }
  });
});

router.post('/patientdata', function(req, res){
  var ptemail = req.body.email;
  console.log('In the data');
  console.log(req.body);
  console.log(ptemail);
  Patient.findOne( {email: ptemail}, function(err, data){
    if(data){
      res.status(201).json(data);
      console.log('data: '+data);
    }
    else{
      res.status(401).json(err);
      console.log(err);
    }
  });
})
module.exports = router;
