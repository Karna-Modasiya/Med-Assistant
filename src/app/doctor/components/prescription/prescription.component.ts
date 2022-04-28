import { Component, OnInit, ViewChild } from '@angular/core';
import alanBtn from '@alan-ai/alan-sdk-web';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotifierService } from 'src/app/services/notifier.service';
// import { MatSort } from '@angular/material';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {

  @ViewChild(MatTable) prescriptionsTable!: MatTable<any>;

  alanBtnInstance: any;

  patientFound: boolean = true;
  showPrescription: boolean = true;
  isLoading: boolean = false;

  medicine: string = '';
  quantity: string = '';
  dosage: string = '';
  bphigh: string = '';
  bplow: string = '';
  sugar: string = '';
  temperature: string = '';

  patientuhid!: String;
  patientname!: String;
  patientemail!: String;
  patientgender!: String;
  patientage!: String;

  b: number = 0;
  s: number = 0;
  t: number = 0;


  prescriptionColumns: string[] = ['position', 'medicine', 'quantity', 'dosage', 'action'];

  prescriptionSource: any = [];

  parameterColumns: string[] = ['parameter', 'value', 'action'];

  parameterSource: any = [];

  addToParameter()
  {

    if(this.bphigh != "" && this.bplow != "" && this.b == 0)
    {
      this.parameterSource.push({
        parameter: 'Blood Pressure',
        value : this.bphigh + ' / ' + this.bplow + ' mmHg'
      });
      this.b = 1;
    }

    if(this.sugar != "" && this.s==0)
    {
      this.parameterSource.push({
        parameter: 'Sugar',
        value : this.sugar + ' mg/dL'
      })
      this.s = 1;
    }

    if(this.temperature != "" && this.t==0)
    {
      this.parameterSource.push({
        parameter: 'Temperature',
        value : this.temperature + ' °F'
      })
      this.t = 1;
    }

    this.clearParameter();
    let cloned = this.parameterSource.slice();
    this.parameterSource = cloned;
  }

  clearParameter()
  {
    this.bphigh = "";
    this.bplow = "";
    this.sugar = "";
    this.temperature = "";
  }

  deleteParameter(parameter: number)
  {
    for(let i = 0; i < this.parameterSource.length; ++i)
    {
      if (this.parameterSource[i].parameter === parameter)
      {
        if(parameter === 1)
        this.b=0;
        else if(parameter === 2)
        this.s=0;
        else if(parameter === 3)
        this.t=0;
        this.parameterSource.splice(i,1);
        let cloned = this.parameterSource.slice();
        this.parameterSource = cloned;
      }
    }
  }

  addToPrescription()
  {
    if(this.medicine !== "" && this.quantity !=="" && this.dosage !=="")
    {
      this.prescriptionSource.push({
        position: this.prescriptionSource.length + 1,
        medicine: this.medicine,
        quantity: parseInt(this.quantity),
        dosage: this.dosage
      });

      this.clearPrescription();
      let cloned = this.prescriptionSource.slice();
      this.prescriptionSource = cloned;
    }
  }

  clearPrescription()
  {
    this.medicine = "";
    this.quantity = "";
    this.dosage = "";
  }

  updatePrescription(position: number)
  {
    for(let i = position-1; i < this.prescriptionSource.length; ++i){
      this.prescriptionSource[i].position = this.prescriptionSource[i].position - 1;
    }
    let cloned = this.prescriptionSource.slice();
    this.prescriptionSource = cloned;
  }

  deletePrescription(position: number)
  {
    console.log(position);
    for(let i = 0; i < this.prescriptionSource.length; ++i){
        if (this.prescriptionSource[i].position === position) {

          this.prescriptionSource.splice(i,1);
          let cloned = this.prescriptionSource.slice();
            this.prescriptionSource = cloned;
            this.updatePrescription(position);
          }
        }
  }

  findPatient = () => {
    var patientid = { uhid: this.patientuhid };
    this.doctor.findPatient(patientid).subscribe(
      res => {
        console.log(res);
        this.patientFound = false;
        this.patientname = res.username;
        this.patientemail = res.email;
        this.patientgender = res.gender;
        this.patientage = res.age;
        this.notifierService.showNotification('Patient found', 'OK');
      },
      err => {
        console.log(err);
        this.patientname = '';
        this.patientemail = '';
        this.patientgender = '';
        this.patientage = '';
        this.notifierService.showNotification(err, 'OK');
      }
      );
    }

  writePrescription()
  {
    this.showPrescription = false;
  }

  constructor(private doctor: DoctorService, private notifierService: NotifierService) {
    this.alanBtnInstance = alanBtn({
      key: '9123432a1024c161a67a34a46be2ceea2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command === 'addMed') {
          this.medicine = commandData.item;
        }
        if (commandData.command === 'addQty') {
          this.quantity = commandData.item.toString();
          console.log(commandData.item);
        }
        if (commandData.command === 'addDos') {
          this.dosage = commandData.item;
        }
        if (commandData.command === 'add') {
          this.addToPrescription();
        }
        if (commandData.command === 'addParm') {
          this.addToParameter();
        }
        if (commandData.command === 'del') {
          this.deletePrescription(parseInt(commandData.item));
        }
        if (commandData.command === 'bphigh') {
          this.bphigh = commandData.item;
        }
        if (commandData.command === 'bplow') {
          this.bplow = commandData.item;
        }
        if (commandData.command === 'sugar') {
          this.sugar = commandData.item;
        }
        if (commandData.command === 'temperature') {
          this.temperature = commandData.item;
        }
        if (commandData.command === 'delParm') {
          this.deleteParameter(commandData.item);
        }
        if (commandData.command === 'submit') {
          this.sendPrescription();
      }
    }
  })
  };

  // constructor(private doctor: DoctorService, private router: Router, private notifierService: NotifierService) { };

  sendPrescription = () => {
    this.isLoading = true;
    var prescriptionData = {
      medicine: this.prescriptionSource,
      parameter: this.parameterSource,
      email: this.patientemail,
      name: this.patientname,
      uhid: this.patientuhid
    };
    // this.prescriptionData.medicine = this.prescriptionSource;
    // this.prescriptionData.parameter = this.parameterSource;
    this.doctor.sendPrescription(prescriptionData).subscribe(
      res => {
        console.log(res);
        this.patientname = '';
        this.patientage = '';
        this.patientgender = '';
        this.patientuhid = '';
        this.patientemail = '';
        this.notifierService.showNotification('Prescription has been sent', 'OK');
        this.showPrescription = true;
        this.patientFound = true;
        this.isLoading = false;
        this.prescriptionSource = [];
        this.parameterSource = [];
      },
      err => {
        console.log(err);
        this.notifierService.showNotification('Some error occurred while sending prescription', 'OK');
        this.isLoading = false;
      }
      );
    }


  ngOnInit(): void {
    this.doctor.doctorDetails({ emailId: localStorage.getItem('dremail')}).subscribe(
      res=>{
        localStorage.setItem('drDetails', JSON.stringify(res));
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

}
