import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardListItemComponentModule } from 'src/app/components/card-list-item-pet/card-list-item.module';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { CirurgiasPage } from './cirurgias.page';
import { ModalSurgeriesModule } from './modal-cirurgia/modal-cirurgia.module';
import { ModalSurgeriesNewModule } from './modal-cirurgia/modal-cirurgia-new/modal-cirurgia-new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardListItemComponentModule,
    ModalSurgeriesModule,
    ModalSurgeriesNewModule,
    SpinnerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: CirurgiasPage
      }
    ])
  ],
  declarations: [CirurgiasPage]
})
export class CirurgiasModule { }
