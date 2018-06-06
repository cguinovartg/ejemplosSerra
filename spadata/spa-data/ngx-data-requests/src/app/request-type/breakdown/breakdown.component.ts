import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, NxPersistenceService, StorageType } from '@allianz/core';
import { UserService } from '../../../shared/services/user.service';
import { Mediator } from '../../../shared/interfaces/mediator';
import { ValidatePolicyId } from '../../../shared/validators/policy.validator';
import { ValidateReceiptId } from '../../../shared/validators/receipt.validator';
import * as moment from 'moment';
import { DataRequestDTO } from '../../../shared/interfaces/dataRequestdto';
import { DataRequestService } from '../../../shared/services/data-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit, AfterContentInit {

  public form: FormGroup;
  public user: Mediator;
  public dto: DataRequestDTO;
  public agente7: string; // url param
  public uid: string; // url param
  public requestResult: string;
  public requestMessage: string;
  public showMessage: boolean;

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

  ngAfterContentInit() {
    this.form.get('petitionForm').get('policyNumber').setAsyncValidators([
      ValidatePolicyId.createValidator(this.dataRequestService)
    ]);
    this.form.get('petitionForm').get('receiptNumber').setAsyncValidators([
      ValidateReceiptId.createValidator(this.dataRequestService)
    ]);
  }

  private createForm() {
    const formGroup = this.fb.group({
      identificationForm: this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required]
      }),
      petitionForm: this.fb.group({
        policyNumber: ['', Validators.required],
        receiptNumber: ['', Validators.required]
      })
    });
    return formGroup;
  }

  private clearForm() {
    this.form = this.createForm();
  }

  onSubmit({ value, valid }: { value, valid: boolean }) {
    this.dto = new DataRequestDTO();
    this.fillRequiredBackendData();
    this.dto.code = value.identificationForm.code.split('-', 1)[0];
    this.dto.documentDescription = value.identificationForm.description;
    this.dto.creator = this.uid;
    this.dto.policyTypeGroup = value.petitionForm.policyNumber.toString();
    this.dto.receipt = value.petitionForm.receiptNumber.toString();
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
