import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce , zoomIn} from 'ng-animate';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ],
})
export class LoginComponent {

private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _formBuilder= inject(FormBuilder)

  bounce: any;
  zoomIn: any;

  iscalingApi:boolean = false
  sussessRegister!:string
  falidRegister!:string


  loginForm:FormGroup = this._formBuilder.group({
    email: [null , [Validators.required , Validators.email]],
    password: [null , [Validators.required ]],
  });


  submitLoginForm(){
    this.falidRegister ="";

    if(this.loginForm.valid){
      this.iscalingApi = true


     this._authService.submitLogin(this.loginForm.value).subscribe({
        next: (res) =>{
          this.iscalingApi = false
          this.sussessRegister = res.message
          setTimeout(()=>{
            localStorage.setItem("userToken", res.token);
            this._authService.getUserData();
            this._router.navigate(['/home'])
          },1000)
        },
        error: (err) =>{
          this.iscalingApi = false
          this.falidRegister = err.error.message
          console.log(err)
        }
      })

    }else{
      this.loginForm.markAllAsTouched()
    }

  }





}
