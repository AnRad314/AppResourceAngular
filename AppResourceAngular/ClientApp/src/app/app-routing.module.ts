import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceDetalComponent } from './resource-detal/resource-detal.component';
import { ResourceAddComponent } from './resource-add/resource-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/resources', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent },
  { path: 'detail/:id', component: ResourceDetalComponent },
  { path: 'create', component: ResourceAddComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
