import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../resource';
//import { RESOURCES } from '../mock-resources';
import { DataService } from '../data.service';

@Component({  
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styles: ['./resources.component.css'],
  providers: [DataService]
})
export class ResourcesComponent implements OnInit {

  resources: Resource[] = [];
  selectedResource?: Resource;
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private dataService: DataService) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  getResources(): void {
    this.dataService.getResources().subscribe(resources => this.resources = resources)
  }

  ngOnInit() {

    this.http.get<Resource[]>(this.baseUrl + 'api/resources').subscribe(result => {
      this.resources = result;
    }, error => console.error(error));

  }
  selectedRes?: Resource;
  onSelect(res: Resource): void {
    this.selectedResource = res;
  }
  delete(res: Resource): void {
    this.resources = this.resources.filter(h => h !== res);
    this.dataService.deleteResource(res.id).subscribe();
  }

  add(data: string): void {
    data = data.trim();
    if (!data) { return; }
    this.dataService.addResource({ data } as Resource)
      .subscribe(res => {
        this.resources.push(res);
      });
  }
}
