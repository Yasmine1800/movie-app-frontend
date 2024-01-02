import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import USER from '../model/user.model';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<USER | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUser() : Observable<USER | null> {
    return this.user$;
  }

  setUser(user: any) {
    this.userSubject.next({...user});
  }

  getUserById(id : string) {
    return this.http.get(`${environment.restLink}/user/${id}`)
  }

  saveUser(user : USER) {
    return this.http.post(`${environment.restLink}/user/save`, user);
  }


}