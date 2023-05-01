import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-vacina-new',
  templateUrl: './modal-vacina-new.component.html',
  styleUrls: ['./modal-vacina-new.component.scss', '../../../commom-style.page.scss'],
})
export class ModalVacinaNewComponent implements OnInit {


  @Input()
  public pet = {} as any;

  @Input()
  public editingData = null as any;
  public formVacina!: FormGroup;
  public loadingTracker = false;

  public currentDate = new Date().toISOString();

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formVacina = new FormGroup({
      nextDate: new FormControl(!this.editingData ? this.currentDate : this.editingData.vaccine.nextDate),
      applicationDate: new FormControl(!this.editingData ? this.currentDate : this.editingData.vaccine.applicationDate),
      name: new FormControl(!this.editingData ? '': this.editingData.vaccine.name)
    });
  }

  async close() {
    await this.modalController.dismiss();
  }
  async save() {
    this.loadingTracker = true;
    let observable: Observable<any>;

    if (!this.editingData) {
      const request = {
        pet: this.pet.id,
        name: this.formVacina.value.name,
        nextDate: this.formVacina.value.nextDate.split('T')[0],
        applicationDate: this.formVacina.value.applicationDate.split('T')[0]
      };
      console.log(request);
      observable = this.http.post(`vaccines`, request);
    } else {
      observable = this.http.patch(`vaccines/${this.editingData.vaccine.id}`, this.formVacina.value);
    }

    observable.subscribe(
      async (res) => {
        this.pet = null;
        await this.modalController.dismiss();
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

}
