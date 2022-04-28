import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  links = [
    {
      label: 'Home',
      link: '/operator/home'
    },
    {
      label: 'Appointments',
      link: '/operator/appointment'
    },
    {
      label: 'Profile',
      link: '/operator/profile'
    }
  ];
  activeLink = this.links[0].label;

  logout()
  {
    this.auth.logoutUser().subscribe(
      res => {
        console.log(res);
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
