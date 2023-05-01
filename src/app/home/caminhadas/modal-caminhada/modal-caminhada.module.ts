import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalCaminhadaComponent } from './modal-caminhada.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpinnerComponentModule
  ],
  declarations: [ModalCaminhadaComponent]
})
export class ModalWalksModule { }
