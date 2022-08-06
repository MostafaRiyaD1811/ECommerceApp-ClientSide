import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, ObservedValueOf, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit{
  baseUrl: string
  private currentUserSource: ReplaySubject<IUser>;
  CurrentUser$: Observable<IUser>;

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.apiurl;
    this.currentUserSource = new ReplaySubject<IUser>(1);
    this.CurrentUser$ =this.currentUserSource.asObservable();
  }
  ngOnInit(): void {


  }
  
  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}account`, { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values: any){
    return this.http.post(`${this.baseUrl}account/login`,values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user?.token?.value);
          sessionStorage.setItem('token', user?.token?.value);
          localStorage.setItem('exp', user.token.expireDate.toString());
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values: any) {
    return this.http.post(`${this.baseUrl}account/user/register`, values).pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout():void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('rem');

    this.currentUserSource.next(null);

  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}account/emailexists?email=${email}`);
  }

  getUserAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(`${this.baseUrl}account/address`);
  }

  updateUserAddress(address: IAddress[]): Observable<IAddress[]> {
    return this.http.put<IAddress[]>(`${this.baseUrl}account/address`, address);
  }


}
