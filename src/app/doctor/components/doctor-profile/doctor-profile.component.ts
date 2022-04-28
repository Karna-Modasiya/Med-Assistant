import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctorDetails: any = {};

  name!: string;
  email!: string;
  degree!: string;
  specialisation!: string;

  constructor() { }

  ngOnInit(): void {
    this.doctorDetails = JSON.parse( localStorage.getItem('drDetails') || '{}' );
    this.name = this.doctorDetails.username;
    this.email = this.doctorDetails.email;
    this.degree = this.doctorDetails.degree;
    this.specialisation = this.doctorDetails.specialisation;
  }

}
