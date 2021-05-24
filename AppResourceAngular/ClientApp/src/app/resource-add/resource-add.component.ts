import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
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
    private location: Location
  )
  {
    this.baseUrl = baseUrl;
  }

  add(res: string): void {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    if (res.length >= 3 && res.length <=300) {
      this.http.post(this.baseUrl + 'api/resources', JSON.stringify(res), { headers: headers })
        .subscribe(result => {
          this.goBack();
        }, error => console.error(error));
    }
    }   

  goBack(): void {
    this.location.back();
  }   
}
