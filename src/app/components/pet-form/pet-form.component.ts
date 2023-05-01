/* eslint-disable radix */
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})
export class PetFormComponent implements OnInit, AfterViewInit {

  @Input()
  public pet = null;

  @Input()
  public showDeleteButton = false;

  @Input()
  public closeModal: () => void;
  public segment = 'data';
  public showFeedAmount = 0;
  public showWalkAmount = 0;

  public currentDate = new Date().toISOString();
  public loadingTracker = false;

  public form!: FormGroup;

  private currentTypeAnimal;
  private currentTypeSex;


  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    console.log(this.pet);
    this.showFeedAmount = this.pet?.secondFeeding ? 2 : this.pet?.firstFeeding ? 1 : 0;
    this.showWalkAmount = this.pet?.secondWalk ? 2 : this.pet?.firstWalk ? 1 : 0;

    this.form = new FormGroup({
      breed: new FormControl(this.pet?.breed || 'canina'),
      gender: new FormControl(this.pet?.gender || 'masculino'),
      name: new FormControl(this.pet?.name || ''),
      specie: new FormControl(this.pet?.specie || ''),
      vaccines: new FormControl(this.pet?.vaccinas || []),
      medicaments: new FormControl(this.pet?.medicaments || []),
      birthday: new FormControl(this.pet?.birthday || this.currentDate),
      amount: new FormControl(this.pet?.amount || ''),
      rationBrand: new FormControl(this.pet?.rationBrand || ''),
      feedName: new FormControl(this.pet?.feedName || ''),
      firstFeeding: new FormControl(this.pet?.firstFeeding || null),
      secondFeeding: new FormControl(this.pet?.secondFeeding || null),
      firstWalk: new FormControl(this.pet?.firstWalk || null),
      secondWalk: new FormControl(this.pet?.secondWalk || null),
    });

  }

  ngAfterViewInit(){
    this.currentTypeAnimal = this.pet?.breed || 'canina';
    this.currentTypeSex = this.pet?.gender || 'masculino';

    this.addClassSelected(`#radio-${this.currentTypeAnimal}`);
    this.addClassSelected(`#radio-sex-${this.currentTypeSex}`);
  }

  public addFeed() {
    this.showFeedAmount = this.showFeedAmount + 1;
    this.form.controls[this.showFeedAmount > 1 ? 'secondFeeding' : 'firstFeeding'].setValue(this.currentDate);
  }

  public removeFeed(field: string) {
    this.showFeedAmount = this.showFeedAmount - 1;
    this.form.controls[field].setValue(null);
  }

  public addWalk() {
    this.showWalkAmount = this.showWalkAmount + 1;
    this.form.controls[this.showWalkAmount > 1 ? 'secondWalk' : 'firstWalk'].setValue(this.currentDate);
  }

  public removeWalk(field: string) {
    this.showWalkAmount = this.showWalkAmount - 1;
    this.form.controls[field].setValue(null);
  }

  public getHour(date: string) {
    console.log(date);
    const today = new Date();
    console.log(today);
    if(date) {
      const hours = date.includes('T') ? date.split('T')[1].split(':') : date.split(':');
      today.setHours(parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2]) || 0);
    }
    console.log(today);
    return date ? today.toLocaleString('default', {hour: 'numeric',minute: 'numeric',second: 'numeric'}) : date;
  }

  public save() {
    this.loadingTracker = true;

    const body = { ...this.form.value,
                    tutorId: environment.TUTOR_ID };

    body.birthday = body.birthday.split('T')[0];
    body.firstFeeding = this.getHour(body.firstFeeding);
    body.secondFeeding = this.getHour(body.secondFeeding);
    body.firstWalk = this.getHour(body.firstWalk);
    body.secondWalk = this.getHour(body.secondWalk);

    const observable: Observable<any> = this.pet?.id
      ? this.http.patch(`pets/${this.pet.id}`, body)
      : this.http.post('pets', body);

    observable.subscribe(
      (res) => {
        if (!!this.closeModal) {return this.closeModal();}

        this.pet = null;
        this.form.reset();
        this.segment = 'data';
        this.showFeedAmount = 0;
        this.showWalkAmount = 0;

        this.router.navigate(['home','my-pets']);

      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  public remove() {
    this.loadingTracker = true;

    this.http.delete(`pets/${this.pet.id}`).subscribe(
      (res) => {
        if (!!this.closeModal) {this.closeModal();}
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  public changeTypeAnimal(event) {
    event.currentTarget.querySelector(`#radio-${this.currentTypeAnimal}`)?.classList.remove('selected');
    event.currentTarget.querySelector(`#radio-${event.detail?.value}`)?.classList.add('selected');
    this.currentTypeAnimal = event.detail?.value;
  }

  public changeTypeSex(event) {
    event.currentTarget.querySelector(`#radio-sex-${this.currentTypeSex}`)?.classList.remove('selected');
    event.currentTarget.querySelector(`#radio-sex-${event.detail?.value}`)?.classList.add('selected');
    this.currentTypeSex = event.detail?.value;
  }

  private addClassSelected = (id: string) => {
    document.querySelector(id).classList.value = '';
    document.querySelector(id).classList.value = 'selected';
  };

}
