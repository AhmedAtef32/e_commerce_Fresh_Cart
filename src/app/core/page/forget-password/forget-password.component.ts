import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  isloading:boolean = false
  step:number = 1

  verifyEmail:FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
  })

  verifyEmailSubmit(){

    if(this.verifyEmail.valid){
      this.isloading = true
      this._authService.verifyEmail(this.verifyEmail.value).subscribe({
        next : (res) => {
         console.log(res);
         this.isloading=false
         if(res.statusMsg == "success"){
          this.step = 2
         }
        }, error : (err) => {
          console.log(err);
          this.isloading=false
         }
      })
    }else{
      this.verifyEmail.markAllAsTouched()
    }

  }



  verifyCode:FormGroup = new FormGroup({
    resetCode : new FormControl(null ,[Validators.required , Validators.pattern(/^[0-9]{6}$/)]),
  })

  verifyCodeSubmit(){

    if(this.verifyCode.valid){
      this.isloading = true
      this._authService.verifyCode(this.verifyCode.value).subscribe({
        next : (res) => {
         console.log(res);
         this.isloading=false
         if(res.status == "Success"){
          this.step = 3
         }
        }, error : (err) => {
          console.log(err);
          this.isloading=false
         }
      })
    }else{
      this.verifyCode.markAllAsTouched()
    }

  }



  resetPassword:FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    newPassword : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Za-z]\w{4,6}$/)]),
  })


  rePasswordSubmit(){

    if(this.resetPassword.valid){
      this.isloading = true
      this._authService.resetPassword(this.resetPassword.value).subscribe({
        next : (res) => {
         console.log(res);
         this.isloading=false

         localStorage.setItem("userToken",res.token)

         this._authService.getUserData();

         this._router.navigate(['/home'])

        }, error : (err) => {
          console.log(err);
          this.isloading=false
         }
      })
    }else{
      this.resetPassword.markAllAsTouched()
    }

  }





}
