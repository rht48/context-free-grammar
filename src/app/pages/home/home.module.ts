import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigGrammarComponent } from './components/config-grammar/config-grammar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CalcGrammarComponent } from './components/calc-grammar/calc-grammar.component';
import { TableComponent } from './components/table/table.component';

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
    ConfigGrammarComponent,
    CalcGrammarComponent,
    TableComponent
  ]
})
export class HomeModule {
}
