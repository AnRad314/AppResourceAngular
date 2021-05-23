import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../resource';
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
  private resourcesUrl = 'api/resources';
  constructor(
    private route: ActivatedRoute,  
    private location: Location,
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ngOnInit(): void {
    this.getResource();
  }
  getResource(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));    
    this.getResources(id).subscribe(resource => this.resource = resource);
  }

  getResources(id: number): Observable<Resource> {
    const url = `${this.resourcesUrl}/${id}`;
    return this.http.get<Resource>(url);
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
}
