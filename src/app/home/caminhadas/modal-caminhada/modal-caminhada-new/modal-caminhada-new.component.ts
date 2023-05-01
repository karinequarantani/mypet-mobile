import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-caminhada-new',
  templateUrl: './modal-caminhada-new.component.html',
  styleUrls: ['./modal-caminhada-new.component.scss', '../../../commom-style.page.scss'],
})
export class ModalWalksNewComponent implements OnInit {


  @Input()
  public pet = {} as any;

  @Input()
  public editingData = null as any;
  public formCaminhada!: FormGroup;
  public loadingTracker = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formCaminhada = new FormGroup({
      distance: new FormControl(!this.editingData ? '' : this.editingData.walk.distance),
      time: new FormControl(!this.editingData ? '': this.editingData.walk.time),
      date: new FormControl(!this.editingData ? '': this.editingData.walk.date)
    });
  }

  async close() {
    await this.modalController.dismiss();
  }
  async save() {
    this.loadingTracker = true;
    let observable: Observable<any>;

    const request = {
      petId: this.pet.id,
      distance: this.formCaminhada.value.distance,
      time: this.formCaminhada.value.time,
      date: new Date(this.formCaminhada.value.date).toISOString()
    };
    if (!this.editingData) {
      observable = this.http.post(`walk`, request);
    } else {
      observable = this.http.patch(`walk/${this.editingData.walk.id}`, request);
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
