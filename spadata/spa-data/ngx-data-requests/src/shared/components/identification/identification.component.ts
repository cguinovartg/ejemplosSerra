import { Mediator } from './../../interfaces/mediator';
import { UserService } from './../../services/user.service';
import { TypeCode } from './../../interfaces/type-code';
import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxPersistenceService, StorageType } from '@allianz/core';

@Component({
  selector: 'app-sh-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  @Input() typecode: boolean; // true to show typecode, false to hide
  @Input() code: boolean; // true to show code, false to hide

  public typeCodes: Array<TypeCode>;
  public codes: string[];
  public uid: string;

  constructor(
    public controlContainer: ControlContainer,
    private userService: UserService,
    private persistence: NxPersistenceService
  ) {
    this.codes = [];
    this.uid = this.persistence.get('uid', StorageType.SESSION);
    this.typeCodes = [
      {
        id: '0',
        title: 'MEDIADOR'
      },
      {
        id: '1',
        title: 'TODOS'
      },
      {
        id: '2',
        title: 'TODOS_CIA'
      }
    ];
  }

  ngOnInit() {
    // Obtain formatted codes from mediators
    this.userService.getMediators(this.uid)
      .subscribe(response => {
        response.data.forEach(mediator => {
          const code = mediator.agentNumber.concat('-').concat(mediator.accountManagerSubNumber);
          this.codes = [...this.codes, code];
        });
      });
  }

}
