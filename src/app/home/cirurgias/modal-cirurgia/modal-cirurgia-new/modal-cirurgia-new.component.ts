import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-cirurgia-new',
  templateUrl: './modal-cirurgia-new.component.html',
  styleUrls: ['./modal-cirurgia-new.component.scss', '../../../commom-style.page.scss'],
})
export class ModalSurgeriesNewComponent implements OnInit {


  @Input()
  public pet = {} as any;

  @Input()
  public editingData = null as any;
  public formCirurgia!: FormGroup;
  public loadingTracker = false;

  public currentDate = new Date().toISOString();

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formCirurgia = new FormGroup({
      date: new FormControl(!this.editingData ? this.currentDate : this.editingData.surgerie.date),
      vet: new FormControl(!this.editingData ? '': this.editingData.surgerie.vet),
      name: new FormControl(!this.editingData ? '': this.editingData.surgerie.name)
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
        name: this.formCirurgia.value.name,
        vet: this.formCirurgia.value.vet,
        date: this.formCirurgia.value.date.split('T')[0]
      };
      observable = this.http.post(`surgeries`, request);
    } else {
      observable = this.http.patch(`surgeries/${this.editingData.surgerie.id}`, this.formCirurgia.value);
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
