import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() table = {}
  @Input() strategy;

  constructor() { }

  ngOnInit(): void {
  }

  keys() {
    return Object.keys(this.table);
  }

  length(): number {
    if(this.keys().length === 0) {
      return 0;
    }
    return this.table[this.keys()[0]].length;
  }

  range(): number[] {
    let arr = [];
    const len = this.length();
    for(let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }

}
