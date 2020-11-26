import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        'username': ['', [Validators.required]],
        'password': ['', [Validators.required]]
      })
      console.log(this.loginForm)
   }

  ngOnInit(): void {
  }
  
  login(){
    if(this.loginForm.status === "VALID"){
      console.log("yes");
    }
    console.log(this.loginForm.get('username'));
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
