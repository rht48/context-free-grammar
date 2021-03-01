import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigGrammarComponent } from './config-grammar/config-grammar.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    ConfigGrammarComponent
  ]
})
export class HomeModule {
}
