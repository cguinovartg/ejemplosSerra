import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataRequestService } from '../../shared/services/data-request.service';
import { StorageType, NxPersistenceService } from '@allianz/core';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {

  public count = 0;

  constructor(private dr: DataRequestService,
              private storage: NxPersistenceService) {}

  ngOnInit() {
    this.getData();

    const variable = this.storage.get('keyContador', StorageType.MEMORY);
    if ( variable === undefined ||
         variable === '') {
         this.count = 1;
    } else {
      this.count = Number.parseInt(variable);
    }

    this.count++;

    this.storage.set('keyContador', this.count, {type: StorageType.MEMORY});
  }

  getData(): void {
//    this.dataService.getLanguagesData().subscribe(data => this.languageData = data);
  }
  add(e): void {
//    this.dataService.addLanguage(e).subscribe( data => this.getData());
  }
}
