import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function setUserInfo(data: any) {
  localStorage.setItem('userInfo', JSON.stringify(data)); // ✅ Store token

}

export function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

export function setToken(token: any) {
  localStorage.setItem('cdl-candidate-token', token); // ✅ Store token

}

export function getToken() {
  const token = localStorage.getItem('cdl-candidate-token');
  return token || null;

}
export function clearToken() {
  localStorage.removeItem('cdl-candidate-token'); // ✅ Store token

}
export function clearUserInfo() {
  localStorage.removeItem('userInfo'); // ✅ Store token

}
export function endDateAfterStartDate(startDateField: string, endDateField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startDate = group.get(startDateField)?.value;
    const endDate = group.get(endDateField)?.value;

    if (!startDate || !endDate) {
      return null;  // Skip validation if fields are empty
    }

    const start = new Date(startDate?.year, (startDate?.month - 1), startDate?.day);
    const end = new Date(endDate?.year, (endDate?.month - 1), endDate?.day);
    //console.log(start);

    return end >= start ? null : { endDateInvalid: true };
  };
}
export function atLeastOneSlotValidator(control: AbstractControl): ValidationErrors | null {
  const weekday = control.get('weekday_slot')?.value;
  const weekend = control.get('weekend_slot')?.value;
  return weekday || weekend ? null : { slotRequired: true };
}
export function endTimeAfterStartTimeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('start_time')?.value;
    const end = group.get('end_time')?.value;
    if (!start || !end) return null; // Skip if either is empty

    const startMinutes = start.hour * 60 + start.minute;
    const endMinutes = end.hour * 60 + end.minute;

    return endMinutes > startMinutes ? null : { endBeforeStart: true };
  };
}
export function atLeastOneFileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length > 0) {
      return null; // valid
    }
    return { required: true }; // invalid
  };
}
export function requiredNoWhitespace(control: AbstractControl): ValidationErrors | null {
  if (control.value == null) {
    return { required: true };
  }

  return control.value.toString().trim().length === 0 ? { required: true } : null;
}
export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pass = formGroup.get(password)?.value;
    const confirmPass = formGroup.get(confirmPassword)?.value;

    if (pass && confirmPass && pass !== confirmPass) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
export function maxFieldValidator(totalField: string, evField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const total = group.get(totalField)?.value;
    const ev = group.get(evField)?.value;

    if (total != null && ev != null && ev > total) {
      return { maxFieldExceeds: true };
    }
    return null;
  };
}

export function divisibleBy30Validator(min_booking_duration:any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value =  control.get(min_booking_duration)?.value;
    console.log(value);

    if (value == null || value === '') {
      return null; // skip if empty (let required handle it)
    }

    if (value % 30 !== 0) {
      return { notDivisibleBy30: true };
    }

    return null;
  };
}

export const limit=20;
export const maxSIZEMB=3;
export const maxUploads=1;


export const months_arr =['Jan','Feb','Mar','Apr','May','June','Jul','Aug','Sep','Oct','Nov','Dec'];
export const quarters_arr =['Jan-Apr','May-Aug','Sep-Dec'];

