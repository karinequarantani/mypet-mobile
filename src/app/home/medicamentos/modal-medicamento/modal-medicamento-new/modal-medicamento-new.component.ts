import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-medicamento-new',
  templateUrl: './modal-medicamento-new.component.html',
  styleUrls: ['./modal-medicamento-new.component.scss', '../../../commom-style.page.scss'],
})
export class ModalMedicamentoNewComponent implements OnInit {


  @Input()
  public pet = {} as any;

  @Input()
  public editingData = null as any;
  public formMedicamento!: FormGroup;
  public loadingTracker = false;

  public currentDate = new Date().toISOString();

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formMedicamento = new FormGroup({
      nextDate: new FormControl(!this.editingData ? this.currentDate : this.editingData.medication.nextDate),
      applicationDate: new FormControl(!this.editingData ? this.currentDate : this.editingData.medication.applicationDate),
      description: new FormControl(!this.editingData ? '': this.editingData.medication.description),
      name: new FormControl(!this.editingData ? '': this.editingData.medication.name)
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
        name: this.formMedicamento.value.name,
        description: this.formMedicamento.value.description,
        nextDate: this.formMedicamento.value.nextDate.split('T')[0],
        applicationDate: this.formMedicamento.value.applicationDate.split('T')[0]
      };
      console.log(request);
      observable = this.http.post(`medications`, request);
    } else {
      observable = this.http.patch(`medications/${this.editingData.medication.id}`, this.formMedicamento.value);
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
