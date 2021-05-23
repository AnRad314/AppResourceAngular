import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceDetalComponent } from './resource-detal/resource-detal.component';
import { AppRoutingModule } from './app-routing.module';
import { ResourceAddComponent } from './resource-add/resource-add.component';

@NgModule({
  declarations: [
    AppComponent, 
    ResourcesComponent,
    ResourceDetalComponent,
    ResourceAddComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,    
    FormsModule,   
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
