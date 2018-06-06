import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, NxPersistenceService, StorageType } from '@allianz/core';
import { UserService } from '../../../shared/services/user.service';
import { Mediator } from '../../../shared/interfaces/mediator';
import { DataRequestDTO } from '../../../shared/interfaces/dataRequestdto';
import * as moment from 'moment';
import { DataRequestService } from '../../../shared/services/data-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html',
  styleUrls: ['./sinisters.component.scss']
})
export class SinistersComponent implements OnInit {

  public form: FormGroup;
  public user: Mediator;
  public dto: DataRequestDTO;
  public agente7: string;
  public uid: string;
  public requestResult: string;
  public requestMessage: string;
  public showMessage: boolean;

  formats: Array<Object> = [
    { name: 'Content.Format.Model', value: '1' },
    { name: 'Content.Format.File', value: '2' },
    { name: 'Content.Format.Pdf', value: '1' },
    { name: 'Content.Format.Csv', value: '2' },
    { name: 'Content.Format.Xml', value: '3' },
    { name: 'Content.Format.Xls', value: '3' }
  ];

  records: Array<Object> = [
    { name: 'Content.Records.Occurred', value: '1' },
    { name: 'Content.Records.Declared', value: '2' },
    { name: 'Content.Records.Closed', value: '3' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private persistence: NxPersistenceService,
    private dataRequestService: DataRequestService
  ) { }

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
        typeCode: ['', Validators.required],
        code: ['', Validators.required],
        description: ['', Validators.required]
      }),
      content: this.fb.group({
        format: '',
        records: '',
      }),
      interval: this.fb.group({
        interval: '',
        trimester: '',
        dateFrom: '',
        dateTo: '',
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
    this.dto.documentType = value.identificationForm.typeCode;
    this.dto.documentDescription = value.identificationForm.description;
    this.dto.creator = this.uid;

    this.dto.format = value.content.format;
    this.dto.register = value.content.records;

    this.dto.dateFrom = moment(value.interval.dateFrom).format('DD/MM/YYYY');
    this.dto.dateTo = moment(value.interval.dateTo).format('DD/MM/YYYY');

    this.dto.trimester = value.interval.trimester;

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
