import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataRequestService } from '../../shared/services/data-request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageType, NxPersistenceService } from '@allianz/core';
import { UserService } from '../../shared/services/user.service';
import { Mediator } from '../../shared/interfaces/mediator';
import { NxDatepickerLocaleObject } from '@allianz/epac/components/nx-epac-datepicker/datepicker-locale-object';
import { TranslateService } from '@allianz/core';
import * as moment from 'moment';

@Component({
  selector: 'app-query-requests',
  templateUrl: './query-requests.component.html',
  styleUrls: ['./query-requests.component.scss']
})
export class QueryRequestsComponent implements OnInit {

  public form: FormGroup;
  public user: Mediator;
  public tableColumns: any[];
  public tableData: any[];
  public perPage: number;
  public tableActions: any[];
  public agente7: string; // url param
  public uid: string; // url param
  public codes: string[];
  public states: any[];
  public types: any[];
  public getDataSearchError;
  public locale: NxDatepickerLocaleObject;

  constructor(
    public dr: DataRequestService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private persistence: NxPersistenceService,
    public translate: TranslateService
  ) {
    this.codes = [];
    this.tableActions = [
      { icon: 'product-eye-overview-sight', action: 'Details' }
    ];
    this.perPage = 5;
    this.tableData = [];
    this.states = [
      {value: ' ', text: 'QueryRequests.States.Both'},
      {value: 'P', text: 'QueryRequests.States.Pending'},
      {value: 'F', text: 'QueryRequests.States.Finalized'},
    ];
    this.types = [
      {value: 'combo.tipo.C', text: 'QueryRequests.Types.DGSCertificate'},
      {value: 'combo.tipo.fiscal', text: 'QueryRequests.Types.Fiscal'},
      {value: 'combo.tipo.polizasMov', text: 'QueryRequests.Types.PoliciesMov'},
      {value: 'combo.tipo.polizasCar', text: 'QueryRequests.Types.PolociesCar'},
      {value: 'combo.tipo.recibos', text: 'QueryRequests.Types.Receipts'},
      {value: 'combo.tipo.siniestros', text: 'QueryRequests.Types.Sinisters'},
      {value: 'combo.tipo.desglose', text: 'QueryRequests.Types.Breakdown'},
      {value: 'combo.tipo.L', text: 'QueryRequests.Types.Others'},
      {value: 'combo.tipo.todos', text: 'QueryRequests.Types.All'}
    ];
  }

  ngOnInit() {
    this.getDataTableTranslations();
    this.getDatepickerTranslations();
    this.agente7 = this.persistence.get('agente7', StorageType.SESSION);
    this.uid = this.persistence.get('uid', StorageType.SESSION);
    this.form = this.createForm();

    this.userService.getMediators(this.uid)
      .subscribe(response => {
        if (response.data) {
          this.user = response.data.find(element => element.agentNumber === this.agente7);
          response.data.forEach(mediator => {
            const code = mediator.agentNumber.concat('-').concat(mediator.accountManagerSubNumber);
            this.codes = [...this.codes, code];
          });
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
      status: ['', Validators.required],
      mediator: ['', Validators.required],
      type: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
    return formGroup;
  }

  public handleActionClick(actionClicked) {
    switch (actionClicked.action) {
      case 'Details':
        this.router.navigate(['query-requests/' + actionClicked.row.petitionNumber + '/details']);
        break;
      default:
        break;
    }
  }

  public clearForm() {
    this.form = this.createForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dr.getDataSearch(this.form.get('mediator').value.split('-', 1)[0],
        moment(this.form.get('dateFrom').value).format('DD/MM/YYYY'),
        moment(this.form.get('dateTo').value).format('DD/MM/YYYY'),
        `${this.perPage}`)
       .subscribe(response => {

         if (response.data) {
          this.tableData = response.data;
         } else {
          this.tableData = [];
          this.getDataSearchError = response.error;
         }
       });
    }
  }

  getDatepickerTranslations(): void {
    this.locale = {
      months3char: [],
      monthsFull: [],
      weekdays2char: [],
      weekdays3char: [],
      weekdaysFull: [],
      meridiemUppercase: [],
      meridiemLowercase: [],
      meridiemFull: [],
      title: '',
      dateFormat: ''
    };
    this.translate.get(['Datepicker'])
      .subscribe((res: any) => {
        console.log(res);
        this.locale.months3char = res.Datepicker.months3char;
        this.locale.monthsFull = res.Datepicker.monthsFull;
        this.locale.weekdays2char = res.Datepicker.weekdays2char;
        this.locale.weekdays3char = res.Datepicker.weekdays3char;
        this.locale.weekdaysFull = res.Datepicker.weekdaysFull;
        this.locale.meridiemUppercase = res.Datepicker.meridiemUppercase;
        this.locale.meridiemLowercase = res.Datepicker.meridiemLowercase;
        this.locale.meridiemFull = res.Datepicker.meridiemFull;
        this.locale.title = res.Datepicker.title;
        this.locale.dateFormat = res.Datepicker.dateFormat;
      });
  }

  getDataTableTranslations(): void {
    this.translate.get(['QueryRequests'])
      .subscribe((res: any) => {
        this.tableColumns = [
          { title: res.QueryRequests.DataRequestColumns.RequestNumber, key: 'petitionNumber', type: 'string', sortable: true },
          { title: res.QueryRequests.DataRequestColumns.RequestDate, key: 'creationDate', type: 'string', sortable: true },
          { title: res.QueryRequests.DataRequestColumns.RequestType, key: 'reportType', type: 'string', sortable: true },
          { title: res.QueryRequests.DataRequestColumns.State, key: 'status', type: 'string', sortable: true },
          { title: res.QueryRequests.DataRequestColumns.Description, key: 'text', type: 'string', sortable: true },
          { title: res.QueryRequests.DataRequestColumns.User, key: 'userId', type: 'string', sortable: true }
        ];
      });
  }
}
