import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPesoComponent } from './modal-peso/modal-peso.component';


interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-peso',
  templateUrl: 'peso.page.html',
  styleUrls: ['peso.page.scss', '../commom-style.page.scss'],
})
export class PesoPage implements OnInit {

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
      component: ModalPesoComponent,
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
