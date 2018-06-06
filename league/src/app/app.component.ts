import { Component, AfterViewChecked, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NxEpacParamsService, NxEpacResizeService, NxEpacNavigationObject } from '@allianz/epac';
import { TranslateService, NxPersistenceService, StorageType } from '@allianz/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  private urlHelp = `${environment.base_url}/rws-bff-boilerplate/api/application-header-help`;

  private navigationObject: NxEpacNavigationObject;
  private nxActive: string;
  public translations;
  private language;

  constructor(
    private router: Router,
    private params: NxEpacParamsService,
    private resizeService: NxEpacResizeService,
    private translate: TranslateService,
    private persistence: NxPersistenceService
  ) {

  }

  ngOnInit(): void {
    this.translate.get(['Header.Football',
      'Header.Classification',
      'Header.Team',
      'Header.Help',
      'Header.Print'])
      .subscribe((res: string) => {
        this.translations = res;
        console.log(res);
        this.navigationObject = {
          routes: [{
            id: '1',
            name: this.translations['Header.Football'],
            children: [{
              id: '11',
              name: this.translations['Header.Classification'],
              routerLink: 'football/classification'
            }, {
              id: '12',
              name: this.translations['Header.Team'],
              routerLink: '/football/team'
            }]
          }]
        };
      });

    this.nxActive = '11';
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
