import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

export interface Params {
  url: string
  body?: any
}
@Injectable({
  providedIn: 'root',
})
export class SnapService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({}),
  }
  httpGet = (params: Params) => {
    return this.http.get(`${environment.baseUrl}${params.url}`, {
      headers: this.httpOptions.headers,
      params: params.body,
    })
  }

  httpPost = (params: Params) => {
    return this.http.post(`${environment.baseUrl}${params.url}`, params.body, {
      headers: this.httpOptions.headers,
    })
  }

  httpDelete = (params: Params) => {
    return this.http.delete(`${environment.baseUrl}${params.url}`, {
      headers: this.httpOptions.headers,
      params: params.body,
    })
  }
}
