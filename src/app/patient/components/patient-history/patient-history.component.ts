import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})


export class PatientHistoryComponent implements OnInit {

  @ViewChild(MatTable) patientHistory!: MatTable<any>;
  // @ViewChild('paginator') paginator!: MatPaginator;

  prescriptionStyle = 'patient-history-container';

  prescription: any = [];

  patientId!: String;
  patientName!: String;

  prescriptionColumns: string[] = ['position', 'medicine', 'quantity', 'dosage'];

  prescriptionSource: any = [];

  parameterColumns: string[] = ['parameter', 'value'];

  parameterSource: any = [];

  show: boolean = false;
  // prescriptionData!: MatTableDataSource<any>;

  length = 100;
  pageSize = 2;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent!: PageEvent;

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  displayedColumns: string[] = ['date', 'doctor', 'action'];

  dataSource: any = [];

  constructor(private patient: PatientService, private router: Router) { };

  getPrescription(){
    this.patient.getPrescription( {ptid: this.patientId} ).subscribe(
      res => {
        console.log(res);
        this.prescription = res;
        console.log(this.prescription);
        for( let i=0; i<this.prescription.length; i++){
          var date ='';
          var dateArray = this.prescription[i].date.split('-');
          console.log(dateArray);
          //Creating Date
          date += dateArray[2][0]+dateArray[2][1]+'-';
          date += dateArray[1]+'-';
          date += dateArray[0];
          let myRow = {
            date: date,
            doctor: 'abc',
            position: this.dataSource.length
          };
          console.log(myRow);
          this.dataSource.push(myRow);
          console.log(this.dataSource);
          this.patientHistory.renderRows();
          // this.patientHistory.paginator = this.paginator;
          // this.prescriptionData = new MatTableDataSource(this.dataSource);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getPatient(){
    console.log(localStorage.getItem('ptemail'));
    this.patient.getPatient({ email: localStorage.getItem('ptemail') }).subscribe(
      req => {
        this.patientId = req.uhid;
        this.patientName = req.name;
        // localStorage.setItem('ptid', req.uhid);
        localStorage.setItem('patientDetails', JSON.stringify(req));
        console.log(this.patientId);
        this.getPrescription();
      },
      err => {
        console.log(err);
      }
    );
  }

  showPrescription(position: number){
    console.log("Position: "+position)
    for( let i=0; i<this.dataSource.length; i++){
      if(position == this.dataSource[i].position){
        this.prescriptionSource = this.prescription[i].medicine;
        this.parameterSource = this.prescription[i].parameter;
        console.log(this.prescriptionSource);
        this.show = true;
      }
    }
    this.prescriptionStyle = 'patient-history-blurred';
  }

  closePrescription(){
    this.show = false;
    this.prescriptionStyle = 'patient-history-container';

      // var pt = JSON.parse( localStorage.getItem('patientDetails') || '{}' );
      // console.log(pt);
  }

  ngOnInit(): void {
    this.getPatient();
  }

}
