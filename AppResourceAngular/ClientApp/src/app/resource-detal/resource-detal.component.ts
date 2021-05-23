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
  
  @Input('src')
  private template: string;
  editRes: EditResource
  baseUrl: string;
  private resourcesUrl = 'api/resources';
  editMode: boolean = true;
  
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
      this.editRes = r
    });
    
  }

  refresh(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<EditResource>(`api/resources/edit/${id}`).subscribe(r => {
      this.editRes = r
    });
  }

  goBack(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<EditResource>(`api/resources/cancelEdit/${id}`).subscribe(r => {
      this.location.back();
    });    
  }

  save(): void {
    if (this.editRes.data) {
      this.updateResource(this.editRes.data)
        .subscribe(() => this.goBack());
    }
  }

  updateResource(res: Resource): Observable<any> {
    return this.http.put(this.resourcesUrl, res, this.httpOptions)
  };

  delete(): void {
    if (this.editRes.data) {
      this.deleteResource(this.editRes.data.id).subscribe(() => this.goBack());
    }    
  }

  deleteResource(id: number): Observable<Resource> {
    const url = `${this.baseUrl}api/resources/${id}`;
    return this.http.delete<Resource>(url, this.httpOptions);
  }

}
