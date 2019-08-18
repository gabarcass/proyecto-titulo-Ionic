import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { StorageService } from 'services/storage.service'
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:9000/'
  dato
  parvulo
  seleccionado

  constructor(private http: HttpClient, private storageSrv: StorageService) { }

  public get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}` /* , params */)
  }
  public post(url, json): Observable<any> {
    const session = this.storageSrv.get('@session')
    if (session) json.token = session.token
    this.dato = this.http.post(`${this.baseUrl}/${url}`, json)
    return this.dato
  }
  public put(url, json): Observable<any> {
    const session = this.storageSrv.get('@session')
    if (session) json.token = session.token
    this.dato = this.http.put(`${this.baseUrl}/${url}`, json)
    return this.dato
  }
  public del(url): Observable<any> {
    this.dato = this.http.delete(`${this.baseUrl}/${url}`)
    return this.dato
  }
}
