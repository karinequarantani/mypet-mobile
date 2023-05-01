import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicamentosPage } from './medicamentos.page';
import { CardListItemComponentModule } from 'src/app/components/card-list-item-pet/card-list-item.module';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalMedicamnetoModule } from './modal-medicamento/modal-medicamento.module';
import { ModalMedicamentoNewModule } from './modal-medicamento/modal-medicamento-new/modal-medicamento-new.module';

// import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardListItemComponentModule,
    ModalMedicamnetoModule,
    ModalMedicamentoNewModule,
    SpinnerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: MedicamentosPage
      }
    ])
  ],
  declarations: [MedicamentosPage]
})
export class MedicamentosModule { }
