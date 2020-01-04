import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  loginForm: any;
  login_user : string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName : new FormControl(""),
      password : new FormControl("")
    });
    
    this.login_user = '';    
  }

  onSubmit = function(user: any) {
    console.log(this.loginForm.controls['userName'].value);
    this.router.navigate(['main-menue'], { skipLocationChange: true });
  }

}
