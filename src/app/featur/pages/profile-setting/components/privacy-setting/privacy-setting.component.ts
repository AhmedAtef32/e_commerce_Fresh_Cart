import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-privacy-setting',
  imports: [ReactiveFormsModule],
  templateUrl: './privacy-setting.component.html',
  styleUrl: './privacy-setting.component.scss'
})
export class PrivacySettingComponent {

private readonly _formBuilder = inject(FormBuilder)
private readonly _authService = inject(AuthService)
private readonly _toastrService = inject(ToastrService)
isReadonly:boolean = true

  formUpdateLoggedPassword : FormGroup = this._formBuilder.group({
    currentPassword : [null , [Validators.required , Validators.pattern(/^[A-Za-z]\w{6,}$/)]],
    password : [null , [Validators.required , Validators.pattern(/^[A-Za-z]\w{6,}$/)]],
    rePassword : [null , [Validators.required]],
  },{validators : this.passwordMatch});

 passwordMatch(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : {notMatch : true}
  }

  submiteFormUpdateLoggedPassword(){
    if (this.formUpdateLoggedPassword.valid) {
      this._authService.updateUserPassword(this.formUpdateLoggedPassword.value).subscribe({
        next: (res) => {
          if(res.message == "success"){
            this._toastrService.success(res.message, "Fresh Cart");
            this._authService.logOut();
            this.isReadonly = true;
          }
        }
      })
    }
    else{
      this.formUpdateLoggedPassword.markAllAsTouched();
    }
  }


  editBtn(){
    this.isReadonly = false
  }
}

