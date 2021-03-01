import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomeModule {
}
