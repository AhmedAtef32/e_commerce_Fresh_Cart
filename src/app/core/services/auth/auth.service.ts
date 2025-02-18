import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly _httpClient= inject(HttpClient);
  private readonly _router= inject(Router);

  userData!:object;
  submitRegister(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  submitLogin(data:object) :Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  getUserData(){
    this.userData = jwtDecode(localStorage.getItem("userToken")!);
    console.log(this.userData);
  }


  logOut(){
    localStorage.removeItem("userToken");
    this.userData = null!;
    this._router.navigate(["/login"]);

  }
}
