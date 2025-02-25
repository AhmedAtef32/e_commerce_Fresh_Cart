import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private readonly _httpClient = inject(HttpClient);


  getUser(id:string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/users/${id}`);
  }
  
}
