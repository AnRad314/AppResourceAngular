import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { RESOURCES } from './mock-resources';
import { Resource } from './resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private resourcesUrl = 'api/resources';
  constructor(
    private http: HttpClient ) { }

  getResources(): Observable<Resource[]> {    
    return this.http.get<Resource[]>(this.resourcesUrl);
  }

  getResource(id: number): Observable<Resource> {
    const url = `${this.resourcesUrl}/${id}`;    
    return this.http.get<Resource>(url);
  }
  updateResource(res: Resource): Observable<any> {
    return this.http.put(this.resourcesUrl, res, this.httpOptions)
  };
    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  //addResource(res: Resource): Observable<Resource> {
  //  return this.http.post<Resource>(this.resourcesUrl, res, this.httpOptions)
  //};

  addResource(res: Resource): Observable<any> {
    return this.http.post<Resource>(this.resourcesUrl, res, this.httpOptions)
  };

  deleteResource(id: number): Observable<Resource> {
    const url = `${this.resourcesUrl}/${id}`;

    return this.http.delete<Resource>(url, this.httpOptions);
  }

}
