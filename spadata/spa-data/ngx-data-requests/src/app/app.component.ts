import { Component, AfterViewChecked, OnInit, HostListener, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { NxEpacParamsService, NxEpacResizeService, NxEpacNavigationObject } from '@allianz/epac';
import { TranslateService, NxPersistenceService, StorageType } from '@allianz/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  public urlHelp = `${environment.base_url}/rws-data-requests/api/application-header-help`;

  private navigationObject: NxEpacNavigationObject;
  private nxActive: string;
  public translations;

  constructor(
    private router: Router,
    private params: NxEpacParamsService,
    private resizeService: NxEpacResizeService,
    private translate: TranslateService,
    private persistence: NxPersistenceService
  ) {

  }

  ngOnInit(): void {
    this.translate.get(['Header.PetitionType', 'Header.DGS', 'Header.Policies', 'Header.Receipts',
      'Header.Claims', 'Header.Breakdown', 'Header.OtherPetitions', 'Header.QueryRequests',
      'Header.Help', 'Header.Print'])
      .subscribe((res: string) => {
        this.translations = res;
        this.navigationObject = {
          routes: [{
            id: '1',
            name: this.translations['Header.PetitionType'],
            children: [{
              id: 'DGS',
              name: this.translations['Header.DGS'],
              routerLink: '/request-type/general-directorate-security'
            }, {
              id: 'POLIZA',
              name: this.translations['Header.Policies'],
              routerLink: '/request-type/policies'
            }, {
              id: 'RECIBOS',
              name: this.translations['Header.Receipts'],
              routerLink: '/request-type/receipts'
            }, {
              id: 'SINIESTROS',
              name: this.translations['Header.Claims'],
              routerLink: '/request-type/sinisters'
            }, {
              id: 'DESGLOSE',
              name: this.translations['Header.Breakdown'],
              routerLink: '/request-type/breakdown'
            }, {
              id: 'OTROS',
              name: this.translations['Header.OtherPetitions'],
              routerLink: '/request-type/other-request'
            }]
          }, {
            id: 'CONSULTAS',
            name: this.translations['Header.QueryRequests'],
            routerLink: '/query-requests'
          }]
        };
      });

    this.nxActive = 'DGS';
  }

  calculateHeight(): any {
    const height = Math.max(document.body.scrollHeight,
      document.body.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight);
    return height;
  }

  ngAfterViewChecked() {
    const height = this.calculateHeight();
    let height2;

    if (height !== height2) {
      this.resizeService.resizeIframe();
      height2 = this.calculateHeight();
    }
  }
}
