import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceDetalComponent } from './resource-detal/resource-detal.component';

const routes: Routes = [
  { path: '', redirectTo: '/resources', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent },
  { path: 'detail/:id', component: ResourceDetalComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
