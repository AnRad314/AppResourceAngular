import { Component, Inject } from '@angular/core';
import { Resource } from '../resource';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styles: ['./resource-add.component.css']
})
export class ResourceAddComponent {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private dataService: DataService,
    private location: Location
  )
  {
    this.baseUrl = baseUrl;
  }

  add(res: string): void {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    this.http.post(this.baseUrl + 'api/resources', JSON.stringify(res), { headers: headers })
      .subscribe(result => {
        this.goBack();
      }, error => console.error(error));
  }

  //add(res: string): void {
  //  const headers = new HttpHeaders()
  //    .set('Content-Type', 'application/json')
  //    .set('Accept', 'application/json')

  //  this.http.post(this.baseUrl + 'api/resources', JSON.stringify(res), { headers: headers })
  //    .subscribe(result => {
  //      this.router.navigateByUrl(this.baseUrl);
  //    }, error => console.error(error));
  //}

  goBack(): void {
    this.location.back();
  }
  
  
}
