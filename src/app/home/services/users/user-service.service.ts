import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginToken, user } from 'src/app/home/types/user.type';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: user): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString())
  }
}
