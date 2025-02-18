import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _formBuilder= inject(FormBuilder)



  iscalingApi:boolean = false
  sussessRegister!:string
  falidRegister!:string


  registerForm:FormGroup = this._formBuilder.group({
    name: [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email: [null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^[A-Za-z]\w{6,}$/)]],
    rePassword: [null , [Validators.required]],
    phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },{validators:[this.passwordMatch]});


  submitRegisterForm(){
    this.falidRegister ="";

    if(this.registerForm.valid){
      this.iscalingApi = true


     this._authService.submitRegister(this.registerForm.value).subscribe({
        next: (res) =>{
          this.iscalingApi = false
          this.sussessRegister = res.message

          setTimeout(()=>{
            this._router.navigate(['/login'])
          },1000)
        },
        error: (err) =>{
          this.iscalingApi = false
          this.falidRegister = err.error.message
          console.log(err)
        }
      })

    }else{
      this.registerForm.markAllAsTouched()
    }

  }


  passwordMatch(group:AbstractControl){

    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : {notMatch : true}
  }

}
