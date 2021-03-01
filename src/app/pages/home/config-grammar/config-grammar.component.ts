import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-config-grammar',
  templateUrl: './config-grammar.component.html',
  styleUrls: ['./config-grammar.component.scss']
})
export class ConfigGrammarComponent implements OnInit {

  // Used for showing the modal
  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>): void {
    // Show the modal
    this.modalRef = this.modalService.show(template);
  }
}
