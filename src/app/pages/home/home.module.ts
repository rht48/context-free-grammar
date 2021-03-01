import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigGrammarComponent } from './config-grammar/config-grammar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
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
