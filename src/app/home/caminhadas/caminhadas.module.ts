import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardListItemComponentModule } from 'src/app/components/card-list-item-pet/card-list-item.module';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { CaminhadasPage } from './caminhadas.page';
import { ModalWalksModule } from './modal-caminhada/modal-caminhada.module';
import { ModalWalksNewModule } from './modal-caminhada/modal-caminhada-new/modal-caminhada-new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardListItemComponentModule,
    ModalWalksModule,
    ModalWalksNewModule,
    SpinnerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: CaminhadasPage
      }
    ])
  ],
  declarations: [CaminhadasPage]
})
export class CaminhadasModule { }
