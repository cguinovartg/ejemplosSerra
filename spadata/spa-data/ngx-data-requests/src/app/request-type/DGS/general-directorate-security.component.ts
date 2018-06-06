import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { NxPersistenceService, StorageType } from '@allianz/core';
import { DataRequestDTO } from './../../../shared/interfaces/dataRequestdto';
import { DataRequestService } from './../../../shared/services/data-request.service';
import { UserService } from '../../../shared/services/user.service';
import { Mediator } from '../../../shared/interfaces/mediator';

@Component({
  selector: 'app-general-directorate-security',
  templateUrl: './general-directorate-security.component.html',
  styleUrls: ['./general-directorate-security.component.scss']
})

export class GeneralDirectorateSecurityComponent implements OnInit {

  public form: FormGroup;
  public user: Mediator;
  public dto: DataRequestDTO;
  public agente7: string;
  public uid: string;
  public requestResult: string;
  public requestMessage: string;
  public showMessage: boolean;

  public formats: Array<Object> = [
    { name: 'Content.Format.Model', value: '-1' },
    { name: 'Content.Format.File', value: '0' },
    { name: 'Content.Format.Pdf', value: '1' },
    { name: 'Content.Format.Csv', value: '2' },
    { name: 'Content.Format.Xml', value: '3' },
    { name: 'Content.Format.Xls', value: '4' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private dataRequestService: DataRequestService,
    private persistence: NxPersistenceService
  ) {
    this.showMessage = false;
  }

  ngOnInit() {

    this.agente7 = this.persistence.get('agente7', StorageType.SESSION);
    this.uid = this.persistence.get('uid', StorageType.SESSION);
    this.form = this.createForm();

    this.userService.getMediators(this.uid)
      .subscribe(response => {
        // Obtain mediator info
        if (response.data) {
          this.user = response.data.find(element => element.agentNumber === this.agente7);
          if (!this.user) {
            throw(new Error('Cannot find user with agent code: ' + this.agente7));
          }
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              errMsg: response.error,
            }
          });
        }
      });
  }

  private createForm() {
    const formGroup = this.fb.group({
      identificationForm: this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required]
      }),
      content: this.fb.group({
        format: ['', Validators.required]
      }),
      interval: this.fb.group({
        interval: '',
        trimester: '',
        dateFrom: '',
        dateTo: '',
        typeDateSel: '',
        fiscalYear: '',
        informationCriterion: ''
      })
    });
    return formGroup;
  }

  private clearForm() {
    this.form = this.createForm();
  }

  onDateFromChange(event: Date) {
    this.form.get('interval').get('dateFrom').setValue(event);
  }

  onDateToChange(event: Date) {
    this.form.get('interval').get('dateTo').setValue(event);
  }

  onSubmit({ value, valid }: { value, valid: boolean }) {
    this.dto = new DataRequestDTO();
    this.fillRequiredBackendData();
    this.dto.code = value.identificationForm.code.split('-', 1)[0];
    this.dto.creator = this.uid;
    this.dto.dateFrom = moment(value.interval.dateFrom).format('DD/MM/YYYY');
    this.dto.dateTo = moment(value.interval.dateTo).format('DD/MM/YYYY');
    this.dto.documentDescription = value.identificationForm.description;
    this.dto.format = value.content.format;
    this.dto.trimester = value.interval.trimester;
    this.dto.year = value.interval.fiscalYear;
    this.dto.criteriaInfo = value.interval.informationCriterion;
    this.dataRequestService.postCreateDataRequest(this.dto)
      .subscribe((response: any) => {
        if (response.success) {
          this.clearForm();
          this.requestResult = 'success';
          this.requestMessage = 'CorrectlySaved';
        } else {
          this.requestResult = 'error';
          this.requestMessage = 'ErrorSaving';
        }
        this.showMessage = true;
      });
  }

  /**
   * Required data to call backend service successfully
   */
  fillRequiredBackendData(): void {
    this.dto.data = '';
    this.dto.documentChannel = '';
    this.dto.format = '';
  }
}
