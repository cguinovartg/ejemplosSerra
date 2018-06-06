import { Component, Input, OnInit } from '@angular/core';
import { Mediator } from '../../interfaces/mediator';

@Component({
  selector: 'app-sh-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  public displayName: string;

  @Input() user: Mediator;

  constructor() {
    this.displayName = '';
  }

  ngOnInit() {
    this.displayName = this.user.lastName + ', ' + this.user.firstName;
  }

}
