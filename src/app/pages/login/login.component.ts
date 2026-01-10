import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, viewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { exhaustMap, tap, catchError, of } from 'rxjs';
import { CommonService } from '../../service/common.service';
import { setUserInfo, getUserInfo, setToken, getToken } from '../../../global/app.global';
import { RouterLink } from '@angular/router';
import { OtpVerficationComponent } from '../otp-verfication/otp-verfication.component';
import { RedirectService } from '../../service/redirect.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule, ReactiveFormsModule, OtpVerficationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private fb = inject(FormBuilder);
  private router = inject(Router);
  private commonService = inject(CommonService);
  private redirectService = inject(RedirectService);
  public otpInfo: any;
  public error_type: any = null;
  displayLoginBlock:boolean=true;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  submitting = false;
  onSubmit() {
    this.submitting = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // 🔥 Show validation errors
      return;
    }

    of(this.loginForm.value).pipe(
      exhaustMap(({ email, password }) =>
        this.commonService.postJsonData('api/login', { email, password }).pipe(

          catchError((err) => {
            this.commonService.showError('Login failed');

            return of(null);
          })
        )
      )
    ).subscribe((res) => {
      this.submitting = false;
      if (this.commonService.isBrowser()) {
        if (res.status == 'success') {
          setUserInfo(res.data.user);
          setToken(res.data.token);
          this.commonService.showSuccess(res.message, "Signup");
          this.commonService.setUserInfo();
          const redirectUrl = this.redirectService.getLastUrl() || '/study-material';
          this.redirectService.clear();
          this.router.navigateByUrl(redirectUrl);
        }
        else if (res.status == 'error' && res?.error_type == 'email_not_validated') {
          this.error_type = 'email_not_validated';
          this.otpInfo = { user: res.data.id, otp_type: 'E' };
        }

      }

    });
  }



  displayLogin(ev:any)
  {
    this.displayLoginBlock=true;
  }
}
