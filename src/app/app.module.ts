import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarService } from './cars/carservice';
import { MibsService } from './services/mibs.service';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ CarService, MibsService ]
})
export class AppModule { }
