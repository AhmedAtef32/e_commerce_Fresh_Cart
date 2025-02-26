import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UserId } from '../../interface/user ID/user-id';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly _httpClient= inject(HttpClient);
  private readonly _router= inject(Router);
  private readonly _pLATFORM_ID= inject(PLATFORM_ID);

  userData!:UserId;
  userId!:string;
  userName: BehaviorSubject<string> = new BehaviorSubject('');
  submitRegister(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  submitLogin(data:object) :Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  getUserData(){
      this.userData = jwtDecode(localStorage.getItem("userToken")!);
      this.userId =this.userData.id;
  }


  logOut(){
    localStorage.removeItem("userToken");
    this.userData = null!;
    this._router.navigate(["/login"]);

  }

  verifyEmail(data:object) :Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyCode(data:object) :Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:object) :Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  updateUserData(data:object) : Observable<any>{
   return this._httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data);
  }

  updateUserPassword(data:object) : Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data);
   }
}
