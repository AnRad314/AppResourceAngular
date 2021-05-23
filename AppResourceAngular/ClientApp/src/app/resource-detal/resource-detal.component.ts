import { Component, OnInit, Input, Inject } from '@angular/core';
import { Resource } from '../resource';
import { EditResource } from '../editResource';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-resource-detal',
  templateUrl: './resource-detal.component.html',
  styles: ['./resource-detal.component.css']
})

export class ResourceDetalComponent implements OnInit {
  
  resource: Resource | undefined;
  baseUrl: string;
  private resourcesUrl = 'api/resources';
  constructor(@Inject('BASE_URL') baseUrl: string,   
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute
  )
  {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ngOnInit(): void {    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<EditResource>(`api/resources/edit/${id}`).subscribe(r => {
      this.resource = r.data;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.resource) {
      this.updateResource(this.resource)
        .subscribe(() => this.goBack());
    }
  }

  updateResource(res: Resource): Observable<any> {
    return this.http.put(this.resourcesUrl, res, this.httpOptions)
  };

  delete(): void {
    if (this.resource) {
      this.deleteResource(this.resource.id).subscribe(() => this.goBack());
    }    
  }

  deleteResource(id: number): Observable<Resource> {
    const url = `${this.baseUrl}api/resources/${id}`;
    return this.http.delete<Resource>(url, this.httpOptions);
  }


  //delete(res: Resource): void {
  //  this.resources = this.resources.filter(h => h !== res);
  //  this.deleteResource(res.id).subscribe(res => this.resources = this.resources);
  //}

  //deleteResource(id: number): Observable<Resource> {
  //  const url = `${this.baseUrl}api/resources/${id}`;
  //  return this.http.delete<Resource>(url, this.httpOptions);
  //}
}
