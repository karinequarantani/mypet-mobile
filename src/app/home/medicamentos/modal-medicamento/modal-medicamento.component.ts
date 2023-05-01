import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMedicamentoNewComponent } from './modal-medicamento-new/modal-medicamento-new.component';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-modal-medicamento',
  templateUrl: './modal-medicamento.component.html',
  styleUrls: ['./modal-medicamento.component.scss', '../../commom-style.page.scss'],
})
export class ModalMedicamentoComponent implements OnInit {


  @Input()
  public pet = {} as any;
  public medications = [];
  public loadingTracker = false;
  public firstLoad = true;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.findAllVaccines();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async openModal($index, medication) {

    let editingData = null;


    if ($index !== null && medication){
      editingData = {
        $index,
        medication
      };
    }

    const modal = await this.modalController.create({
      component: ModalMedicamentoNewComponent,
      componentProps: {
        pet: this.pet,
        editingData
      }
    });

    modal.onWillDismiss().then(this.findAllVaccines);

    return modal.present();
  }

  public formatDate(data: string){
    return new Intl.DateTimeFormat('pt-br').format(new Date(`${data}T00:00:00`));
  }

  async removeMedicamento(medication) {
    this.loadingTracker = true;
    const observable = this.http.delete(`medications/${medication.id}`).subscribe(
      (res) => this.findAllVaccines(),
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  private findAllVaccines = () => {
    this.loadingTracker = true;
    return this.http.get<Pageable>(`medications/${this.pet.id}`).subscribe(
      (resp) => {
        this.medications = resp.content;
        if(this.medications.length === 0 && this.firstLoad) {
          this.firstLoad = false;
          this.openModal(null, null);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };
}
