
const pdfkitTable = require('pdfkit-table');
const router = require('express').Router();
const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const {AgeFromDateString} = require('age-calculator');
const { func } = require('joi');
const { transporter, mailOptionsPdf } = require('../utility/utility');
const patient = require('../models/Patient');
const { privateDecrypt } = require('crypto');

const doc = new pdfkitTable({size: 'A4'});
var today = new Date();
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

router.post('/doctDetails', function(req, res){
  console.log(req.body.emailId);
  Doctor.findOne( {email: req.body.emailId}, function(err, data){
    if(data){
      res.status(201).json(data);
      console.log('doctor: '+data);
    }
    else{
      res.status(401).json(err);
      console.log(err);
    }
  });
});

router.post('/patientid', function(req, res){
  var patientid = req.body.uhid;
  console.log(patientid);
  patient.findOne( {uhid: patientid}, function(err, doc){
    if(doc){
      console.log(doc);
      var dob1 = doc.dob.toString().split("-");
      var date1 = dob1[2]+'/'+dob1[1]+'/'+dob1[0];
      var age = new AgeFromDateString(date1).age;
      console.log(age);
      res.status(201).json({
        uhid: doc.uhid,
        username: doc.username,
        email: doc.email,
        gender: doc.gender,
        age: age
      });
    }
    else{
      res.status(404).json({ error: 'Data not found'});
    }
  });
});

router.post('/prescription', async(req, res) => {
  if(req.body!=null){
    const medicines= req.body.medicine;
    const parameters= req.body.parameter;
    var ptid = req.body.uhid;
    //var patient = req.cookies['patient'];
    try {
      const prescription = new Prescription({
          patientId: ptid,
          doctorId: 2,
          medicine: medicines,
          parameter: parameters
      });
      const result = await prescription.save();
      console.log(result);

      //Header
      doc.rect(60,60,480,38).fillAndStroke('#FFFFFF','#000000');
      doc.fillColor('#000000');
      doc.fontSize(26).text("Prescription",245,69).moveDown();
      doc.fontSize(12).text("Date: "+date,400,125);

      doc.fontSize(10).font('Helvetica-Bold').text("Blood Pressure: ",65,150);
      doc.text("Sugar: ",65,165);
      doc.text("Temprature: ",65,180);

      doc.font('Helvetica-Bold').text("Doctor Email: ",65,215);
      doc.text("Patient Email: ",65,230);
      doc.text("Doctor Name: ",400,215);
      doc.text("Patient Name: ",400,230);

      doc.font('Helvetica').text("abc@gmail.com",135,215);
      doc.text(req.body.email,135,230);
      doc.text("Mr. abc",470,215);
      doc.text(req.body.name,470,230);

      let y1 = 150;
      for(let i = 0; i<parameters.length;i++){
        doc.text(parameters[i].value,150,y1);
        y1+=15;
      }

      //Table Header
      doc.rect(60,300,60,20).fillAndStroke('#e0ebff','#000000');
      doc.rect(120,300,150,20).fillAndStroke('#e0ebff','#000000');
      doc.rect(270,300,130,20).fillAndStroke('#e0ebff','#000000');
      doc.rect(400,300,130,20).fillAndStroke('#e0ebff','#000000');

      doc.fillColor('#000000').fontSize(10).font("Helvetica-Bold");
      doc.text("S.No",77,306);
      doc.text("Medicine",170,306);
      doc.text("Quantity",315,306);
      doc.text("Dosage",447,306);

      doc.fontSize(10).font("Helvetica");
      var x = 85;
      var y = 340;

      for(let i=0; i < medicines.length; i++){
        doc.text(i+1,x,y);
        doc.text(medicines[i].medicine,x+80,y);
        doc.text(medicines[i].quantity,x+245,y);
        doc.text(medicines[i].dosage,x+365,y);
        y+=25;
      }

      //Footer
      doc.font('Helvetica-Bold').text("M - ", 130, 720);
      doc.text('A - ', 270, 720);
      doc.text('E - ', 410, 720);

      doc.font('Helvetica').text('Morning',150, 720);
      doc.text('Afternoon', 290, 720);
      doc.text('Evening', 430, 720)

      doc.rect(60,747,480,25).fillAndStroke('#e0ebff', '#000000');
      doc.image('malogo.png', 75, 752, { width: 15 });
      doc.fillColor('#000000').font('Helvetica-Bold').fontSize(12).text("MedAssistant",97,755);
      doc.fontSize(10).text('--- Get Well Soon ---',430,755);
      doc.end();

      console.log(req.body.email);
      mailOptionsPdf.to = req.body.email;
      mailOptionsPdf.subject = 'Prescription from MedAssist';
      mailOptionsPdf.text = 'Prescription from Dr. abc';
      mailOptionsPdf.attachments[0].filename = 'Prescription.pdf';
      mailOptionsPdf.attachments[0].content = doc;

      transporter.sendMail(mailOptionsPdf, function(err, info){
        if(err)
          throw err;
        else{
          console.log("Prescription has been sent: " + info.response);
          res.status(201).json({ success: 'Prescription has been sent' });
        }
      });
    }
    catch(err){
      console.log(err);
    }
  }
  else
  res.status(400).json({ error: 'Error while sending prescription' });
});

module.exports = router;
