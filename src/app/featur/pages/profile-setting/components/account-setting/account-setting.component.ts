import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';
import { UserDetails } from '../../../../interface/UserDetials/user-details';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-setting',
  imports: [ReactiveFormsModule , FormsModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.scss'
})
export class AccountSettingComponent implements OnInit , OnDestroy {

  private readonly  _userService = inject(UserService);
  private readonly  _authService = inject(AuthService);
  private readonly  _formBuilder = inject(FormBuilder);
  userDetails:UserDetails = {} as UserDetails;
  userID!:string;
  isreadonly:boolean = true

  fakeUserData:object = {
    name:this.userDetails.name,
    email:"Fbm9999@example.com",
    phone:this.userDetails.phone
  }


  FormupdateUserData:FormGroup = new FormGroup({
    name : new FormControl(`${this.userDetails.name}` ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email : new FormControl(`${this.userDetails.email}` ,[Validators.required , Validators.email]),
    phone : new FormControl(`${this.userDetails.phone}` ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  ngOnInit(): void {

    this._authService.getUserData();
    this.userID = this._authService.userId;

    this.getUserData();
  }




  submiteUpdateUserData(){
    if(this.FormupdateUserData.valid){
       this._authService.updateUserData(this.FormupdateUserData.value).subscribe({
         next: (res) => {
           if(res.message == "success"){
             this.isreadonly = true;
             this._authService.userName.next(res.user.name);
           }
         }
       })
    }else{
      this.FormupdateUserData.markAllAsTouched();
    }

  }

  getUserData(){
    this._userService.getUser(this.userID).subscribe({
      next: (res) => {
        this.userDetails = res.data
        console.log(this.userDetails)
      }
    });
  }

  editBtn(){
    this.isreadonly = false;
    this._authService.updateUserData(this.fakeUserData).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  ngOnDestroy(): void {

    if(this.isreadonly == false){

      this.submiteUpdateUserData();
    }
  }
}
