import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-backitem',
  templateUrl: './backitem.component.html',
  styleUrls: ['./backitem.component.css']
})
export class BackitemComponent implements OnInit {
  @Input() _backs: any
  constructor() { }

  ngOnInit() {
  }



}
