import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hasError: boolean;
  private paramSub: any;
  showFields: boolean = false;

  constructor(fb: FormBuilder, private authService: AuthService, private activeRoute: ActivatedRoute) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.paramSub = this.activeRoute.params.subscribe(params => {
      if (params['error'] && params['error'] == "1") { 
        this.hasError = true;
      }
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  onSubmit(value: any): void {
    if (this.loginForm.valid) {
      this.authService.logIn(value.email, value.password);
    }
  }

  showLoginFields(b: boolean): void {
    this.showFields = b;
  }

}
