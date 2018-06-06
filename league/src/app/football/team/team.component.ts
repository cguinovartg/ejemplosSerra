import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@allianz/core';
import { TeamService } from '../../../shared/services/team.service';
import { TeamDTO } from '../../../shared/interfaces/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public name: string;
  public description: string;
  public color: string;
  public stadium: boolean;
  public fans: boolean;
  public grass: boolean;
  public showMessage: boolean;

  constructor( private teamService: TeamService ) {
    this.color = '#DCDCDC';
    this.fans = true;
    this.showMessage = false;
  }

  cleanForm() {
    this.name = '';
    this.description = '';
    this.color = '';
    this.stadium = false;
    this.fans = false;
    this.grass = false;
  }
  ngOnInit() { }

  changeName(event) {
    if (event === '') {
      this.name = 'no name';
    } else {
      this.name = event;
    }
  }

  changeColor(event) {
    this.color = event;
  }

  changeStadium(event) {
    this.stadium = event;
  }

  changeFans(event) {
    this.fans = event;
  }

  changeGrass(event) {
    this.grass = event;
  }

  handleSubmit(form: TeamDTO, isValid: boolean) {
    if (isValid) {
      this.teamService.createTeam(form).subscribe((response) => {
        if (response.success) {
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);
          this.cleanForm();
        }
      });
    }
  }
}
