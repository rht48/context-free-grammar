import { Component, OnInit, Pipe, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CalculationsService } from '../services/calculations.service';
import { GrammarService } from '../services/grammar.service';

@Component({
  selector: 'app-config-grammar',
  templateUrl: './config-grammar.component.html',
  styleUrls: ['./config-grammar.component.scss']
})
export class ConfigGrammarComponent implements OnInit {

  // Used for showing the modal
  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService,
              private grammarService: GrammarService,
              private calculationsService: CalculationsService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>): void {
    // Show the modal
    this.modalRef = this.modalService.show(template);
  }

  hideModal(): void {
    this.modalRef.hide();
  }

  saveGrammar(): void {
    const grammar = this.grammarService.getGrammar();
    this.hideModal();
    this.calculationsService.setGrammar(grammar);
  }

  parse(input: string): void {
    this.grammarService.parse(input);
  }

  
}
