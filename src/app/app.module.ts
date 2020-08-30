import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepItemComponent } from './components/step-item/step-item.component';
import {StepItemService} from './services/step-item.service';
import {Item} from './Models/item';
@NgModule({
  declarations: [
    AppComponent,
    StepItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StepItemService,Item],
  bootstrap: [AppComponent]
})
export class AppModule { }
