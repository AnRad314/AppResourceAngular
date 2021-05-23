import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from '../resource';


@Component({  
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styles: ['./resources.component.css']

})
export class ResourcesComponent implements OnInit {

  resources: Resource[] = [];
  http: HttpClient;
  baseUrl: string;  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }
  
  ngOnInit() {

    this.http.get<Resource[]>(this.baseUrl + 'api/resources').subscribe(result => {
      this.resources = result;
    }, error => console.error(error));

  }
  


}
