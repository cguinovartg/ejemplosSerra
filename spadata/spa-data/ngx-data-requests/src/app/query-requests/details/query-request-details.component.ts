import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService, NxPersistenceService, StorageType } from '@allianz/core';
import { UserService } from '../../../shared/services/user.service';
import { DataRequestService } from '../../../shared/services/data-request.service';
import { Mediator } from '../../../shared/interfaces/mediator';

@Component({
  selector: 'app-query-request-details',
  templateUrl: './query-request-details.component.html',
  styleUrls: ['./query-request-details.component.scss']
})
export class QueryRequestDetailsComponent implements OnInit {

  form: FormGroup;
  user: Mediator;
  detailData;
  requestId: number;
  agente7: string; // url param
  uid: string; // url param

  constructor(
    private dr: DataRequestService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private persistence: NxPersistenceService
  ) { }

  ngOnInit() {

    this.agente7 = this.persistence.get('agente7', StorageType.SESSION);
    this.uid = this.persistence.get('uid', StorageType.SESSION);

    this.activeRoute.params.subscribe((params: Params) => {
      this.requestId = + params['petitionNumber'];
      this.dr.getDataDetail(this.requestId)
        .subscribe((detailResponse) => {
          // Obtain one mediator
          this.userService.getMediators(this.uid)
            .subscribe(response => {
              this.detailData = detailResponse.data;
              this.user = response.data.find(element => element.agentNumber === this.agente7);
              this.form = this.createForm(this.user);
            });
        });
    });
  }

  private createForm(user: Mediator) {

    const formGroup = this.fb.group({
      agentForm: this.fb.group({
        mediator: user.agentNumber,
        name: [user.lastName + ', ' + user.firstName || '', Validators.required],
        email: [user.email || '', Validators.pattern('[a-z0-9.@]*')],
      }),
      requestDataForm: this.fb.group({
        petitionNumber: [this.detailData.petitionNumber],
        petitionDate: [this.detailData.petitionDate],
        startDate: [this.detailData.startDate],
        sucursal: [this.detailData.sucursal],
        format: [this.detailData.format],
        petitionType: [this.detailData.petitionType],
        policy: [this.detailData.policy],
        subAgentNumber: [this.detailData.subAgentNumber],
        receipt: [this.detailData.receipt],
        result: [this.detailData.result],
        name: [this.detailData.name],
        text: [this.detailData.text],
        email: [this.detailData.email],
        origin: [this.detailData.origin],
        typeSelectionDate: [this.detailData.typeSelectionDate],
        status: [this.detailData.status],
        userId: [this.detailData.userId],
        endDate: [this.detailData.endDate],
        mediador: [this.detailData.mediador],
        product: [this.detailData.product],
        extractionType: [this.detailData.extractionType],
        code: [this.detailData.code],
        subAgentPresence: [this.detailData.subAgentPresence],
        downloadDate: [this.detailData.downloadDate],
        visible: [this.detailData.visible],
        active: [this.detailData.active],
      })
    });

    return formGroup;
  }

  public backToList() {
    this.router.navigate(['/query-requests']);
  }
}
