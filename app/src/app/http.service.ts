import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private httpClient : HttpClient) { }

  // for testing purpose
  public sendGetRequest(u: string) {
    return this.httpClient.post('/api', '', {params: {userid: u}})
  }

  public signUpToken(u: any) {
    return this.httpClient.post('/signup', '', {params: {token: u}})
  }

  public getProfile(u: any) {
    return this.httpClient.get('getprofile', {params: {token: u}})
  }
}