import { Component, Inject } from '@angular/core';
import { Resource } from '../resource';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styles: ['./resource-add.component.css']
})
export class ResourceAddComponent {

  
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  
  //getResource(): void {
  //  const id = Number(this.route.snapshot.paramMap.get('id'));
  //  this.dataService.getResource(id)
  //    .subscribe(resource => this.resource = resource);
  //}
  goBack(): void {
    this.location.back();
  }

  add(res: string): void {
    this.http.post(this.baseUrl + 'api/resources', res);
  }

  //save(): void {
  //  this.http.post(this.baseUrl + 'api/resources').subscribe(result => {
  //    this.resource = result;
  //  }, error => console.error(error));

  //}
  
}
