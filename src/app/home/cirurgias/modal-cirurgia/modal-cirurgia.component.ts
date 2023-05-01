import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalSurgeriesNewComponent } from './modal-cirurgia-new/modal-cirurgia-new.component';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-modal-cirurgia',
  templateUrl: './modal-cirurgia.component.html',
  styleUrls: ['./modal-cirurgia.component.scss', '../../commom-style.page.scss'],
})
export class ModalCirurgiaComponent implements OnInit {


  @Input()
  public pet = {} as any;
  public surgeries = [];
  public loadingTracker = false;
  public firstLoad = true;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.findAllSurgeries();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async openModal($index, surgerie) {

   let editingData = null;


    if ($index !== null && surgerie){
      editingData = {
        $index,
        surgerie
      };
    }

    const modal = await this.modalController.create({
      component: ModalSurgeriesNewComponent,
      componentProps: {
        pet: this.pet,
        editingData
      }
    });

    modal.onWillDismiss().then(this.findAllSurgeries);

    return modal.present();
  }

  public formatDate(data: string){
    return new Intl.DateTimeFormat('pt-br').format(new Date(`${data}T00:00:00`));
  }

  async removeMedicamento(surgerie) {
    this.loadingTracker = true;
    const observable = this.http.delete(`surgeries/${surgerie.id}`).subscribe(
      (res) => this.findAllSurgeries(),
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  private findAllSurgeries = () => {
    this.loadingTracker = true;
    return this.http.get<Pageable>(`surgeries/${this.pet.id}`).subscribe(
      (resp) => {
        this.surgeries = resp.content;
        if(this.surgeries.length === 0 && this.firstLoad) {
          this.firstLoad = false;
          this.openModal(null, null);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };
}
