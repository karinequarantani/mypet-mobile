import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCaminhadaComponent } from './modal-caminhada/modal-caminhada.component';


interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-caminhadas',
  templateUrl: 'caminhadas.page.html',
  styleUrls: ['caminhadas.page.scss', '../commom-style.page.scss'],
})
export class CaminhadasPage implements OnInit {

  public pets = [];
  public loadingTracker = false;


  constructor(private modalController: ModalController,
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.findAllPets();
  }

  async openModal(pet) {
    const modal = await this.modalController.create({
      component: ModalCaminhadaComponent,
      componentProps: {
        pet
      }
    });
    return await modal.present();
  }

  private findAllPets = () => {
    this.loadingTracker = false;
    return this.http.get<Pageable>(`pets/${environment.TUTOR_ID}`).subscribe(
      (resp) => this.pets = resp.content,
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };

}
