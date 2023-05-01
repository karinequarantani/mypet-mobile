import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardListItemComponentModule } from 'src/app/components/card-list-item-pet/card-list-item.module';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { PesoPage } from './peso.page';
import { ModalWeightModule } from './modal-peso/modal-peso.module';
import { ModalWeightNewModule } from './modal-peso/modal-peso-new/modal-peso-new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardListItemComponentModule,
    ModalWeightModule,
    ModalWeightNewModule,
    SpinnerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: PesoPage
      }
    ])
  ],
  declarations: [PesoPage]
})
export class PesoModule { }
