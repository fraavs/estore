import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, last } from 'rxjs';
import { loginToken, user, loggedInUser } from '../../types/user.type';


@Injectable()
export class UserService {
  private autoLogoutTimer: any;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(<loggedInUser>{});
  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUsers(): Observable<user> {
    const url: string = 'http://localhost:5001/users';
    return this.httpClient.get<user>(url);
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  createUser(user: user): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    // token.expiresInSeconds = 10;
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString())
    localStorage.setItem('username', token.user.username);
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number = new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const username: string | null = localStorage.getItem('username');
        const firstName: string | null = localStorage.getItem('firstName');
        const lastName: string | null = localStorage.getItem('lastName');

        const user: loggedInUser = {
          username: username !== null ? username : '',
          firstName: firstName !== null ? firstName : '',
          lastName: lastName !== null ? lastName : '',
        }

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
      } else {
        this.logout();
      }
    }
  }
}
