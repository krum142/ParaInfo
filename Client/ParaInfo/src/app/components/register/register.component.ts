import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService) {
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [Validators.required]],
      'confirm-password': ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  register() {
    if (this.password?.value == this.confirmPassword?.value &&
      this.registerForm.status === "VALID") {

      delete this.registerForm.value['confirm-password'];
      this.auth.register(this.registerForm.value).subscribe((data) => { }, error => {       
      });
    }
  }



  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirm-password');
  }
}
