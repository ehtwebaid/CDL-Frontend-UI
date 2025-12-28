import { Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { exhaustMap, tap, catchError, of } from 'rxjs';
import { CommonService } from '../../service/common.service';
import { setUserInfo, getUserInfo, setToken, getToken } from '../../../global/app.global';
import { RouterLink } from '@angular/router';
import { NumericDirective } from '../../directive/numeric.directive';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule,NumericDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
private fb = inject(FormBuilder);
  private router = inject(Router);
  private commonService = inject(CommonService);
  public error_type: any = null;
  @ViewChild('pwd', { static: false }) pwd!: ElementRef;
  signupForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    name: [null, Validators.required],
    phone_no: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],


  });
  submitting = false;
  onSubmit() {
    this.submitting = true;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // 🔥 Show validation errors
      return;
    }

    of(this.signupForm.value).pipe(
      exhaustMap(({ email, password }) =>
        this.commonService.postJsonData('api/signup', { ...this.signupForm.value }).pipe(

          catchError((err) => {
            this.commonService.showError('Signup failed');

            return of(null);
          })
        )
      )
    ).subscribe((res) => {
      this.submitting = false;
      if (this.commonService.isBrowser()) {
        if (res.status == 'success') {
          this.commonService.showSuccess(res.message, "Signup");
          this.signupForm.reset();
        }

      }

    });
  }


}
