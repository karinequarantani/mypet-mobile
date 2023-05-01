import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-peso-new',
  templateUrl: './modal-peso-new.component.html',
  styleUrls: ['./modal-peso-new.component.scss', '../../../commom-style.page.scss'],
})
export class ModalWeightNewComponent implements OnInit {


  @Input()
  public pet = {} as any;

  @Input()
  public editingData = null as any;
  public formPeso!: FormGroup;
  public loadingTracker = false;

  public currentDate = new Date().toISOString();

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formPeso = new FormGroup({
      date: new FormControl(!this.editingData ? this.currentDate : this.editingData.weight.date),
      weight: new FormControl(!this.editingData ? '': this.editingData.weight.weight)
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
        petId: this.pet.id,
        weight: this.formPeso.value.weight,
        date: this.formPeso.value.date.split('T')[0]
      };
      observable = this.http.post(`weight`, request);
    } else {
      observable = this.http.patch(`weight/${this.editingData.weight.id}`, this.formPeso.value);
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
