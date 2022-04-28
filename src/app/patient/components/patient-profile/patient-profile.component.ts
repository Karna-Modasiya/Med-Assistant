import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  patientDetails: any = {};

  uhid!: string;
  name!: string;
  email!: string;
  phno!: string;
  bloodGroup!: string;
  gender!: string;
  dob!: string;

  constructor(private notifierService: NotifierService) { };

  copyId(){
    this.notifierService.showNotification('Copied to clipboard', 'OK');
  }

  ngOnInit(): void {
    this.patientDetails = JSON.parse( localStorage.getItem('patientDetails') || '{}' );
    console.log(this.patientDetails);
    this.uhid = this.patientDetails.uhid;
    this.name = this.patientDetails.username;
    this.email = this.patientDetails.email;
    this.phno = this.patientDetails.mobile;
    this.bloodGroup = this.patientDetails.bloodgroup;
    this.gender = this.patientDetails.gender;
    this.dob = this.patientDetails.dob;
  }

}
