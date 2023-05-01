import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { ModalPetComponent } from './modal-pet/modal-pet.component';
import { Router } from '@angular/router';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-my-pets',
  templateUrl: 'my-pets.page.html',
  styleUrls: ['my-pets.page.scss', '../commom-style.page.scss'],
})
export class MyPets implements ViewWillEnter {

  public pets = [];
  public loadingTracker = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    this.findAllPets();
  }

  addPet() {
    this.router.navigate(['home','cadastrar']);
  }

  async openModal(pet) {
    const modal = await this.modalController.create({
      component: ModalPetComponent,
      componentProps: {
        pet
      }
    });

    modal.onWillDismiss().then(this.findAllPets);

    return modal.present();
  }

  private findAllPets = () => {
    this.loadingTracker = false;
    return this.http.get<Pageable>(`pets/${environment.TUTOR_ID}`).subscribe(
      (resp) => {
        this.pets = resp.content;
        if(this.pets.length === 0) {
          this.router.navigate(['home','cadastrar']);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };
}
