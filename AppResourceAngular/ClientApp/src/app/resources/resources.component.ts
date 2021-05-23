import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource';
//import { RESOURCES } from '../mock-resources';
import { DataService } from '../data.service';

@Component({  
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styles: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  selectedResource?: Resource;
  constructor(private dataService: DataService) { }

  getResources(): void { this.dataService.getResources().subscribe(resources=> this.resources = resources) }

  ngOnInit() {
    this.getResources();
  }
  selectedRes?: Resource;
  onSelect(res: Resource): void {
    this.selectedResource = res;
  }
  delete(res: Resource): void {
    this.resources = this.resources.filter(h => h !== res);
    this.dataService.deleteResource(res.id).subscribe();
  }
}
