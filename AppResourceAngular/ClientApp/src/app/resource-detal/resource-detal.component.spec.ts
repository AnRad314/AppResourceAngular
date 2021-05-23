import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetalComponent } from './resource-detal.component';

describe('ResourceDetalComponent', () => {
  let component: ResourceDetalComponent;
  let fixture: ComponentFixture<ResourceDetalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
