import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../resource';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-resource-detal',
  templateUrl: './resource-detal.component.html',
  styles: ['./resource-detal.component.css']
})

export class ResourceDetalComponent implements OnInit {
  //@Input() resource?: Resource;
  resource: Resource | undefined;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getResource();
  }
  getResource(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getResource(id)
      .subscribe(resource => this.resource = resource);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.resource) {
      this.dataService.updateResource(this.resource)
        .subscribe(() => this.goBack());
    }
  }
}
