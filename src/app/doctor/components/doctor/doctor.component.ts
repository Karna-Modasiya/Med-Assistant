import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  name = JSON.parse( localStorage.getItem('drDetails') || '{}' ).username;

  links = [
    {
      label: 'Prescription',
      link: '/doctor/prescription'
    },
    {
      label: 'History',
      link: '/doctor/history'
    },
    {
      label: 'Profile',
      link: '/doctor/profile'
    }
  ];
  activeLink = this.links[0].label;

  logout()
  {
    this.auth.logoutUser().subscribe(
      res => {
        console.log(res);
        // localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('usertype');
        this.router.navigate(['auth']);
      },
      err => {
        // this.errorAlert = err;
        // setTimeout(() => {
        //   this.errorAlert = null;
        // }, 5 * 1000);
      }
    );;
  }

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

}