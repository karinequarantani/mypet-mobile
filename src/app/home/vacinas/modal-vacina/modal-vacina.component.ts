import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalVacinaNewComponent } from './modal-vacina-new/modal-vacina-new.component';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-modal-vacina',
  templateUrl: './modal-vacina.component.html',
  styleUrls: ['./modal-vacina.component.scss', '../../commom-style.page.scss'],
})
export class ModalVacinaComponent implements OnInit {


  @Input()
  public pet = {} as any;
  public vaccines = [];
  public loadingTracker = false;
  public firstLoad = true;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.findAllVaccines();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async openModal($index, vaccine) {

    let editingData = null;


    if ($index !== null && vaccine){
      editingData = {
        $index,
        vaccine
      };
    }

    const modal = await this.modalController.create({
      component: ModalVacinaNewComponent,
      componentProps: {
        pet: this.pet,
        editingData
      }
    });

    modal.onWillDismiss().then(this.findAllVaccines);

    return modal.present();
  }

  public formatVaccine(data: string){
    return new Intl.DateTimeFormat('pt-br').format(new Date(`${data}T00:00:00`));
  }

  async removeVacina(vaccine) {
    this.loadingTracker = true;
    const observable = this.http.delete(`vaccines/${vaccine.id}`).subscribe(
      (res) => this.findAllVaccines(),
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  private findAllVaccines = () => {
    this.loadingTracker = true;
    return this.http.get<Pageable>(`vaccines/${this.pet.id}`).subscribe(
      (resp) => {
        this.vaccines = resp.content;
        if(this.vaccines.length === 0 && this.firstLoad) {
          this.firstLoad = false;
          this.openModal(null, null);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };
}
