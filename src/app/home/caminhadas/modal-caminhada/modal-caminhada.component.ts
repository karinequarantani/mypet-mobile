import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalWalksNewComponent } from './modal-caminhada-new/modal-caminhada-new.component';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-modal-caminhada',
  templateUrl: './modal-caminhada.component.html',
  styleUrls: ['./modal-caminhada.component.scss', '../../commom-style.page.scss'],
})
export class ModalCaminhadaComponent implements OnInit {


  @Input()
  public pet = {} as any;
  public walks = [];
  public loadingTracker = false;
  public firstLoad = true;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.findAllWalks();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async openModal($index, walk) {

   let editingData = null;


    if ($index !== null && walk){
      editingData = {
        $index,
        walk
      };
    }

    const modal = await this.modalController.create({
      component: ModalWalksNewComponent,
      componentProps: {
        pet: this.pet,
        editingData
      }
    });

    modal.onWillDismiss().then(this.findAllWalks);

    return modal.present();
  }

  public formatDate(data: string){
    return new Intl.DateTimeFormat('pt-br').format(new Date(data));
  }

  async removeMedicamento(walk) {
    this.loadingTracker = true;
    const observable = this.http.delete(`walk/${walk.id}`).subscribe(
      (res) => this.findAllWalks(),
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  private findAllWalks = () => {
    this.loadingTracker = true;
    return this.http.get<Pageable>(`walk/${this.pet.id}`).subscribe(
      (resp) => {
        this.walks = resp.content;
        if(this.walks.length === 0 && this.firstLoad) {
          this.firstLoad = false;
          this.openModal(null, null);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };
}
